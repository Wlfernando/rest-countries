# Frontend Mentor - Rest Countries

This project focus on view transition api. Whenever a flag is clicked, the transition is triggered. Another feature, the page recognize the system preferred schem color; after the page is loaded, the user could select the scheme-color. It is simplified using only css variables and attribute data-theme set in html element.

The eight flags are intentionally loaded with the home page as the photo points. 

The searcher has a debounce of 1 second per click. This avoid unnecessary calls to the api. It could be improve adding an aborting signal in the feature. The select option is a made hand to personalize the style, it consider accesibility. If nothing found, the site send us to error handler page.

Once a valid name country is writed or select one option in the selector, the site filter the cards consulting the rest country api.

Clicking the image of the card, the user should see a new page of the description and have new links of the boundary countries.

## Table of content

- [Overview](#overview)
  - [The challenge](#the-challenge)

## Overview

### The challenge

- See all countries from the API on the homepage
- Search for a country using an input field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Bonus: Toggle the color scheme between light and dark mode
