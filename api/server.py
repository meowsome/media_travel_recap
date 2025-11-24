from flask import Flask, request, jsonify, abort
from immich import fetch_immich_years, fetch_immich_photos

app = Flask(__name__)

@app.route("/api/immich/initial", methods=['POST'])
def immich_get_years():
    code, data = fetch_immich_years(request)
    if code == 200:
        return jsonify(data)
    else:
        return data, 400

@app.route("/api/immich/recap", methods=['POST'])
def immich_create_recap():
    return jsonify(fetch_immich_photos(request))

if __name__ == "__main__":
    app.run(debug=True)