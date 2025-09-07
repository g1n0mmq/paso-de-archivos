import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

const alumnos = [];

app.post('/alumnos', (req, res) => {
    const { nombre, nota1, nota2, nota3 } = req.body;

    if (!nombre || typeof nota1 !== 'number' || typeof nota2 !== 'number' || typeof nota3 !== 'number') {
        return res.status(400).json({ success: false, message: "Faltan datos o están mal tipeados" });
    }

    if (alumnos.find(a => a.nombre === nombre)) {
        return res.status(400).json({ success: false, message: `Alumno ${nombre} ya existe` });
    }

    const nuevoAlumno = { nombre, nota1, nota2, nota3 };
    alumnos.push(nuevoAlumno);
    res.status(201).json({ success: true, data: nuevoAlumno });
});

app.get('/alumnos', (req, res) => {
    const resultados = alumnos.map(a => {
        const promedio = (a.nota1 + a.nota2 + a.nota3) / 3;
        let condicion = promedio >= 8 ? 'Promocionado' : promedio >= 6 ? 'Aprobado' : 'Reprobado';
        return { ...a, promedio: parseFloat(promedio.toFixed(2)), condicion };
    });
    res.json({ success: true, data: resultados });
});

app.put('/alumnos/:nombre', (req, res) => {
    const nombreParam = req.params.nombre;
    const { nombre: nuevoNombre, nota1, nota2, nota3 } = req.body;

    const i = alumnos.findIndex(a => a.nombre === nombreParam);
    if (i === -1) return res.status(404).json({ success: false, message: "Alumno no encontrado" });

    if (!nuevoNombre || typeof nota1 !== 'number' || typeof nota2 !== 'number' || typeof nota3 !== 'number') {
        return res.status(400).json({ success: false, message: "Datos inválidos" });
    }

    if (nombreParam !== nuevoNombre && alumnos.find(a => a.nombre === nuevoNombre)) {
        return res.status(400).json({ success: false, message: `Nombre ${nuevoNombre} ya en uso` });
    }

    alumnos[i] = { nombre: nuevoNombre, nota1, nota2, nota3 };
    res.json({ success: true, data: alumnos[i] });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
