import React, { Suspense } from "react";
import "./Products.css";
const Modal = React.lazy(() => import("../../utils/ui/modal/Modal"))
const Dropzone = React.lazy(() => import("../../utils/ui/dropzone/Dropzone"))
import imgNotFound from "../../img/404.jpg";
import { Product } from "../../../../backend/src/db/Model/Product";
import LazyRender from "../../utils/ui/LazyRender";
import QueryTask from "../../utils/QueryTask";
class Products extends React.Component {
    state = { products: [] as Product[] };
    base_endpoint = "api/products";

    modalInsert = React.createRef<React.ComponentRef<typeof Modal>>();
    inputName = React.createRef<HTMLInputElement>();
    inputPrice = React.createRef<HTMLInputElement>();
    inputDesc = React.createRef<HTMLInputElement>();
    dropzoneRef = React.createRef<React.ComponentRef<typeof Dropzone>>();
    taskFetch = React.createRef<QueryTask<Product[] | undefined>>();
    render(): React.ReactNode {
        return (
            <>

                {this.renderQueryTasks()}
                {this.renderUtils()}
                {this.renderModal()}
            </>
        );
    }

    // ----------------------------
    // UI BUILDING METHODS
    // ----------------------------
    renderQueryTasks = () => {
        return (
            <QueryTask
                ref={this.taskFetch}
                fn={this.fetchProducts.bind(this, false)}
                onData={(data) => {
                    this.setState({ products: data });
                    }
                }
                onSuccess={() => {
                    return this.renderProducts();
                }}
            ></QueryTask>
        )
    }
    renderProducts = () => {
        const { products } = this.state;

        if (!products || products.length === 0)
            return <span>Non ci sono prodotti disponibili</span>;

        return (
            <div className="grid-container">
                {products.map((product, index) => (
                    <LazyRender key={index} as="div" className="grid-item grid-item-150">
                        <div className="card" style={{ margin: "16px auto" }}>
                            <div className="card-header">
                                <span>{product.name} </span>
                                <span className="product-price">{product.price}€</span>
                            </div>
                            <div className="card-body">
                                <label>{product.description}</label>
                                <img
                                    src={product.image}
                                    onError={(e) => (e.currentTarget.src = imgNotFound)}
                                    alt={product.name}
                                />
                            </div>
                            <div className="card-footer">
                                <div className="m-1">
                                    <button className="btn btn-rounded btn-primary">
                                        <i className="gg-shopping-cart"></i>
                                    </button>
                                </div>
                                <div className="m-1">
                                    <button
                                        className="btn btn-rounded btn-danger"
                                        onClick={this.removeProduct.bind(this, product, index)}
                                    >
                                        <i className="gg-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </LazyRender>
                ))}
            </div>
        );
    };

    renderUtils = () => (
        <div className="products-utils">
            <button
                className="btn btn-rounded btn-success"
                onClick={() => this.modalInsert.current?.show()}
            >
                +
            </button>
        </div>
    );

    renderModal = () => (
        <Suspense>
            <Modal
                ref={this.modalInsert}
                // show={true}
                modalHeader={<label>Aggiungi Prodotto</label>}
                modalBody={
                    <div className="grid-container">
                        <div className="grid-item">
                            <label>Nome Prodotto</label>
                            <input ref={this.inputName} className="form-input" type="text" required />
                        </div>
                        <div className="grid-item">
                            <label>Prezzo Prodotto</label>
                            <input ref={this.inputPrice} className="form-input" type="number" required />
                        </div>
                        <div className="grid-item-max">
                            <label>Descrizione</label>
                            <input ref={this.inputDesc} className="form-input" type="text" required />
                        </div>
                        <div className="grid-item-max">
                            <label>Immagine</label>
                            <Suspense>
                                <Dropzone
                                    ref={this.dropzoneRef}
                                    onFileSelected={(file: File) => console.log("file aggiunto", file)}
                                    accept="image/*"
                                />
                            </Suspense>
                        </div>
                    </div>
                }
                modalFooter={
                    <>
                        <button className="btn btn-pill btn-success mr-1" onClick={this.addProduct}>
                            Aggiungi
                        </button>
                        <button className="btn btn-pill btn-primary" onClick={() => this.modalInsert.current?.hide()}>
                            Annulla
                        </button>
                    </>
                }
            />
        </Suspense>

    );

    // ----------------------------
    // ACTION METHODS
    // ----------------------------

    addProduct = async () => {
        const name = this.inputName.current?.value ?? "";
        const price = parseFloat(this.inputPrice.current?.value || "0");
        const description = this.inputDesc.current?.value ?? "";
        const imageData = this.dropzoneRef.current?.state.files?.[0]?.imageData;

        const model: Partial<Product> = { name, price, description, image: imageData };

        const response = await fetch(`${this.base_endpoint}/InsertProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(model),
        });

        if (response.ok) {
            console.log("Prodotto aggiunto con successo");
            if (this.taskFetch.current)
                this.taskFetch.current.query();
            else
                await this.fetchProducts(true);
            this.clearModal();
        } else {
            console.error("Errore nell'aggiungere il prodotto");
        }
    };

    removeProduct = (food: Product, index: number) => {
        fetch(`${this.base_endpoint}/DeleteProduct`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ id: food.id }),
        }).then((response) => {
            if (response.ok) {
                console.log("Prodotto rimosso");
                const products = [...this.state.products];
                products.splice(index, 1);
                this.setState({ products });
            } else {
                console.error("Errore nella rimozione del prodotto");
            }
        });
    };

    fetchProducts = async (settingState: boolean): Promise<Product[] | undefined> => {
        try {
            const response = await fetch(`${this.base_endpoint}/GetProducts`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const contentType = response.headers.get("Content-Type");

            if (response.ok && contentType?.includes("application/json")) {
                const products = await response.json();
                if (settingState)
                    this.setState({ products });
                return products as Product[];

            } else {
                const fallback = await import("../../../../db/products.json");
                if (settingState)
                    this.setState({ products: fallback.default });
                return fallback.default as Product[];
            }
        } catch (err) {
            console.error("Errore nel caricamento prodotti", err);
            return undefined;
        }
    };

    clearModal = () => {
        this.inputName.current!.value = "";
        this.inputPrice.current!.value = "";
        this.inputDesc.current!.value = "";
        this.dropzoneRef.current?.clearFiles();
        this.modalInsert.current?.hide();
    };
}

export default Products;
