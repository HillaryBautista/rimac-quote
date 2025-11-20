import { describe, it, expect } from 'vitest';
import { ROUTES } from './routes';

describe('ROUTES', () => {

    it('debe tener las rutas correctas definidas', () => {
        expect(ROUTES.HOME).toBe('/');
        expect(ROUTES.PLANS).toBe('/plans');
        expect(ROUTES.SUMMARY).toBe('/summary');
    });

    it('debe ser inmutable (readonly)', () => {
        const changeRoute = () => {
            // @ts-expect-error queremos validar que es readonly
            ROUTES.HOME = '/otra';
        };

        expect(changeRoute).toThrow();
    });

});
