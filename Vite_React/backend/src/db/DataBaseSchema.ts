import { DBAccess } from "./DataBaseAccess";

export class DataBaseSchema {
    public schema: { [key: string]: string };
    public tableName: string;

    constructor(schema: { [key: string]: string }) {
        this.schema = schema;
        this.tableName = this.constructor.name.toLowerCase(); // Imposta il nome della tabella dinamicamente
    }

    // Recupera tutti i record dalla tabella
    public GetRecords(): any[] {
        return DBAccess.database.prepare(`SELECT * FROM ${this.tableName}`).all() as any[];
    }

    // Trova i record in base a una condizione
    public FindByExpression(expression: string, params: any[]): any[] {
        return DBAccess.database.prepare(`SELECT * FROM ${this.tableName} WHERE ${expression}`).all(...params);
    }

    // Inserisci un record
    public InsertRecord(record: any): void {
        const keys = Object.keys(this.schema).join(', ');
        const values = Object.values(record);
        const placeholders = values.map(() => '?').join(', ');

        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
        DBAccess.database.prepare(query).run(...values);
    }
}
