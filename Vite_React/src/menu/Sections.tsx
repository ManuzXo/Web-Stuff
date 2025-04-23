import Home from "../Home";
import Products from "../market/Products";
var SectionData = [
    {
        "title": "Home",
        "content": <Home></Home>
    },
    {
        "title": "Products",
        "content": <Products></Products>
    }
];
for(let i = 2; i < 20; i++) {
    // SectionData[i] = SectionData[1];
}
export default SectionData;