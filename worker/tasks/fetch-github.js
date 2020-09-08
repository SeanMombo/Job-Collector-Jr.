var fetch = require('node-fetch')
var redis = require('redis');
client = redis.createClient();

const { promisify } = require("util");

//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
 

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    console.log('fetching github');

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
    const success = await setAsync('github', JSON.stringify(jobsArray)) 

    console.log({success})
}

fetchGithub();
module.exports = fetchGithub;