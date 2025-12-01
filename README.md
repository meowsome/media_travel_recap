# Media Travel Recap

Media Travel Recap connects to your cloud photo storage to gather all photos and videos from a specified year and use the location and time metadata of the media to generate a "Travel Recap" based on where you've been that year. It compares the distance between each consecutive photo that was taken and determines whether or not you traveled somewhere new during that photo. For the recap, statistics are compiled, such as how many unique cities or states you have visited. Additionally, an animated map is generated, showing a visual of everywhere you have been. It currently works with Immich an account or Google Photos via Google Takeout.

### Instructions:

1. Install dependencies for server using `cd api && pip3 install -r requirements.txt`
2. Start backend using `python3 server.py`
3. Install dependencies for frontend using `cd ../react_app && npm install`
4. Start frontend using `npm run dev`