from flask import Flask, request, jsonify # type: ignore
import requests # type: ignore
import os
from dotenv import load_dotenv # type: ignore
from flask_cors import CORS # type: ignore

# Load environment variables (API credentials)
load_dotenv()

app = Flask(__name__)
CORS(app)

# Adzuna API URL (correct endpoint format)
API_URL = "https://api.adzuna.com/v1/api/jobs/gb/search/1"

# Load App ID and App Key from .env file
APP_ID = os.getenv('APP_ID')
APP_KEY = os.getenv('APP_KEY')

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

    formatted_jobs = []
    for job in job_data:
        formatted_jobs.append({
            'title': job.get('title'),
            'company': job.get('company', {}).get('display_name'),
            'location': job.get('location', {}).get('display_name'),
            'url': job.get('redirect_url')
        })

    return jsonify(formatted_jobs), 200

if __name__ == '__main__':
    app.run(debug=True)