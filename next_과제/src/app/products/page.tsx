import MainSlide from "@/components/main-slide";
import ProductList from "@/components/product-list";
import ProductRecommended from "@/components/product-recommended";
import ProductLineBanner from "@/components/product-line-banner";

export default function ProductsPage() {
  return (
    <>
      <MainSlide />
      <div className="mainContent">
        <div className="flex flex-col gap-12">
          <ProductRecommended />
          <ProductLineBanner />
          <ProductList />
        </div>
      </div>
    </>
  );
}
