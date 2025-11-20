import { describe, it, expect } from 'vitest';
import rules, { type QuoteFormFields } from './rules';

const createRules = (documentType: QuoteFormFields['documentType']) => {
    const baseValues: QuoteFormFields = {
        documentType,
        documentNumber: '',
        phone: '',
        acceptPrivacy: false,
        acceptComms: false,
    };

    const getValues = (name?: keyof QuoteFormFields) =>
        name ? baseValues[name] : baseValues;

    return rules(getValues as any);
};

describe('rules', () => {
    it('debe definir mensaje required para tipo de documento', () => {
        const r = createRules('DNI');
        expect(r.documentType?.required).toBe(
            'El tipo de documento es obligatorio'
        );
    });

    describe('documentNumber - DNI', () => {
        it('debe devolver error si DNI tiene caracteres no numéricos', () => {
            const r = createRules('DNI');
            const validate = r.documentNumber?.validate as (v: string) => true | string;

            expect(validate('ABC123')).toBe('DNI solo puede contener números');
        });

        it('debe devolver error si DNI no tiene 8 dígitos', () => {
            const r = createRules('DNI');
            const validate = r.documentNumber?.validate as (v: string) => true | string;

            expect(validate('1234567')).toBe(
                'DNI debe tener exactamente 8 dígitos'
            );
        });

        it('debe aceptar un DNI válido', () => {
            const r = createRules('DNI');
            const validate = r.documentNumber?.validate as (v: string) => true | string;

            expect(validate('12345678')).toBe(true);
        });
    });

    describe('documentNumber - CE', () => {
        it('debe devolver error si CE tiene caracteres inválidos', () => {
            const r = createRules('CE');
            const validate = r.documentNumber?.validate as (v: string) => true | string;

            expect(validate('ABC-123')).toBe(
                'CE solo puede contener letras y números'
            );
        });

        it('debe devolver error si CE tiene menos de 9 o más de 12 caracteres', () => {
            const r = createRules('CE');
            const validate = r.documentNumber?.validate as (v: string) => true | string;

            expect(validate('ABC12345')).toBe(
                'CE debe tener entre 9 y 12 caracteres'
            );
            expect(validate('ABCDEFGHIJKL123')).toBe(
                'CE debe tener entre 9 y 12 caracteres'
            );
        });

        it('debe aceptar un CE válido (9–12 caracteres alfanuméricos)', () => {
            const r = createRules('CE');
            const validate = r.documentNumber?.validate as (v: string) => true | string;

            expect(validate('ABC123456')).toBe(true);
            expect(validate('ABCDE1234567')).toBe(true);
        });
    });

    describe('phone', () => {
        it('debe tener mensaje required correcto', () => {
            const r = createRules('DNI');
            expect(r.phone?.required).toBe('El celular es obligatorio');
        });

        it('debe validar que solo contenga números', () => {
            const r = createRules('DNI');
            const pattern = r.phone?.pattern;

            expect(pattern?.value).toEqual(/^\d+$/);
            expect(pattern?.message).toBe('El celular solo puede contener números');
        });

        it('debe validar longitud mínima y máxima de 9 dígitos', () => {
            const r = createRules('DNI');
            expect(r.phone?.minLength?.value).toBe(9);
            expect(r.phone?.minLength?.message).toBe(
                'El celular debe tener 9 dígitos'
            );
            expect(r.phone?.maxLength?.value).toBe(9);
            expect(r.phone?.maxLength?.message).toBe(
                'El celular debe tener 9 dígitos'
            );
        });
    });

    describe('acceptPrivacy', () => {
        it('debe exigir aceptar la política de privacidad', () => {
            const r = createRules('DNI');
            const validate = r.acceptPrivacy?.validate as (
                v: boolean
            ) => true | string;

            expect(validate(false)).toBe(
                'Debes aceptar la Política de Privacidad'
            );
            expect(validate(true)).toBe(true);
        });
    });

    it('acceptComms debe ser opcional (sin reglas definidas)', () => {
        const r = createRules('DNI');
        expect(r.acceptComms).toEqual({}); 
    });
});
