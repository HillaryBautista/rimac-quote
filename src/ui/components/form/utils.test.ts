import { describe, it, expect } from 'vitest';
import { onlyNumbers, limitByDocumentType, limitPhone } from './utils';

describe('utils de formulario', () => {
    describe('onlyNumbers', () => {
        it('debe eliminar todos los caracteres que no sean números', () => {
            expect(onlyNumbers('abc123def456')).toBe('123456');
            expect(onlyNumbers('!@#98-76_54')).toBe('987654');
        });

        it('debe retornar string vacío si no hay números', () => {
            expect(onlyNumbers('abcXYZ!')).toBe('');
        });

        it('debe retornar el mismo valor si ya son solo números', () => {
            expect(onlyNumbers('123456789')).toBe('123456789');
        });
    });

    describe('limitByDocumentType', () => {
        it('debe limitar DNI a máximo 8 dígitos y eliminar no numéricos', () => {
            const value = '12a34b56c789'; // mezcla letras + más de 8 dígitos
            const result = limitByDocumentType(value, 'DNI');
            expect(result).toBe('12345678');
        });

        it('debe limitar CE a máximo 12 dígitos y eliminar no numéricos', () => {
            const value = 'AB12-34.56_7890123'; // mezcla + más de 12 dígitos
            const result = limitByDocumentType(value, 'CE');
            expect(result).toBe('123456789012'); // primeros 12 números
        });

        it('debe respetar menos dígitos si el valor es más corto', () => {
            expect(limitByDocumentType('12345', 'DNI')).toBe('12345');
            expect(limitByDocumentType('987654321', 'CE')).toBe('987654321');
        });
    });

    describe('limitPhone', () => {
        it('debe limitar el celular a máximo 9 dígitos y eliminar no numéricos', () => {
            const value = '+51 987-654-321 ext 99';
            const result = limitPhone(value);
            expect(result).toBe('519876543'); // primeros 9 números
        });

        it('debe retornar todos los dígitos si son 9 o menos', () => {
            expect(limitPhone('123456789')).toBe('123456789');
            expect(limitPhone('12a3b')).toBe('123'); // limpia y no corta
        });

        it('debe retornar string vacío si no hay números', () => {
            expect(limitPhone('abc XYZ')).toBe('');
        });
    });
});
