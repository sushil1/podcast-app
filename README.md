## Podcast App

A podcast app that searches itunes podcasts and plays using aplayerjs built using node, express, react and redux. It queries the itunes Api for podcasts channels.
Once a channel is clicked, it fetches the feed from the channels feed URL, which returns XML and sometimes null, The XML is parsed to JSON and the tracklist is updated in Redux, which will initialize the APlayer, and the podcast will play.

It is deployed at [podcast-app-sl@herokuapp.com](http://podcast-app-sl.herokuapp.com/)

## How to Run

* git clone
* npm install
* webpack -w and nodemon on two terminals
* Runs on localhost:3000

Just search for podcasts and play.
Incase the channels feed URL returns no response or null response, small error div will pop at the top of the application.

Routes
localhost:3000/search/`searchQuery`
localhost:3000/feedUrl?url='feedUrl

## Demo 1

App initial loads with JS podcasts channels
<img src="https://res.cloudinary.com/snapshot/image/upload/v1521117194/Screen_Shot_2018-03-15_at_10.54.38_pm_dn7pvj.png" />

## Demo 2

APlayer is loaded
<img src="http://res.cloudinary.com/snapshot/image/upload/v1521117187/Screen_Shot_2018-03-15_at_10.55.00_pm_sulk9b.png" />

## Demo 3

Incase of XML error from getting feedUrl.
<img src="http://res.cloudinary.com/snapshot/image/upload/v1521117187/Screen_Shot_2018-03-15_at_10.55.39_pm_h1pq96.png" />
