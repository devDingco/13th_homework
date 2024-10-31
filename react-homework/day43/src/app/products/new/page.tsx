"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import ProductsWrite from "@/components/products-write";

const ProductsNewPage = () => {
  return <ProductsWrite isEdit={false} />;
};
export default withAuth(ProductsNewPage);
