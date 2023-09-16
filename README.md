# Travel

Built with React, as a practice project.

## Functionality 🚀

The user types in the name of his/her destination and the app returns the following: 

⚡️ Current weather from AccuWeather API (https://developer.accuweather.com/): temperature in Celsius, wind speed in Km/h, rainfall in MM.  

⚡️ One cheap plane ticket offer to the selected destination (from Amadeus API https://developers.amadeus.com/, https://airlabs.co/), including duration of flight, airline, number of stops and price in euros. **Travel** uses the current date and PRAGUE, CZR, as parameters for the flight ticket search.

These funcionalities may be used at a professional level and the possibilities are great. Further details about how the information is gathered or the amount of data available can be found on each API website.

## Lessons Learned 📋

* How to chain setState and fetch requests (e.g., user types in data, which is used to fetch a iataCode, which is then used to fetch a flight offer).
* How to work with multiple APIs.
* How to work with functional components and React hooks.
* Basics of Typescript.

### Room for Improvement 🔧

* Weather forecast for several days.
* Cost of living data (e.g. Numbeo API).
* An actual flights search widget with the option to change origin location and choose dates.
