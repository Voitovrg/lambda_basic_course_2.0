const fs = require('fs');

const jsonVacation = JSON.parse(fs.readFileSync('Vacation.json', 'utf-8'));
function vacation () {
    let res = [];
    for (let i = 0; i < jsonVacation.length; i++) {
        const output = {
            userId: jsonVacation[i]["user"]["_id"],
            name: jsonVacation[i]["user"]["name"],
            weekendDates: [{
                startDate: jsonVacation[i].startDate,
                endDate: jsonVacation[i].endDate
            }]
        }
        res.push(output)
    }
return res.reduce((acc, item) => {
    let found = acc.find(i => i.name === item.name);
    if (found) {
        found.weekendDates.push(item. weekendDates[0]);
    } else {
        acc.push(item);
    }
    return acc;
}, []);
}


fs.writeFileSync('sortedVacation.json', JSON.stringify(vacation()));



