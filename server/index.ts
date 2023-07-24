import getApartments from "./scraper";
import express from 'express';
import cors from 'cors';
import {select} from "./database";

getApartments();

const app = express();
app.use(cors());

app.get('/apartments', async (req, res) => {
    const { rows } = await select();
    res.send(rows);
})

app.listen(4000);