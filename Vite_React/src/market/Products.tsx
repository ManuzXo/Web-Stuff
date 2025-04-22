import React from "react";
import "./Products.css";
class Products extends React.Component {
    state = {
        data: ["Mela", "Banana", "Pera"],
    };
    render(): React.ReactNode {
        return (
            <>
                <ul className="list-products">
                    {this.getListProducts()}
                </ul>
            </>
        )
    }
   
    getListProducts = () => {
        return this.state.data.map((item, index) => {
            return <li key={index}>{item}</li>;
        });
    }
}
export default Products;