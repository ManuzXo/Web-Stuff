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
        const keys = Object.keys(record); // usa solo le chiavi presenti nei dati
        const values = Object.values(record);
        const placeholders = values.map(() => '?').join(', ');
    
        const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
        DBAccess.database.prepare(query).run(...values);
    }
    

    // Elimina record in base a una condizione
    public DeleteByExpression(expression: string, params: any[]): void {
        const query = `DELETE FROM ${this.tableName} WHERE ${expression}`;
        DBAccess.database.prepare(query).run(...params);
    }
}
