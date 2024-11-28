<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    async function findJobs() {
        const searchQuery = document.getElementById('search').value;
        const url = `http://127.0.0.1:5000/jobs?search=${encodeURIComponent(searchQuery)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jobs = await response.json();

            // Display jobs on the page
            const jobList = document.getElementById('jobs');
            jobList.innerHTML = ''; // Clear previous results
            jobs.forEach(job => {
                const jobItem = document.createElement('div');
                jobItem.className = 'job'; // Ensure class is assigned correctly
                jobItem.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.company} - ${job.location}</p>
                    <a href="${job.url}" target="_blank">View Job</a>
                `;
                jobList.appendChild(jobItem);
            });

            // Reapply styles (if needed)
            const styles = `
                body { font-family: Arial, sans-serif; margin: 20px; padding: 0; background-color: #f4f4f9; }
                h1 { text-align: center; color: #333; }
                .search-container { text-align: center; margin-bottom: 20px; }
                input[type="text"] { padding: 10px; width: 60%; margin-right: 10px; font-size: 16px; }
                button { padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #007BFF; color: white; border: none; }
                .job-list { display: flex; flex-direction: column; align-items: center; margin-top: 20px; }
                .job { background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: 10px; width: 80%; text-align: center; }
                .job a { text-decoration: none; color: #007BFF; font-weight: bold; }
                .job a:hover { text-decoration: underline; }
            `;

            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    document.getElementById('searchButton').onclick = findJobs;
});

=======
async function findJobs() {
    const query = document.getElementById('search').value;
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id={7a00d62a}&app_key={00df6f70970657c5c2df338b356ab296}`;
  
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
>>>>>>> b3fbecb193bf8675b80a723437ff7b5cec5eb367
