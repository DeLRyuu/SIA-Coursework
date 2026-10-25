import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import defaultProducts from "./data/defaultProducts";
import { fetchProducts } from "./api/fetchProducts";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SettingsMenu from "./components/SettingsMenu";
import ProductFormModal from "./components/ProductFormModal";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals & Dialogs state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Undo buffer for deleted product
  const undoBufferRef = useRef(null);
  const [toast, setToast] = useState(null);

  // Theme state synced with document.documentElement.dataset.theme
  const [theme, setTheme] = useState(() => {
    return document.documentElement.dataset.theme || "dark";
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    try {
      localStorage.setItem("gadgetvault-theme", newTheme);
    } catch {
      // LocalStorage access might fail in restricted environments
    }
  };

  // Initial load from API (with fallback to defaultProducts)
  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (!ignore) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (!ignore) {
          setProducts(defaultProducts);
          setError(
            "Could not reach the product API. Showing local default inventory."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  // Stock update handler
  const handleUpdateStock = (id, newQuantity) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, newQuantity) } : p
      )
    );
    setToast({
      id: Date.now(),
      message: "Stock updated",
    });
  };

  // Add Product handler
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setIsAddModalOpen(false);
    setToast({
      id: Date.now(),
      message: "Product added",
    });
  };

  // Update Product handler
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
    setToast({
      id: Date.now(),
      message: "Product updated",
    });
  };

  // Delete Product with Undo for 5 seconds
  const handleDeleteProduct = (productToDelete) => {
    const originalIndex = products.findIndex((p) => p.id === productToDelete.id);
    undoBufferRef.current = {
      product: productToDelete,
      index: originalIndex >= 0 ? originalIndex : 0,
    };

    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setDeletingProduct(null);

    setToast({
      id: Date.now(),
      message: "Product deleted",
      actionLabel: "Undo",
      action: () => {
        if (undoBufferRef.current) {
          const { product, index } = undoBufferRef.current;
          setProducts((prev) => {
            const copy = [...prev];
            copy.splice(index, 0, product);
            return copy;
          });
          undoBufferRef.current = null;
          setToast({
            id: Date.now(),
            message: "Product restored",
          });
        }
      },
    });
  };

  // Derive unique categories dynamically
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <BrowserRouter>
      <div className="app">
        {/* 3 fixed blurred background orbs spread across the page */}
        <div className="ambient-background" aria-hidden="true">
          <div className="ambient-orb orb-teal"></div>
          <div className="ambient-orb orb-deep-blue"></div>
          <div className="ambient-orb orb-amber"></div>
        </div>

        <header className="app-header-glass">
          <div className="header-inner">
            <Link to="/" className="header-logo-link">
              <span className="logo-badge" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l2-5h14l2 5"></path>
                  <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"></path>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <path d="M10 22v-6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6"></path>
                </svg>
              </span>
              <div className="logo-text">
                <span className="brand-name">GadgetVault</span>
                <span className="brand-tagline">Store Management</span>
              </div>
            </Link>

            <SettingsMenu theme={theme} onThemeChange={handleThemeChange} />
          </div>
        </header>

        <main className="app-main">
          {error && <p className="status-message status-error">{error}</p>}

          {loading ? (
            <div className="loading-glass-card">
              <div className="loading-spinner"></div>
              <p>Loading inventory...</p>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    categories={categories}
                    products={products}
                    onUpdateStock={handleUpdateStock}
                    onOpenAddModal={() => setIsAddModalOpen(true)}
                    onOpenEditModal={(product) => setEditingProduct(product)}
                    onOpenDeleteDialog={(product) => setDeletingProduct(product)}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductDetailPage
                    products={products}
                    onUpdateStock={handleUpdateStock}
                    onOpenEditModal={(product) => setEditingProduct(product)}
                    onOpenDeleteDialog={(product) => setDeletingProduct(product)}
                  />
                }
              />
            </Routes>
          )}
        </main>

        {/* Global Toast Notification */}
        <Toast toast={toast} onClose={() => setToast(null)} />

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <ProductFormModal
            categories={categories}
            onSubmit={handleAddProduct}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <ProductFormModal
            product={editingProduct}
            categories={categories}
            onSubmit={handleUpdateProduct}
            onClose={() => setEditingProduct(null)}
          />
        )}

        {/* Delete Confirmation Dialog */}
        {deletingProduct && (
          <DeleteConfirmDialog
            product={deletingProduct}
            onConfirm={handleDeleteProduct}
            onCancel={() => setDeletingProduct(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
