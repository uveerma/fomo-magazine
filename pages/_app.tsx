import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export const ProductContext = createContext<any>(null);
function MyApp({ Component, pageProps }: AppProps) {
  const [prod, setProd] = useState<any[]>([]);
  return (
    <>
      <ProductContext.Provider value={{ prod, setProd }}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ProductContext.Provider>
    </>
  );
}

export default MyApp;
