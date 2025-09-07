import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

// Lista inicial de tareas, para probar
let tareas = [
    { nombre: "Estudiar para rendir Programacion 2", completada: false },
    { nombre: "Aprender a programar en Python", completada: true },
    { nombre: "Hacer el trabajo de Metodologia", completada: false }
];


app.get('/tareas', (req, res) => {
    const completadaQuery = req.query.completada;

    if (completadaQuery !== undefined) {
        const esCompletada = completadaQuery === 'true';
        const tareasFiltradas = tareas.filter(tarea => tarea.completada === esCompletada);
        return res.json(tareasFiltradas);
    }

    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({
            data: "El nombre de la tarea es obligatorio"
        });
    }

    const tareaExistente = tareas.find(tarea => tarea.nombre.toLowerCase() === nombre.toLowerCase());

    if (tareaExistente) {
        return res.status(400).json({
            data: "Ya existe una tarea con ese nombre"
        });
    }

    const nuevaTarea = {
        nombre: nombre,
        completada: false
    };

    tareas.push(nuevaTarea);

    res.status(201).json({
        message: "Tarea creada correctamente"
    });
});

app.use((req, res) => {
    res.status(404).json({
        data: "Ruta no encontrada"
    });
});

app.listen(port, () => {
    console.log(`Servidor abierto en http://localhost:${port}`);
});