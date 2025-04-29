import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { DataBaseSchema } from './DataBaseSchema';

class DataBaseAccess {
    dbPath: string;
    database: Database.Database;
    constructor() {
        this.dbPath = path.join(__dirname, '../../../db/web.db');
        this.database = new Database(this.dbPath);
        this.InitTable();
    }
    InitTable() {
        const pathModel = path.resolve(__dirname, 'Model');
        const files = fs.readdirSync(pathModel);
        for (const file of files) {
            const fullPath = path.join(pathModel, file);
            import(fullPath).then((modelModule) => {
                // const modelModule =  require(fullPath);
                const className = Object.keys(modelModule)[0];
                const modelClass = modelModule[className];
                if (typeof modelClass !== 'function') {
                    console.warn(`La classe ${className} non è una funzione. Ignorando...`);
                    return;
                }
                const initialClass = new modelClass();
                if ((initialClass instanceof DataBaseSchema) === false) {
                    console.warn(`La classe ${className} non è una sottoclasse di DataBaseSchema. Ignorando...`);
                    return;
                }
                const schema = initialClass.schema;
                const columns = Object.entries(schema)
                    .map(([col, type]) => `${col} ${type}`)
                    .join(', ');

                const createQuery = `CREATE TABLE IF NOT EXISTS ${initialClass.tableName} (${columns})`;
                this.database.prepare(createQuery).run();
                console.log(`✅ Tabella "${initialClass.tableName}" creata (o già esistente)`);
            });
        }
    }
}
export const DBAccess = new DataBaseAccess();