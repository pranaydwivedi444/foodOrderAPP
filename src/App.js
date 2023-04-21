import "./App.css";
import Header from "./components/Layout/Header/Header.component";
import Meals from "./components/Meals/Meals.component";
import Cart from "./components/Cart/Cart.component";
import { useState } from "react";
import { CartProvider } from "./Contexts/Cart.context";

function App() {
  const [modalOpen, setopenModal] = useState(false);
  function closeModal() {
    setopenModal(false);
  }
  function openModal() {
    setopenModal(true);
  }
  return (
    <CartProvider>
      <Header openModal={openModal} />
      {modalOpen && <Cart closeModal={closeModal} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
