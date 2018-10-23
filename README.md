[![air bites and bars logo](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/abnb_logo_with_text_red_300.png.png)](https://airbitesnbars.herokuapp.com/)

The _FASTER_ way to find restaurants and bars when on the go.

## Overview - Why AirBitesNBars?
Firstly, the inspiration behind AirBitesNBars was to emulate AirBnB’s UI Functionality:
* Panning map instantly displays new Venue Map Markers.
* Click a Venue Map Marker, its InfoWindow opens and the corresponding Venue Card scrolls into view.
* Conversely, click a Venue Card, and the corresponding Marker's InfoWindow opens.

This project is also an exploration into implementing the native Google Maps JavaScript API without relying on a third-party React library such as react-google-maps.

Most importantly, AirBitesNBars was created to address shortcomings of using Google Maps or Yelp for discovering restaurants and bars while traveling or in a new part of town.

Of course, the app’s name is a tongue-in-cheek nod to the airbnb name itself.

## Technology
### API's
* FourSquare
* Google Map Javascript API

### Front End
* React
* react-router
* Redux
* redux-thunk

### Back End
A Node.js proxy Application Server is utilized to obfuscate API keys.
* Node.js
* Node.js request
* Express.js
* Express cors
* dotenv

# Usage

## Searching Venues
### App Launch
For App to work, User must "Allow" the Browser to "Know your location".  This permission is found in the Browser's Settings Panel.

When App Loads, Bites (Restaurant) Venues, within a 2 mile radius, display.
![on app load restaurants venues display](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_01.png)

### Click Map Marker / Venue Card
Click a Marker, its InfoWindow opens and the corresponding Venue card scrolls into view.

Conversely, when a Venue card is clicked, the corresponding Marker's InfoWindow opens.
![click map marker or click venue card to show details](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_02.png)
### Bites / Bars Radio Buttons
Clicking either radio button will toggle displayed Venues from Bites to Bars on Current Location, and vice-versa.

Here, only Bites venues show.
![click bites radio button to display restaurant venues](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_03_01.png)


And now, only Bar venues display.
![click bars radio button to display bar venues](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_03_02.png)

### Pan with Fetching
"Pan with Fetching" is the default behavior. When User pans the map, the Venues update automatically.

This feature is especially useful when on a road trip.  Pan the road you are traveling to see upcoming Bites and Bars along your route.

It is also a fun way to explore an unfamiliar area for Restaurant and Bar locations.
![pan with fetching is default behavior](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_04_01.png)

Here, the User has panned along his route to see upcoming Venues.  Hmmm, where should I stop to eat? Where I am currently, or down the road?
![venue markers update as map is moved or panned](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_04_02.png)


### Pan without Fetching
Checking "Pan w/o Fetching" is a convenient feature which allows the User to Pan (and Zoom In/Out) while preserving the currently displayed Venues.

Suppose you want to explore the currently loaded set of Venues in greater detail - in this scenario, you want to explore Marker 42.
![pan without fetching is a convenience feature](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_05_01.png)

Here, we panned, zoomed and clicked Marker 42.
![click pan with fetching to prevent new venue markers from loading when moving the map](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_05_02.png)

## Take it to the Next Level
### Starting an Advanced Search
This is where things really get FUN!

Click "Pan w/o Zoom" and "Toggle Crosshairs" check-boxes.
![start an advanced search by clicking pan without fetching](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_06.png)

### Pan to Desired Location
You can pan anywhere on the world map. Try exploring a city you plan be visit, or exploring a city in a foreign country.
![pan to desired location on map](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_07.png)

### Load New Venues
Un-check "Pan w/o Fetch". Grab Map and give it a nudge.  New Venues display in the new Location.
![uncheck pan without fetching to display venues in the new location](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_08.png)

## Resetting View

### Go Back to Current Location
Click "Recenter to My Location" button to return map to your current location view.
![click recenter to my location button to return map to your current location view](https://github.com/pmkgithub/air_bites_bars_client/blob/master/src/images/about/map_ui_09.png)
