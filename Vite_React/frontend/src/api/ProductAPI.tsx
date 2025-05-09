import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../backend/src/db/Model/Product";

const base_endpoint = "api/products";

export const fetchProduct = async (): Promise<Product[]> => {
   console.log("test");
  const response = await fetch(`${base_endpoint}/GetProducts`);
  if (!response.ok) throw new Error("Errore nell'avere la lista prodotti");
  return await response.json();
};

export const GetProducts = () => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  return { data, isLoading, isError, isSuccess, error };
};
