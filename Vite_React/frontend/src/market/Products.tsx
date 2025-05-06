import React from "react";
import "./Products.css";
import LazyRender from "../utils/LazyRender";
import { Food } from "../../../backend/src/db/Model/Food";
import imgNotFound from "../img/404.jpg";
import Modal from "../utils/Modal";

class Products extends React.Component {
    state: {
        foods: Food[];
    }
    base_endpoint: string = "api/products";
    modalInsert: React.RefObject<Modal | null>;
    constructor(props: any) {
        super(props);
        this.state = {
            foods: [],
        };
        this.modalInsert = React.createRef<Modal>();
    }
    async componentDidMount(): Promise<void> {
        const response = await fetch(`${this.base_endpoint}/GetProducts`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        const contentType = response.headers.get("Content-Type");
        if (response.ok && contentType && contentType.includes("application/json")) {
            const foods = await response.json();
            this.setState({ foods: foods });
        }
        else {  // se la richiesta è fallita, carica i dati dal file JSON locale
            const foods = await import("../../../db/products.json");
            this.setState({ foods: foods.default });
        }
    }
    render(): React.ReactNode {
        return (
            <>
                <div className="grid-container">
                    {this.getProducts()}
                </div>
                <div className="products-utils">
                    <button className="btn btn-rounded btn-success" onClick={() => {
                        if (!this.modalInsert.current)
                            return;
                        this.modalInsert.current.show()
                    }}>+</button>
                </div>
                <Modal ref={this.modalInsert}
                    modalHeader={<label>Aggiungi Prodotto</label>}
                    modalBody={(
                        <div className="grid-container">
                            <div className="grid-item">
                                <label>Nome Prodotto</label>
                                <input className="form-input" type="text"></input>
                            </div>
                            <div className="grid-item">
                                <label>Prezzo Prodotto</label>
                                <input className="form-input" type="number"></input>
                            </div>
                            <div className="grid-item-max">
                                <label>Descrizione</label>
                                <input className="form-input" type="text"></input>
                            </div>
                            <div className="grid-item-max">
                                <img className="img-insert-product" alt="Immagine Prodotto" src={imgNotFound}></img>
                            </div>
                        </div>
                    )}
                    modalFooter={(
                        <>
                            <button className="btn btn-pill btn-success">Aggiungi</button>
                            <button className="btn btn-pill btn-primary">Annulla</button>
                        </>
                    )}
                />
            </>
        )
    }
    getProducts = () => {
        return this.state.foods.map((food: Food, index: number) => {
            return (
                <LazyRender key={index} as="div" className="grid-item grid-item-150">
                    <div className="card" style={{ margin: "16px auto" }}>
                        <div className="card-header">
                            <span>{food.name}</span>
                            <span> </span>
                            <span className="food-price">{food.price}€</span>
                            <span> </span>
                        </div>
                        <div className="card-body">
                            <label>{food.description}</label>
                            <img src={food.image} onError={(element) => {
                                let target = element.currentTarget;
                                target.src = imgNotFound;
                            }}>
                            </img>
                        </div>
                        <div className="card-footer">
                            <div className="m-1">
                                <button className="btn btn-rounded btn-primary">
                                    {/* <i className="fal fal-lg fa-cart-shopping"></i> */}
                                    <i className="gg-shopping-cart"></i>
                                </button>
                            </div>
                            <div className="m-1">
                                <button className="btn btn-rounded btn-danger" onClick={this.removeProduct.bind(this, food, index)}>
                                    <i className="gg-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </LazyRender>
            )
        });
    }

    removeProduct = (food: Food, index: number) => {
        fetch(`${this.base_endpoint}/DeleteProduct`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ id: food.id })
        }).then((response) => {
            if (response.ok) {
                console.log("Product deleted successfully");
                let foods = this.state.foods;
                foods.splice(index, 1);
                this.setState({ foods: foods });
            } else {
                console.error("Failed to delete product");
            }
        });
    }
}
export default Products;