import requests
import os
import pandas as pd
import numpy as np
from geopy.distance import geodesic
import plotly.express as px

def fetch_immich_years(request):
    print(request.json)
    base_url = request.json['baseUrl']
    token = request.json['token']
    headers = {"x-api-key": token}
    try:
        response = requests.request("GET", f"{base_url}/api/timeline/buckets", headers=headers, data = {})
    except requests.exceptions.RequestException as e:
        print(e)
        return (400, "Invalid base URL")
    else:
        print(response)
        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame(data)
            dates = pd.to_numeric(df['timeBucket'].str[:4]).unique()
            return (200, dates.tolist())
        else:
            return (400, "Invalid token")
        

def fetch_immich_photos(request):
    year = request.json['year']
    start_date = f"{year}-01-01"
    end_date = f"{year}-12-31"

    headers = {"x-api-key": token}
    body = {
        "takenAfter": start_date,
        "takenBefore": end_date,
        "withExif": "true",
        "size": 1000
    }
    all_photos_found = False
    page = 0
    all_photos = []

