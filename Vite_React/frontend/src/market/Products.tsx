import React from "react";
import "./Products.css";
import LazyRender from "../utils/LazyRender";
import { Food } from "../../../backend/src/db/Model/Food";
import imgNotFound from "../img/404.jpg";

class Products extends React.Component {
    state: {
        foods: Food[];
    }
    base_endpoint: string = "api/products";
    constructor(props: any) {
        super(props);
        this.state = {
            foods: [],
        };
    }
    async componentDidMount(): Promise<void> {
        const response = await fetch(`${this.base_endpoint}/GetProducts`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        if (response.ok) {
            const foods = await response.json();
            this.setState({ foods: foods });
        }
        else // se la richiesta è fallita, carica i dati dal file JSON locale
        {
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
            </>
        )
    }
    getProducts = () => {
        console.log("getProducts");
        return this.state.foods.map((food: Food, index: number) => {
            return (
                <LazyRender key={index} as="div" className="grid-item grid-item-150">
                    <div className="card">
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