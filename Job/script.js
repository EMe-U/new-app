document.addEventListener('DOMContentLoaded', (event) => {
    async function findJobs() {
        const searchQuery = document.getElementById('search').value;
        const url = `http://127.0.0.1:5000/jobs?search=${encodeURIComponent(searchQuery)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jobs = await response.json();
            console.log(jobs);
            displayJobs(jobs); // Call the function to display jobs on the page
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    function displayJobs(jobs) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results

        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');

            const titleElement = document.createElement('h3');
            titleElement.textContent = job.title;
            jobElement.appendChild(titleElement);

            const companyElement = document.createElement('p');
            companyElement.textContent = `Company: ${job.company}`;
            jobElement.appendChild(companyElement);

            const locationElement = document.createElement('p');
            locationElement.textContent = `Location: ${job.location}`;
            jobElement.appendChild(locationElement);

            const urlElement = document.createElement('a');
            urlElement.href = job.url;
            urlElement.textContent = 'View Job';
            urlElement.target = '_blank';
            jobElement.appendChild(urlElement);

            resultsDiv.appendChild(jobElement);
        });
    }

    document.getElementById('searchButton').onclick = findJobs;
});