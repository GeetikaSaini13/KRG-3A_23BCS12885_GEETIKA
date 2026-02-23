import { useEffect, useState } from "react";
import { fetchProduct } from "../api/productAPI";

const Product = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct().then(setProduct);
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
    </div>
  );
};

export default Product;
