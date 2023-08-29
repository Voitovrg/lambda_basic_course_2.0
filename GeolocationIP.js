const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const csvFilePath = 'C:\\Users\\romav\\WebstormProjects\\lambda\\GeolocationIP\\IP2LOCATION-LITE-DB1.CSV';

const app = express();
const PORT = process.env.PORT ?? 3000;

let foundMatch = false;

app.get('/', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const startIP = parseInt(row['0'], 10);
            const endIP = parseInt(row['16777215'], 10);
            const country = row['-'];

            // Сравниваем числовое значение с диапазоном IP из строки
            if (userIP.replace(/\./g, '') >= startIP && userIP.replace(/\./g, '') <= endIP) {
                console.log(`User live in: ${country}\nUser IP: ${userIP.replace(/\./g, '')}\nIP ${country}: ${startIP} - ${endIP}`);
                foundMatch = true;

                let send = {
                    userIP: userIP.replace(/\./g, ''),
                    userCountry: country,
                    startIP: startIP,
                    endIP: endIP
                }

                res.send(send);

                return console.log('---Finished---');
            }
        })
        .on('end', () => {
            if (!foundMatch) {
                console.log('Not found country', userIP.replace(/\./g, ''));
            }
        });
})

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}...`);
})

