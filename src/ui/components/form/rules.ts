import type { UseFormGetValues, RegisterOptions } from "react-hook-form";

export type QuoteFormFields = {
    documentType: "DNI" | "CE";
    documentNumber: string;
    phone: string;
    acceptPrivacy: boolean;
    acceptComms: boolean;
};

type QuoteRules = {
    [K in keyof QuoteFormFields]?: RegisterOptions<QuoteFormFields, K>;
};

const rules = (getValues: UseFormGetValues<QuoteFormFields>): QuoteRules => ({
    documentType: {
        required: "El tipo de documento es obligatorio",
    },
    documentNumber: {
        required: "El número es obligatorio",
        validate: (value: string) => {
            const type = getValues("documentType");

            if (type === "DNI") {
                if (!/^\d+$/.test(value)) {
                    return "DNI solo puede contener números";
                }
                return value.length === 8 || "DNI debe tener exactamente 8 dígitos";
            }

            if (type === "CE") {
                if (!/^[\p{L}\d]+$/u.test(value)) {
                    return "CE solo puede contener letras y números";
                }
                const len = value.length;
                return (
                    (len >= 9 && len <= 12) ||
                    "CE debe tener entre 9 y 12 caracteres"
                );
            }

            return true;
        },
    },
    phone: {
        required: "El celular es obligatorio",
        pattern: {
            value: /^\d+$/,
            message: "El celular solo puede contener números",
        },
        minLength: {
            value: 9,
            message: "El celular debe tener 9 dígitos",
        },
        maxLength: {
            value: 9,
            message: "El celular debe tener 9 dígitos",
        },
    },
    acceptPrivacy: {
        validate: (value: boolean) =>
            value || "Debes aceptar la Política de Privacidad",
    },
    acceptComms: {
        // opcional, no obligatorio
    },
});

export default rules;
