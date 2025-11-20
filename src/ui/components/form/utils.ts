export const onlyNumbers = (value: string) => {
    return value.replace(/\D+/g, ""); // elimina todo lo que NO sea número
};

export const limitByDocumentType = (
    value: string,
    type: "DNI" | "CE"
): string => {
    const numeric = onlyNumbers(value);

    if (type === "DNI") return numeric.slice(0, 8);
    if (type === "CE") return numeric.slice(0, 12);

    return numeric;
};

export const limitPhone = (value: string): string => {
    return onlyNumbers(value).slice(0, 9);
};
