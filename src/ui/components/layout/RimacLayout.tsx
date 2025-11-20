import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const RimacLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="l-rimac">
      <Header/>

      <main className="l-rimac__main">{children}</main>

      <Footer/>
    </div>
  );
};
