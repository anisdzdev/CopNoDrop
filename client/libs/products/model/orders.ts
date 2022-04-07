export class Order {
    
    _id?: string
    buyer?: {
        firstName?: string;
        lastName?: string;
    };
    
    seller?: {
        firstName?: string;
        lastName?: string;
        id?: string;
    };
    
    address?: {
        firstLine?: string;
        city?: string;
        province?: string;
        country?: string;
        postal_code?: string;
    };

    total?: any;
    product?:{
        img?: string,
        name?: string,
        quantity?: number;
    }

    state?: string;
    placedOn?: Date
}