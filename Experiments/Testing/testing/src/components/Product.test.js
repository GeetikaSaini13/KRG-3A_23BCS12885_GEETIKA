import { render, screen } from "@testing-library/react";
import Product from "Product";
import * as api from "../api/productAPI";

jest.mock("../api/productApi");

test("renders Product", async () => {
  api.fetchProduct.mockResolvedValue({
    id: 1,
    name: "Phone",
    price: 2000,
  });

  render(<Product />);

  const productName = await screen.findByText("Phone");
  const productPrice = await screen.findByText("2000");

  expect(productName).toBeInTheDocument();
  expect(productPrice).toBeInTheDocument();
});
