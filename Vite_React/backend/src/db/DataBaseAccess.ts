import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { DataBaseSchema } from './DataBaseSchema';

class DataBaseAccess {
    dbPath: string;
    database: Database.Database;
    constructor() {
        if (!process.env.DB_PATH) {
            throw new Error('Environment variable DB_PATH is not defined');
        }
        this.dbPath = path.join(__dirname, process.env.DB_PATH);
        this.database = new Database(this.dbPath);
        this.InitTable();
    }
    InitTable() {
        const pathModel = path.resolve(__dirname, 'Model');
        const files = fs.readdirSync(pathModel);
        for (const file of files) {
            const fullPath = path.join(pathModel, file);
            import(fullPath).then((modelModule) => {
                const className = Object.keys(modelModule)[0];
                const modelClass = modelModule[className];
                if (typeof modelClass !== 'function') {
                    console.warn(`⚠️ La classe "${className}" non è una funzione. Ignorando...`);
                    return;
                }
                const initialClass = new modelClass();
                console.info(`🔍 Analizzando la classe "${className}"...`);
                if ((initialClass instanceof DataBaseSchema) === false) {
                    console.warn(`⚠️ La classe "${className}" non è una sottoclasse di DataBaseSchema. Ignorando...`);
                    return;
                }
                const schema = initialClass.schema;
                const columns = Object.entries(schema)
                    .map(([col, type]) => `${col} ${type}`)
                    .join(', ');

                const createQuery = `CREATE TABLE IF NOT EXISTS ${initialClass.tableName} (${columns})`;
                try {
                    this.database.prepare(createQuery).run();
                    console.info(`✅ Tabella "${initialClass.tableName}" creata (o già esistente)`);
                } catch (error) {
                    console.error(`❌ Errore durante la creazione della tabella "${initialClass.tableName}":`, error);
                }
            }).catch((error) => {
                console.error(`❌ Errore durante l'importazione del modulo "${file}":`, error);
            });
        }
    }
}
export const DBAccess = new DataBaseAccess();