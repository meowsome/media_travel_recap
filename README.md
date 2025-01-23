# Media Travel Recap

Media Travel Recap connects to your Immich account to gather all photos and videos from the specified year and use the location and time metadata of the media to generate a "Travel Recap" based on where you've been that year. It compares the distance between each consecutive photo that was taken and determines whether or not you traveled somewhere new during that photo. For the recap, statistics are compiled, such as how many unique cities or states you have visited. Additionally, an animated map is generated, showing a visual of everywhere you have been. Enjoy!

### Instructions:

1. Set `IMMICH_BASE_URL`, `IMMICH_TOKEN`, and `YEAR` in [.env](.env)
2. Install dependencies using `pip3 install -r requirements.txt`
3. Run project