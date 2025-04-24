// import Home from "../Home";
// import Products from "../market/Products";
import React from "react";
const Home = React.lazy(() => import("../Home"));
const Products = React.lazy(() => import("../market/Products"));
var SectionData = [
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
for(let i = SectionData.length; i < 20; i++) {
    //  SectionData[i] = SectionData[1];
}
export default SectionData;