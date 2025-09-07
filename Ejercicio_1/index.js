import express from 'express';

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

    const nuevoCalculo = { base, altura, perimetro, superficie };
    figuras.push(nuevoCalculo);

    res.json({ success: true, data: nuevoCalculo });
});


app.get('/figuras', (req, res) => {
    const resultadosConTipo = figuras.map((f) => ({
        ...f,
        tipo: f.base === f.altura ? "Cuadrado" : "Rectángulo"
    }));

    res.json({ success: true, data: resultadosConTipo });
});


app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});
