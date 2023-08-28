const axios = require('axios');
const https = require('https');

const link = ['https://jsonbase.com/lambdajson_type1/793',
    'https://jsonbase.com/lambdajson_type1/955',
    'https://jsonbase.com/lambdajson_type1/231',
    'https://jsonbase.com/lambdajson_type1/931',
    'https://jsonbase.com/lambdajson_type1/93',
    'https://jsonbase.com/lambdajson_type2/342',
    'https://jsonbase.com/lambdajson_type2/770',
    'https://jsonbase.com/lambdajson_type2/491',
    'https://jsonbase.com/lambdajson_type2/281',
    'https://jsonbase.com/lambdajson_type2/718',
    'https://jsonbase.com/lambdajson_type3/310',
    'https://jsonbase.com/lambdajson_type3/806',
    'https://jsonbase.com/lambdajson_type3/469',
    'https://jsonbase.com/lambdajson_type3/258',
    'https://jsonbase.com/lambdajson_type3/516',
    'https://jsonbase.com/lambdajson_type4/79',
    'https://jsonbase.com/lambdajson_type4/706',
    'https://jsonbase.com/lambdajson_type4/521',
    'https://jsonbase.com/lambdajson_type4/350',
    'https://jsonbase.com/lambdajson_type4/64',];

async function getData(link) {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    const response = await axios.get(link, {httpsAgent: agent});
    return response.data;
}

function find(o, findkey) {
    const entries = Object.entries(o); // получаем дочерние узлы
    const result = [];
    while (entries.length) { // пока есть непроверенные узлы
        const [key, val] = entries.pop(); // берем один узел
        if (key === findkey) result.push(val); // если ключ соответствует искомому - добавляем результат
        // если значение является объектом
        if (val != null && typeof val == 'object') entries.push(...Object.entries(val)); // добавляем его дочерние узлы в список непроверенных
    }
    return result;
}

async function main() {
    let trueCount = 0;
    let falseCount = 0;
    for (let i = 0; i < link.length; i++) {
        const data = await getData(link[i]);
        const isDoneValues = find(data, "isDone");
        console.log(`${link[i]} isDone - ${isDoneValues}`);
        trueCount += isDoneValues.filter(val => val === true).length;
        falseCount += isDoneValues.filter(val => val === false).length;
    }
    console.log(`Значений true: ${trueCount}`);
    console.log(`Значений false: ${falseCount}`);
}

main();
