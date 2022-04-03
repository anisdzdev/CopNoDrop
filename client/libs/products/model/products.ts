import { User } from "src/app/auth/auth.service";

export class Product {
    _id?: string;
    name?: string;
    description?: string;
    category?: string;
    price?: {$numberDecimal: number};
    sale?: number;
    image?: string;
    images?: string[];
    creator?: {
        firstName?: string;
        lastName?: string;
        id?: string;
    };
    quantity?: number;
    supply?: number;
    
}
