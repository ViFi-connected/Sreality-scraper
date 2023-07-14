import pool from './dbconfig';

export interface Apartment{
    title: string;
    image_url: string;
}

export async function insert(apartment: Apartment) {
    const client = await pool.connect();

    await client.query(
        "INSERT INTO apartments (title, image_url) VALUES ($1, $2)",
        [apartment.title, apartment.image_url]
    )
    await client.release()
}

export async function select() {
    const client = await pool.connect();

    const result = await client.query(
        "SELECT * FROM apartments"
    )
    await client.release()

    return result;
}