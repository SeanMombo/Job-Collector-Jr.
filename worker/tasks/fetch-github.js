var fetch = require('node-fetch')

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {

    let resultCount = 1;
    let page = 0;
    const jobsArray = [];

    while(resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${page}`);
        const jobs = await res.json();
        jobsArray.push(...jobs)
        resultCount = jobs.length;
        console.log('Pulled ' + resultCount, " jobs");
        page ++;

    }
    console.log('Pulled ' + jobsArray.length, " jobs");
}

fetchGithub();
module.exports = fetchGithub;