import React from "react";
import "./Products.css";
import LazyRender from "../utils/LazyRender";
// interface Food {
//     name: string;
//     description: string;
//     price: number;
//     image: string;
// }
import { Food } from "../../../backend/src/db/Model/Food";
import imgNotFound from "../img/404.jpg";
class Products extends React.Component {
    state: {
        foods: Food[];
    }
    constructor(props: any) {
        super(props);
        this.state = {
            foods: [],
        };
    }
    async componentDidMount(): Promise<void> {
        const response = await fetch("api/products/GetProducts", {
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
        return this.state.foods.map((food: Food, index: number) => {
            return (
                <LazyRender key={index} as="div" className="grid-item grid-item-150" children={
                    <div className="card">
                        <div className="card-header">
                            <span>{food.name}</span>
                            <span> </span>
                            <span className="food-price">{food.price}€</span>
                        </div>
                        <div className="card-body">
                            <label>{food.description}</label>
                            <img src={food.image} onError={ (element) => {
                                let target = element.currentTarget;
                                target.src = imgNotFound;
                            }}></img>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-rounded btn-primary">Add to cart</button>
                        </div>
                    </div>
                }>
                </LazyRender>
            )
        });
    }
}
export default Products;