import express from 'express';
import mysql from 'mysql2/promise';

//conección a la base de datos

    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

const app = express();
const port = 5000;

app.use(express.json());

const figuras = [];

app.post('/figuras', (req, res) => {
    const { base, altura } = req.body;
    console.log("Figura recibida:", req.body); 

    if (typeof base !== 'number' || typeof altura !== 'number' || base <= 0 || altura <= 0) {
        return res.status(400).json({ success: false, message: "Los valores deben ser números positivos" });
    }


    const perimetro = (base + altura) * 2;
    const superficie = base * altura;

    const nuevoCalculo = db.execute("INSERT INTO figuras (base, altura, perimetro, superficie) VALUES (?, ?, ?, ?)", [base, altura, perimetro, superficie])
    figuras.push(nuevoCalculo);

    res.json({ success: true, data: nuevoCalculo });
});


app.get('/figuras', async (req, res) => {
  
    const [rows] = await db.execute("SELECT * FROM figuras");
    res.json({ success: true, data: rows });

}); 


app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});
