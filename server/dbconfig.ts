import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:postgres@db:5432/postgres',
    idleTimeoutMillis: 30000
});