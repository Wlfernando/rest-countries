# Frontend Mentor - Rest Countries

This project focuses on the View Transition API. Whenever a flag is clicked, the transition is triggered. Additionally, the page recognizes the system's preferred color scheme; after the page loads, the user can select a different color scheme. 

This is implemented using only CSS variables and the data-theme attribute set on the HTML element.

The eight flags are intentionally loaded on the home page, as specified in the challenge.

The search bar has a debounce of 2 seconds per keystroke. This minimizes calls to the API. It could be improved in the future by adding an AbortController. The select dropdown is custom-built to allow for personalized styling, keeping accessibility in mind. If no results are found, the site redirects the user to the error handling page.

Once a valid country name is entered or an option is selected from the dropdown, the site filters the cards by querying the REST Countries API.

By clicking on a card's image, the user will be taken to a new page with the country's description and links to its bordering countries.

## Table of content

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Maintenence](#maitenence)

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

### Maintenence

First, the types were updated to facilitate the abstraction and organization for the API module, a pattern known as “ports”. Second, changes were manages to minimize the impact on other modules, update the requirements requested by REST Countries for implementing an API key and the new way to handle the endpoints. Each endpoint ensures the necessary data requested for each view.