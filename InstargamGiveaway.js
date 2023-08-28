const fs = require('fs');

const { performance } = require('perf_hooks');

let startTime = performance.now();

let countFiles = 0
function readFiles() {
    const data = fs.readFileSync(`out${countFiles}.txt`, 'utf-8')
    return data.split('\n')
}
function uniqueValues() { // Unique word combinations:
    let countUsers = 0
    for (let i = 0; i < 20; i++) {
        const uniqueArray = [...new Set(readFiles())];
        let users = uniqueArray.length
        countFiles++
        countUsers += users
    }
return countUsers
}

console.log(`Unique word combinations: ${uniqueValues()}`) // 1340240

function existInAllFiles() { // Word combinations that are in all 20 files:
    let usernames = [];
    for (let i = 0; i < 20; i++) {
        let fileContent = fs.readFileSync(`out${i}.txt`, 'utf-8');
        let fileUsernames = fileContent.split('\n');
        if (i === 0) {
            usernames = fileUsernames;
        } else {
            usernames = usernames.filter(username => fileUsernames.includes(username));
        }
    }
    return usernames.length;
}

console.log(`Word combinations that are in all 20 files: ${existInAllFiles()}`)

function existInAtLeastTen() { // Word combinations that are in at least ten files:
    let usernames = new Map();
    for (let i = 0; i < 20; i++) {
        let fileContent = fs.readFileSync(`out${i}.txt`, 'utf-8');
        let fileUsernames = fileContent.split('\n');
        for (let username of fileUsernames) {
            if (usernames.has(username)) {
                usernames.set(username, usernames.get(username) + 1);
            } else {
                usernames.set(username, 1);
            }
        }
    }
    let result = [];
    for (let [username, count] of usernames) {
        if (count >= 10) {
            result.push(username);
        }
    }
    return result.length;
}

console.log(`Word combinations that are in at least ten files: ${existInAtLeastTen()}`)

let endTime = performance.now();
let executionTime = endTime - startTime;

console.log(`Code Execution Time: ${Math.floor((executionTime / 1000) / 60)} minutes ${Math.floor((executionTime / 1000) % 60)} seconds`);
