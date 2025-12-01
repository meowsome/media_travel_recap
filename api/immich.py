import requests
import os
import pandas as pd
import numpy as np
from geopy.distance import geodesic
import plotly.express as px

def fetch_immich_years(request):
    base_url = request.json['baseUrl']
    token = request.json['token']
    headers = {"x-api-key": token}
    try:
        response = requests.request("GET", f"{base_url}/api/timeline/buckets", headers=headers, data = {})
    except requests.exceptions.RequestException as e:
        print(e)
        return (400, "Invalid base URL")
    else:
        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame(data)
            dates = pd.to_numeric(df['timeBucket'].str[:4]).unique()
            return (200, dates.tolist())
        else:
            return (400, "Invalid token")
        

def fetch_immich_photos(request):
    year = request.json['year']
    base_url = request.json['baseUrl']
    token = request.json['token']
    start_date = f"{year}-01-01"
    end_date = f"{year}-12-31"

    print(year)
    print(base_url)
    print(token)

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

    # Loop thru photos cuz you can only fetch 1000 at a time
    while not all_photos_found:
        if page > 0:
            body["page"] = page

        response = requests.request("POST", f"{base_url}/api/search/metadata", headers=headers, data=body)
        if response.status_code == 200:
            photos = response.json()
            print(f"{photos['assets']['total']} photos found")
            all_photos += photos['assets']['items']

            next_page = photos['assets']['nextPage']
            if next_page:
                print(f"next page: {next_page}")
                page = int(next_page)
            else:
                all_photos_found = True
        else:
            print(f"Error: {response.status_code}: {response.text}")
            all_photos_found = True

    photos_with_metadata = [photo for photo in all_photos if photo['exifInfo']['latitude'] != None]

    df = pd.DataFrame(photos_with_metadata)

    exif_cols = pd.json_normalize(df.exifInfo)
    df[exif_cols.columns] = exif_cols

    filtered_df = df[['fileCreatedAt', 'latitude', 'longitude', 'city', 'state', 'country']].iloc[::-1]

    filtered_df['prev_latitude'] = [np.nan] + list(filtered_df['latitude'])[:-1]
    filtered_df['prev_longitude'] = [np.nan] + list(filtered_df['longitude'])[:-1]

    filtered_df['distance_from_prev'] = filtered_df.apply(lambda point: geodesic((point['latitude'], point['longitude']), (point['prev_latitude'], point['prev_longitude'])).km if np.isfinite(point['prev_latitude']) else 0, axis=1)

    final_df = filtered_df[filtered_df['distance_from_prev'] > 70]

    stats = {
        'unique_cities': final_df.groupby(['city', 'state']).ngroups,
        'unique_states': final_df['state'].nunique(),
        'unique_countries': final_df['country'].nunique(),
        'total_distance_traveled': float(round(final_df['distance_from_prev'].sum(), 2)),
        'most_common_state': final_df['state'].mode().tolist()[0]
    }

    # Create plain text date col
    final_df['date_string'] = pd.to_datetime(final_df['fileCreatedAt'])
    final_df['date_string'] = final_df['date_string'].dt.strftime("%B %Y")

    print(stats)
    print(final_df.to_dict(orient='records'))

    return {
        'stats': stats,
        'locations': final_df.to_dict(orient='records')
    }