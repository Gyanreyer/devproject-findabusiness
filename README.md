## Ryan Geyer - Waymark Technical Assessment Project

### Overview
Hello! This was a lot of fun to make and I'm quite happy with how it turned out, thank you for the challenge as well as the opportunity to potentially work at Waymark in the future!

### Technologies Used
- JavaScript
- React
- Lots of CSS
- Google Places API
- Clarifai API

### Setup
1. Install packages using 'npm i'
2. Build the app using 'npm run build'
3. Start the app using 'npm run serve' - you will then be able to view it in your browser at http://localhost:8080

### Use
At the start, enter a valid ZIP code into the ZIP code search field. Pressing tab or enter will submit the code and validate whether it is associated with a real location or not.

If the submitted ZIP code is valid, the search field will be replaced by the name of the associated location. If you wish to select a new location, you may click on the current location's name to edit the ZIP.

After selecting a valid location, you will be able to search for businesses in that area. Enter any keyword or business name you would like to find (ie, "Restaurants" or "Waymark") and then press tab or enter to submit the search.

The app will then return with a list of matching results from your search. Clicking on any of them will toggle a dropdown which loads/displays additional details on the business such as its phone number, website, and a photo gallery. Mousing over the photo gallery will provide controls to scroll through photos of the business and will show tags for each image retreived using Clarifai.
