import brandLightImg from "@assets/brandLight.png";

export const Footer = ({}) => {
  const date = new Date().getFullYear();
  return (
    <>
      <footer className="l-rimac__footer">
        <div className="l-rimac__footer--container">
            <img src={brandLightImg} alt="Logo" />
            <hr />
            <span>© {date} RIMAC Seguros y Reaseguros.</span>
        </div>
      </footer>
    </>
  );
};
