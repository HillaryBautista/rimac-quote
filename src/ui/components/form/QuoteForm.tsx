import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import rules, { type QuoteFormFields } from "./rules";
import { limitByDocumentType, limitPhone } from "./utils";
import { useAppContext } from "../../context/AppContext"; 

export const QuoteForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<QuoteFormFields>({
    defaultValues: {
      documentType: "DNI",
      documentNumber: "",
      phone: "",
      acceptPrivacy: false,
      acceptComms: false,
    },
    mode: "onBlur",
  });

  const validations = rules(getValues);

  const onSubmit = (data: QuoteFormFields) => {
    // Desestructuramos los valores que necesitamos
    const { documentType, documentNumber, phone } = data;

    // Guardar en el contexto (User) los datos de contacto
    dispatch({
      type: "UPDATE_USER_CONTACT",
      payload: {
        documentType,
        documentNumber,
        phone,
      },
    });

    // Ir a la pantalla de planes
    navigate("/plans");
  };

  return (
    <form className="c-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Bloque combinado: DNI + Nro. de documento */}
      <div className="c-form__group mb-2">
        <div className="c-form__control">
          <select
            className="c-form__input c-form__input--select"
            {...register("documentType", validations.documentType)}
          >
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
          </select>

          <div className="c-form__field">
            <label className="c-form__field-label">Nro. de documento</label>
            <input
              className={`c-form__input c-form__input--text ${
                errors.documentNumber ? "c-form__input--error" : ""
              }`}
              {...register("documentNumber", validations.documentNumber)}
              onChange={(e) => {
                const newValue = limitByDocumentType(
                  e.target.value,
                  getValues("documentType")
                );
                e.target.value = newValue;
              }}
            />
          </div>
        </div>

        {errors.documentNumber && (
          <p className="c-form__error-text">{errors.documentNumber.message}</p>
        )}
      </div>

      {/* Celular */}
      <div className="c-form__group">
        <div className="c-form__field">
          <label className="c-form__field-label">Celular</label>
          <input
            className={`c-form__input c-form__input--text ${
              errors.phone ? "c-form__input--error" : ""
            }`}
            {...register("phone", validations.phone)}
            onChange={(e) => {
              const newValue = limitPhone(e.target.value);
              e.target.value = newValue;
            }}
          />
        </div>
        {errors.phone && (
          <p className="c-form__error-text">{errors.phone.message}</p>
        )}
      </div>

      {/* Check 1 */}
      <div className="c-form__group mb-15">
        <label className="c-form__checkbox">
          <input
            type="checkbox"
            {...register("acceptPrivacy", validations.acceptPrivacy)}
          />
          <span>Acepto la Política de Privacidad</span>
        </label>
        {errors.acceptPrivacy && (
          <p className="c-form__error-text">
            {errors.acceptPrivacy.message as string}
          </p>
        )}
      </div>

      {/* Check 2 */}
      <div className="c-form__group mb-2">
        <label className="c-form__checkbox">
          <input type="checkbox" {...register("acceptComms")} />
          <span>Acepto la Política Comunicaciones Comerciales</span>
        </label>
      </div>

      <div className="c-form__group">
        <a href="#" className="c-form__politics">
          Aplican Términos y Condiciones.
        </a>
      </div>
      <br />

      <button type="submit" className="c-btn c-btn--primary">
        Cotiza aquí
      </button>
    </form>
  );
};
