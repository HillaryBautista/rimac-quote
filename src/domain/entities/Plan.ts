export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
  
  ageLimit: number;
  recommended?: boolean;
  originalPrice?: number;
}
