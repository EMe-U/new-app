from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS 

load_dotenv()

app = Flask(__name__)
CORS(app)

API_URL = "https://api.adzuna.com/v1/api/jobs/gb/search/1"

APP_ID = os.getenv('APP_ID')
APP_KEY = os.getenv('APP_KEY')

@app.route('/jobs', methods=['GET'])
def get_jobs():
    query = request.args.get('search', '')
    if not query:
        return jsonify({"error": "Search query is required"}), 400

    if not APP_ID or not APP_KEY:
        return jsonify({"error": "API credentials are not set"}), 500

    params = {
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'what': query,
        'results_per_page': 5
    }

    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

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