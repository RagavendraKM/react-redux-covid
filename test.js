async function getTotalGoals(team, year) {
    const http = require("https");

    const formatUrl = (year, team, page) => `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&${team.side}=${team.name}&page=${page}`;

    const promise = (year, team, page) => new Promise((resolve, reject) => {
        http.get(formatUrl(year, team, page), (res) => {
            let result = '';
            res.on('data', (data) => {
                result += data;
            });
            res.on('error', (error) => {
                console.log(error);
                reject(error);
            });

            res.on('end', () => {
                resolve(JSON.parse(result))
            });
        })
    });

    let page = 1;
    let count = 0;
    const data = [];
    let res = await promise(year, { side: "team1", name: team }, page);
    data.push(...res.data);
    if (data.length) {
        const pageSize = res.total_pages;
        for (let index = 0; index < pageSize; index++) {
            page++;
            let res = await promise(year, { side: "team1", name: team }, page);
            if (res.data.length)
                data.push(...res.data);
        }
        count = data.map(obj => parseInt(obj.team1goals)).reduce((a, b) => a + b);
        console.log(count, pageSize);
    }
    let page1 = 1;
    const data1 = [];
    let count1 = 0;
    let res1 = await promise(year, { side: "team2", name: team }, page1);
    data1.push(...res1.data);
    if (data1.length) {
        const pageSize1 = res1.total_pages;
        for (let index = 0; index < pageSize1; index++) {
            page1++;
            let res = await promise(year, { side: "team2", name: team }, page1);
            if (res.data.length)
                data1.push(...res.data);
        }
        count1 = data1.map(obj => parseInt(obj.team2goals)).reduce((a, b) => a + b);
        console.log(count1, pageSize1, data1, data);
    }
    console.log(count1 + count, "total");
    return count1 + count;
}

const http = require("https");

const formatUrl = (year, goalnumber) => `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1goals=${goalnumber}&team2goals=${goalnumber}`;

const promise = (year, goalnumber) => new Promise((resolve, reject) => {
    http.get(formatUrl(year, goalnumber), (res) => {
        let result = '';
        res.on('data', (data) => {
            result += data;
        });
        res.on('error', (error) => {
            console.log(error);
            reject(error);
        });

        res.on('end', () => {
            resolve(JSON.parse(result))
        });
    })
});

let count = 0;
for (let index = 0; index < 10; index++) {
    let res = await promise(year, index);
    count += res.total;
}
return count