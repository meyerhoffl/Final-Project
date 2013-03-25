For my final project at the Nashville Software School, I am mapping the distance and elevation between Nashville's 
BCycle stations. Ultimately, I'd like for the user to be able to select their station, and then select a route that
ends at another station based on distance, elevation, and points of interest. 

For this project, I am using the Foundation framework and the Google Maps API.

At this stage, the map is displaying routes to and from each BCycle station after the user selects their station 
and the distance that they would like to ride. It is also entering the coordinates for the user's station and the last
station on the list into the drawPath function, which takes 5 elevation samples along the route. Currently, these samples
are just being displayed in the console log.

Ultimately, I'd like to sort the routes by elevation, like I did for the distances, so that the user can select
a route based on distance and elevation along the way. For the sake of finishing the project before March 27, however, I am working on
a function that would enable the user to click a button next to the route they want and display the elevation
stats for that route. 

I've added a branch to this project called elevation to continue working on the original goal, sorting routes by distance
and elevation.
