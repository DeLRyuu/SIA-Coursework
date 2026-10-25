import ProductCard from "./ProductCard";

function ProductList({
  products,
  selectedCategory,
  onUpdateStock,
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          selectedCategory={selectedCategory}
          onUpdateStock={onUpdateStock}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;
