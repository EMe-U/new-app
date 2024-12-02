document.addEventListener('DOMContentLoaded', (event) => {
    async function findJobs() {
        const searchQuery = document.getElementById('search').value;
        const appId = '7a00d62a';
        const appKey = '00df6f70970657c5c2df338b356ab296';
        const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(searchQuery)}&results_per_page=5`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const jobs = data.results;
            console.log(jobs);
            displayJobs(jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    function displayJobs(jobs) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');

            const titleElement = document.createElement('h3');
            titleElement.textContent = job.title;
            jobElement.appendChild(titleElement);

            const companyElement = document.createElement('p');
            companyElement.textContent = `Company: ${job.company.display_name}`;
            jobElement.appendChild(companyElement);

            const locationElement = document.createElement('p');
            locationElement.textContent = `Location: ${job.location.display_name}`;
            jobElement.appendChild(locationElement);

            const urlElement = document.createElement('a');
            urlElement.href = job.redirect_url;
            urlElement.textContent = 'View Job';
            urlElement.target = '_blank';
            jobElement.appendChild(urlElement);

            resultsDiv.appendChild(jobElement);
        });
    }

    document.getElementById('searchButton').onclick = findJobs;
});
