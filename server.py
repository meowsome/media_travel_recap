from flask import Flask, render_template

app = Flask(__name__)

# Temporary
import pandas as pd
df = pd.read_csv("export.csv")
data = df.to_dict('records')
print(data)

@app.route("/")
def home():
    coords = data
    return render_template("map.html", coords=coords)

if __name__ == "__main__":
    app.run(debug=True)