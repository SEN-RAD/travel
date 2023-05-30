# Travel

This is a simple project using React and API requests. Although the amount of information requested and displayed is little, these basic funcionalities may be used at a professional level and the possibilities are great. 

**Travel** helps travelers prepare for a trip. The user types in the name of a city and the app returns the following useful information about the destination: 

- Current weather from AccuWeather API (https://developer.accuweather.com/): temperature in Celsius, wind speed in Km/h, rainfall in MM.  
- Two cheap plane ticket offers to the selected destination from Amadeus API (https://developers.amadeus.com/, https://airlabs.co/).
**Travel** uses the current date and PRAGUE, CZR, as parameters for the flight ticket search. An updated version might include an actual flights search widget with the option to change origin location and choose dates.

Further details about how the information is gathered or the amount of data available can be found on each API website.

Version 2.0 may include rewriting of some passages for better readability and improved efficiency (e.g.then() to Async/Await), weather forecast for several days, in addition to the current conditions. **Travel** will also include cost of living data (e.g. Numbeo API) as soon as I'm able to find a free resource to work with.

*work in progress*
