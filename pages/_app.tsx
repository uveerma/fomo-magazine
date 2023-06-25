import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import Navbar from "../components/navbar";
export const ProductContext = createContext<any>(null);
function MyApp({ Component, pageProps }: AppProps) {
  const [prod, setProd] = useState<any[]>([]);
  return (
    <>
      <ProductContext.Provider value={{ prod, setProd }}>
        <Navbar />
        <Component {...pageProps} />
      </ProductContext.Provider>
    </>
  );
}

export default MyApp;
