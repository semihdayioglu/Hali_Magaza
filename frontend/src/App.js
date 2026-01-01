import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import OrderPage from "./pages/OrderPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import AccountPage from "./pages/AccountPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kategori/:slug" element={<CategoryPage />} />
              <Route path="/urun/:slug" element={<ProductDetailPage />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="/favoriler" element={<FavoritesPage />} />
              <Route path="/siparis" element={<OrderPage />} />
              <Route path="/kargo-takip" element={<TrackOrderPage />} />
              <Route path="/hesabim" element={<AccountPage />} />
              <Route path="/arama" element={<SearchPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
