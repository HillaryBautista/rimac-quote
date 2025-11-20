import { describe, it, expect } from 'vitest';
import { QUOTE_STEPS } from './quoteSteps';

describe('QUOTE_STEPS', () => {
    it('debe estar definido', () => {
        expect(QUOTE_STEPS).toBeDefined();
    });

    it('debe ser un array', () => {
        expect(Array.isArray(QUOTE_STEPS)).toBe(true);
    });

    it('debe tener exactamente 2 pasos', () => {
        expect(QUOTE_STEPS.length).toBe(2);
    });

    it('debe contener los pasos correctos en orden', () => {
        expect(QUOTE_STEPS).toEqual([
            { id: 1, label: 'Planes y coberturas' },
            { id: 2, label: 'Resumen' },
        ]);
    });

    it('cada paso debe tener id y label válidos', () => {
        QUOTE_STEPS.forEach((step) => {
            expect(typeof step.id).toBe('number');
            expect(typeof step.label).toBe('string');
            expect(step.label.length).toBeGreaterThan(0);
        });
    });

    it('los ids deben ser únicos', () => {
        const ids = QUOTE_STEPS.map((step) => step.id);
        const uniqueIds = new Set(ids);

        expect(uniqueIds.size).toBe(ids.length);
    });
});
