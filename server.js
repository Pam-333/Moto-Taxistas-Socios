// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Usar JSON en el body de las peticiones POST
app.use(express.json());

// Ruta para leer los registros de motocicletas
app.get('/api/motorcycleRecords', (req, res) => {
    const filePath = path.join(__dirname, 'motorcycleRecords.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        res.json(JSON.parse(data)); 
    });
});

// Ruta para agregar un nuevo registro
app.post('/api/motorcycleRecords', (req, res) => {
    const newRecord = req.body;
    const filePath = path.join(__dirname, 'motorcycleRecords.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        const records = JSON.parse(data); // Convertir a objeto JSON
        records.push(newRecord); // Agregar el nuevo registro

        // Guardar los datos actualizados en el archivo JSON
        fs.writeFile(filePath, JSON.stringify(records, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el archivo');
            }

            res.status(201).json(newRecord); // Enviar el registro agregado como respuesta
        });
    });
});

// Ruta para eliminar un registro
app.delete('/api/motorcycleRecords/:index', (req, res) => {
    const { index } = req.params;
    const filePath = path.join(__dirname, 'motorcycleRecords.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        const records = JSON.parse(data);
        records.splice(index, 1); // Eliminar el registro por índice

        fs.writeFile(filePath, JSON.stringify(records, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el archivo');
            }

            res.status(200).send('Registro eliminado');
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
