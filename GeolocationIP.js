const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const csvFilePath = 'C:\\Users\\romav\\WebstormProjects\\lambda\\GeolocationIP\\IP2LOCATION-LITE-DB1.CSV';

const app = express();
const PORT = process.env.PORT ?? 3000;

let userIP = ''
let foundMatch = false;
let countryUser;

app.get('/', (req, res) => {
    userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const startIP = parseInt(row['0'], 10);
            const endIP = parseInt(row['16777215'], 10);
            const country = row['-'];

            // Сравниваем числовое значение с диапазоном IP из строки
            if (userIP.replace(/\./g, '') >= startIP && userIP.replace(/\./g, '') <= endIP) {
                console.log(`User live in: ${country}`);
                foundMatch = true;

                return countryUser = country
            }
        })
        .on('end', () => {
            if (!foundMatch) {
                console.log('Not found country', userIP.replace(/\./g, ''));

            }
            console.log('Finished');
        });

    res.send(`User live in: ${countryUser}`);

})

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}...`);
})

