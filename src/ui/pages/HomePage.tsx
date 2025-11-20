import heroImg from "../../assets/heroImg.png";
import { RimacLayout } from "../components/layout/RimacLayout";
import { QuoteForm } from "../components/form/QuoteForm";

export const HomePage = () => {
  return (
    <RimacLayout>
      <section className="p-home">
        <div className="p-home__image">
          <div className="p-home__image--overlay">
            <span className="p-home__badge">Seguro Salud Flexible</span>
            <h1 className="p-home__title">Creado para ti y tu familia</h1>
          </div>
          <img src={heroImg} alt="Familia protegida" />
        </div>

        <hr />

        <div className="p-home__content">
          <span className="p-home__badge">Seguro Salud Flexible</span>
          <h1 className="p-home__title">Creado para ti y tu familia</h1>
          <p className="p-home__subtitle">
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
            asesoría. 100% online.
          </p>
          <QuoteForm />
        </div>
      </section>
    </RimacLayout>
  );
};
