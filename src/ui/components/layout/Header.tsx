import brandImg from "@assets/brand.png";
import celIcon from "@assets/icons/iconCel.svg";
import { Link } from "react-router-dom";

export const Header = ({}) => {
  return (
    <>
      <header className="l-rimac__header">
      <Link to="/" className="l-rimac__header-logo">
        <img src={brandImg} alt="Logo Rimac" />
      </Link>
        <div className="l-rimac__header--information">
          <span>¡Compra por este medio!</span>
          <a href="tel:(01) 411 6001">
            <img src={celIcon} alt="Logo" />
            (01) 411 6001
          </a>
        </div>
      </header>
    </>
  );
};
