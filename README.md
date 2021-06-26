# FEC AnneBonny - HipCamp: Booking Service

For our Front End Capstone Project (FEC) at Hack Reactor, we were challenged to replicate an app's item page using Service-Oriented Architecture. We, Team Anne Bonny, (all teams in our cohort were named for legendary female pirates) chose [Hipcamp] (Hipcamp.com), an “AirBnB-esque” website that allows you to book privately owned campsites. Sites range from urban backyards and farms to glamping in yurts. We used [Twisselman's Glamping by the Pond] (https://www.hipcamp.com/en-US/california/twisselman-ranch/twisselman-s-glamping-by-the-pond) as our same item page and set sail as a team of four pirates on uncharted waters. I opted to build the Booking Service due to the complexity of creating a calendar with 42-day-long months!

## Related Projects

  - [Overview Service] (https://github.com/ArrrrWeBeAnneBonny/overview.git)
  - [Photogallery Service] (https://github.com/ArrrrWeBeAnneBonny/photogallery.git)
  - [Reviews Service] (https://github.com/ArrrrWeBeAnneBonny/reviews.git)

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#Requirements)
3. [Development](#Development)

## Usage

> This service contains a calendar and booking widget and has two endpoints that interact with a mongoDb database in order to display mock data about the selected cammpsite, including date availability for bookings, how many months in advance a booking can be made, and the cost of a booking for a selected range of available dates (including weeknight discounts, cleaning fees, etc.).

> ![Booking Service](https://github.com/ArrrrWeBeAnneBonny/booking/blob/main/assets/fec.gif "Booking Service")

>1.1 API Endpoints
>GET ‘/booking/?campId=’
>Given a campId retrieves that site's booking widget pre-populated with: 
  * availability (for as many months out as the site accept a future reservation)
  * average price per night
  * discounts
  * extra fees
  * booking type
  * multi-site availability (for example one campsite with multiple sites)
GET ‘/booking/?campId=&check_in_date=&check_out_date=/bookingTotal’
>Given a campId, user-selected check-in and check-out dates, retrieves a confirmation that a booking has been made

> ![Diagram of How Things are Working in my Service:](https://github.com/ArrrrWeBeAnneBonny/booking/blob/main/assets/diagram.png "Diagram of How Things are Working in my Service")
>
## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.15.3

>2.1 Install Project Dependencies
- In terminal, from within the root directory::
1. `npm install -g webpack`
2. `npm install`

>2.1 Of Note:
1. To enter Mongo cli: `mongo`(db name is booking)

>2.2 Start the Server:
1. To run the web server and open index.html: run npm start (to run the web server, webpack --watch and open index.html: run npm altStart). The Booking Service should now load up.

>2.3 [Optional] Run Tests
- To run all tests: `npm test`

## Development
-This Service uses the following tech stack:
- Server: Node v10.15.1 (with Express)
- Deployment: Docker and AWS EC2 + S3
- Client: React
- Database: MongoDb
- Testing: Jest
- 



