import React, {useEffect, useState} from 'react';
import Jobs from './Jobs';

import './App.css';

//project source: https://youtu.be/lauywdXKEXI?t=2141

const JOB_API_URL = '/api/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updateCb(json);
  console.log(json)
}

function App() {

  const [jobList, updateJobs] = useState([])
  useEffect(() => {
    fetchJobs(updateJobs);
  }, []);
  
  return (
    <div className="App">
      <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
