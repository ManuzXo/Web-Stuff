// import Home from "../Home";
// import Products from "../market/Products";
import React from "react";
const Home = React.lazy(() => import("../Home"));
const Products = React.lazy(() => import("../market/Products"));
const Controllers = React.lazy(() => import("../api/Controllers"));
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
    },
    {
        "title": "Controllers",
        "content": <Controllers></Controllers>
    }
];
export default SectionData;