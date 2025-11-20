import type { Plan } from "../../domain/entities/Plan";
import type { User } from "../../domain/entities/User";

export interface AppState {
    user: User | null;
    selectedPlan: Plan | null;
    quoteMode: "me" | "other";
}

export type AppAction =
    | { type: "SET_USER"; payload: User }
    | { type: "SET_PLAN"; payload: Plan }
    | { type: "SET_QUOTE_MODE"; payload: "me" | "other" }
    | { type: "RESET" };

export const initialState: AppState = {
    user: null,
    selectedPlan: null,
    quoteMode: "me",
};

export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_PLAN":
            return { ...state, selectedPlan: action.payload };
        case "SET_QUOTE_MODE":
            return { ...state, quoteMode: action.payload };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}
