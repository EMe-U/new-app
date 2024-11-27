async function findJobs() {
    const query = document.getElementById('search').value;
    const apiUrl = `http://localhost:5000/jobs?search=${query}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const jobContainer = document.getElementById('jobs');
      jobContainer.innerHTML = ''; // Clear previous results
  
      if (data.results && data.results.length > 0) {
        data.results.forEach(job => {
          const jobDiv = document.createElement('div');
          jobDiv.classList.add('job');
          jobDiv.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company.display_name}</p>
            <p><strong>Location:</strong> ${job.location.display_name}</p>
            <a href="${job.redirect_url}" target="_blank">Apply Here</a>
          `;
          jobContainer.appendChild(jobDiv);
        });
      } else {
        jobContainer.innerHTML = '<p>No jobs found.</p>';
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      document.getElementById('jobs').innerHTML = '<p>There was an error fetching the jobs.</p>';
    }
  }  