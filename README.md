# Travel

Built with React.

### Functionality

The user types in the name of a city and the app returns the following useful information about the destination: 

- Current weather from AccuWeather API (https://developer.accuweather.com/): temperature in Celsius, wind speed in Km/h, rainfall in MM.  
- One cheap plane ticket offer to the selected destination from Amadeus API (https://developers.amadeus.com/, https://airlabs.co/), including travelling time, airline, number of stops and price in euros. **Travel** uses the current date and PRAGUE, CZR, as parameters for the flight ticket search. 

These funcionalities may be used at a professional level and the possibilities are great. Further details about how the information is gathered or the amount of data available can be found on each API website.

### Lessons Learned

* How to work with user input. 
* How to chain fetch requests.
* How to work with multiple APIs in conjunction.

### Room for Improvement

Rewriting of some passages for better readability and improved efficiency, weather forecast for several days, cost of living data (e.g. Numbeo API), and an actual flights search widget with the option to change origin location and choose dates.
