import Products from "../pages/market/Products";

class ProductAPI {
  static base_endpoint = "api/products";

  public static async GetProducts(): Promise<Products[] | undefined> {
    const response = await fetch(`${ProductAPI.base_endpoint}/Test`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    if (!response.ok) throw new Error("Errore nell'avere la lista prodotti");
    return await response.json();
  }
}
export default ProductAPI;
