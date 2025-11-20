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
  | {
      type: "UPDATE_USER_CONTACT";
      payload: {
        documentType: string;
        documentNumber: string;
        phone: string;
      };
    }
  | { type: "RESET" };

export const initialState: AppState = {
  user: {
    name: "",
    lastName: "",
    birthDay: "",
    documentType: "",
    documentNumber: "",
    phone: "",
    age: 0,
  },
  selectedPlan: null,
  quoteMode: "me",
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...(state.user ?? ({} as User)),
          ...action.payload,
        },
      };

    case "SET_PLAN":
      return { ...state, selectedPlan: action.payload };

    case "SET_QUOTE_MODE":
      return { ...state, quoteMode: action.payload };

    case "UPDATE_USER_CONTACT":
      return {
        ...state,
        user: {
          // si no había user, creamos uno parcial
          ...(state.user ?? ({} as User)),
          documentType: action.payload.documentType,
          documentNumber: action.payload.documentNumber,
          phone: action.payload.phone,
        },
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
