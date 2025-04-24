import React from "react";
import "./Products.css";
import foods from "./products.json";
import LazyRender from "../utils/LazyRender";
interface Food {
    name: string;
    description: string;
    price: number;
    image: string;
}

class Products extends React.Component {

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
        return foods.map((food: Food, index: number) => {
            return (
                <LazyRender key={index} className="grid-item grid-item-150" children={
                    <div className="card">
                        <div className="card-header">
                            <span>{food.name}</span>
                            <span> </span>
                            <span className="food-price">{food.price}€</span>
                        </div>
                        <div className="card-body">
                            <label>{food.description}</label>
                            <img src={food.image}></img>
                        </div>
                    </div>
                }>
                </LazyRender>
                // <div key={index} className="grid-item grid-item-150">
                //     <div className="card">
                //         <div className="card-header">
                //             <span>{food.name}</span>
                //             <span> </span>
                //             <span className="food-price">{food.price}€</span>
                //         </div>
                //         <div className="card-body">
                //             <label>{food.description}</label>
                //             <img src={food.image}></img>
                //         </div>
                //     </div>
                // </div>
            )
        });
    }
}
export default Products;