import { DataBaseSchema } from "../DataBaseSchema";
export class Product extends DataBaseSchema {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    image!: string;

    constructor() {
        super({
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            name: 'TEXT',
            description: 'TEXT',
            price: 'REAL',
            image: 'TEXT',
        });
    }

    // Recupera tutti i cibi
    public GetProducts(): Product[] {
        return this.GetRecords() as Product[];
    }

    // Inserisci un nuovo cibo
    public InsertProduct(food: Product): void {
        const foodRecord = {
            name: food.name,
            description: food.description,
            price: food.price,
            image: food.image
        };
        this.InsertRecord(foodRecord);
    }

    // Esempio di una ricerca personalizzata
    public FindProductsByName(name: string): Product[] {
        return this.FindByExpression("name LIKE ?", [`%${name}%`]) as Product[];
    }
    public DeleteById(id: number): void {
        this.DeleteByExpression("id = ?", [id]);
    }
}