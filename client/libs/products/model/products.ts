import { User } from "src/app/auth/auth.service";

export class Product {
    _id?: string;
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    sale?: number;
    image?: string;
    images?: string[];
    creator?: {
        firstName?: string;
        lastName?: string;
        id?: string;
    };
    quantity?: number;
    
}
