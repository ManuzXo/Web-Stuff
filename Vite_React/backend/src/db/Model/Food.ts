import { DataBaseSchema } from "../DataBaseSchema";
export class Food extends DataBaseSchema {
    name!: string;
    description!: string;
    price!: number;
    image!: string;

    constructor() {
        super({
            name: 'TEXT',
            description: 'TEXT',
            price: 'REAL',
            image: 'TEXT',
        });
    }

    // Recupera tutti i cibi
    public GetFoods(): Food[] {
        return this.GetRecords() as Food[];
    }

    // Inserisci un nuovo cibo
    public InsertFood(food: Food): void {
        const foodRecord = {
            name: food.name,
            description: food.description,
            price: food.price,
            image: food.image
        };
        this.InsertRecord(foodRecord);
    }

    // Esempio di una ricerca personalizzata
    public FindFoodsByName(name: string): Food[] {
        return this.FindByExpression("name LIKE ?", [`%${name}%`]) as Food[];
    }
}