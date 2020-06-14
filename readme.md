## Simple RSS Reader

Project created for testing purposes (async, await, fetch, CORS).

## Quick Start
Open index.html from 'public' folder.

## Info:
1. Use "Display RSS Feed" button to fetch RSS data from [naEkranie](https://naekranie.pl/) and display it below as tiles with title and img.
2. Fetched URL contains https://cors-anywhere.herokuapp.com due to CORS policy. This is the second fix from [this Medium article](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9). If we'll use just [RSS URL](https://naekranie.pl/feed/all.xml), fetching data will fail.  
2. Animated loading spinner (from this [Codepen](https://codepen.io/aurer/pen/jEGbA)) should be displayed before displaying tiles.
3. If fetching data fails, error message should be displayed (uncomment first rssURL variable and comment second one to check).
4. Every tile opens the article in new tab.
