export interface Plan {
  name: string;
  price: number;
  description: string[];
  ageLimit: number;
  recommended?: boolean;
}
