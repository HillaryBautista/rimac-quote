import { describe, it, expect } from 'vitest';
import { appReducer, initialState } from './appReducer';
import type { User } from '../../domain/entities/User';
import type { Plan } from '../../domain/entities/Plan';

describe('appReducer', () => {
    it('SET_USER debe guardar el usuario', () => {
        const user: User = {
            name: 'Hillary',
            lastName: 'Bautista',
            birthDay: '1995-01-01',
            documentType: 'DNI',
            documentNumber: '12345678',
            phone: '999999999',
            age: 29,
        };

        const nextState = appReducer(initialState, {
            type: 'SET_USER',
            payload: user,
        });

        expect(nextState.user).toEqual(user);
    });

    it('SET_PLAN debe guardar el plan seleccionado', () => {
        const plan: Plan = {
            name: 'Plan Test',
            price: 200,
            description: ['desc'],
            age: 20,
            ageLimit: 60,
            recommended: true,
        };

        const nextState = appReducer(initialState, {
            type: 'SET_PLAN',
            payload: plan,
        });

        expect(nextState.selectedPlan).toEqual(plan);
    });

    it('UPDATE_USER_CONTACT debe actualizar solo los campos de contacto', () => {
        const stateWithUser = {
            ...initialState,
            user: {
                name: 'Hillary',
                lastName: 'Bautista',
                birthDay: '1995-01-01',
                documentType: 'DNI',
                documentNumber: '12345678',
                phone: '999999999',
                age: 29,
            },
        };

        const nextState = appReducer(stateWithUser, {
            type: 'UPDATE_USER_CONTACT',
            payload: {
                documentType: 'CE',
                documentNumber: 'ABC123456',
                phone: '988887777',
            },
        });

        expect(nextState.user).toEqual({
            ...stateWithUser.user,
            documentType: 'CE',
            documentNumber: 'ABC123456',
            phone: '988887777',
        });
    });

    it('RESET debe regresar al estado inicial', () => {
        const modified = {
            ...initialState,
            quoteMode: 'other' as const,
        };

        const nextState = appReducer(modified, { type: 'RESET' });

        expect(nextState).toEqual(initialState);
    });
});
