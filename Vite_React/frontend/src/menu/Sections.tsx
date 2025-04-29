// import Home from "../Home";
// import Products from "../market/Products";
import React from "react";
const Home = React.lazy(() => import("../Home"));
const Products = React.lazy(() => import("../market/Products"));
const SectionData = [
    {
        "title": "*",
        "content": <div> Error </div>,
        "excludeNavigation": true

    },
    {
        "title": "",
        "content": <Home></Home>,
        "excludeNavigation": true
    },
    {
        "title": "/",
        "content": <Home></Home>,
        "excludeNavigation": true
    },
    {
        "title": "Home",
        "content": <Home></Home>
    },
    {
        "title": "Products",
        "content": <Products></Products>
    }
];
export default SectionData;