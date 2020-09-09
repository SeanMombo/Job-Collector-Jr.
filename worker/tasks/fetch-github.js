var fetch = require('node-fetch')
var redis = require('redis');
client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);
 

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    console.log('fetching github');

    let resultCount = 1;
    let page = 0;
    const jobsArray = [];

    //fetch all pages
    while(resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${page}`);
        const jobs = await res.json();
        jobsArray.push(...jobs)
        resultCount = jobs.length;
        console.log('Pulled ' + resultCount, " jobs");
        page ++;

    }

    console.log('Pulled ' + jobsArray.length, " jobs");
    //filter out non-junior positions
    const jrJobs = jobsArray.filter(job => {
        const jobTitle = job.title.toLowerCase();

        //algo logic
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect') ||
            jobTitle.includes('manager')
            ) {
                return false;
            }
        return true;
    })
    console.log('filtered down to ' + jrJobs.length + ' junior jobs')

    //set in redis
    const success = await setAsync('github', JSON.stringify(jrJobs)) 

    console.log({success})
}

fetchGithub();
module.exports = fetchGithub;