import brandImg from "@assets/brand.png";
import celIcon from "@assets/icons/iconCel.svg";

export const Header = ({}) => {
  return (
    <>
      <header className="l-rimac__header">
        <img src={brandImg} alt="Logo" />
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
