export interface Book {
    id: string;
    title: string;
    price: number;
    coverImage: string;
    discountPrice?: number;
}

export interface Category {
    id: string;
    name: string;
    books: Book[];
}

export interface Banner {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
}

export interface NavItem {
    label: string;
    href: string;
}
