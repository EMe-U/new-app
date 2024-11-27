from Flask import Flask, jsonify, request # type: ignore
import requests # type: ignore
import os
from dotenv import load_dotenv # type: ignore

# Load environment variables (API credentials)
load_dotenv()

app = Flask(__name__)

# Adzuna API URL (correct endpoint format)
API_URL = "https://api.adzuna.com/v1/api/jobs/gb/search/1" 

# Load App ID and App Key from .env file
APP_ID = os.getenv('ADZUNA_APP_ID')  # Replace with actual environment variable names
APP_KEY = os.getenv('ADZUNA_APP_KEY')  # Replace with actual environment variable names

@app.route('/jobs', methods=['GET'])
def get_jobs():
    query = request.args.get('search', '')
    if not query:
        return jsonify({"error": "Search query is required"}), 400

    # Prepare parameters for Adzuna API request
    params = {
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'what': query,
        'results_per_page': 5
    }

    # Send request to Adzuna API
    response = requests.get(API_URL, params=params)
    
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from Adzuna API"}), 500

    # Extract and format relevant job data from the response
    job_data = response.json().get('results', [])
    if not job_data:
        return jsonify({"message": "No jobs found"}), 404

    # Process job data to display useful information
    jobs = [
        {
            "title": job.get('title'),
            "company": job.get('company', {}).get('display_name', 'N/A'),
            "location": job.get('location', {}).get('display_name', 'N/A'),
            "url": job.get('redirect_url', '#')
        }
        for job in job_data
    ]

    # Return the job results as JSON
    return jsonify({"jobs": jobs})

if __name__ == '__main__':
    app.run(debug=True)