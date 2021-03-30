# UberTreatsApp

## To simply test the app on any Android device: 
- Download and install the android apk from [this link]().
- Run it on your mobile or virtual android device.

## To run it in a developer environment:
First clone the repository as:

`git clone https://github.com/swapnil-ahlawat/UberTreatsApp.git`

To run the server locally, open a terminal window in `./Backend`
- Run `npm install` (only while running for the first time)
- Run `npm start`

To run the frontend on any mobile device (iOS or Android, virtual or on the same network):
- Open a terminal window in `./Frontend`
- Run `npm install` (only while running for the first time)
- Run `expo start` to start the Expo client
- Use any of the listed options to see a preview of the app

The frontend by default uses our API hosted on Heroku for requests. In case you'd like to test the local backend with frontend, change the line 3 of ./Frontend/constants/theme.js to the following:

`export const LINK = 'http://localhost:5000';`

## Directory Structure
```
./UberTreatsApp
|  |- Backend
|  |  |- controllers  (handle the logic for request)
|  |  |  |- login-controllers.js
|  |  |  |- package-controllers.js
|  |  |  |- user-controllers.js
|  |  |
|  |  |- database
|  |  |  |- connection.js   (for connecting)
|  |  |  |- Order.js
|  |  |  |- Package.js
|  |  |  |- User.js   (defining schema of collections)
|  |  |
|  |  |- routes (for associating controllers with endpoints)
|  |  |  |- login-routes.js
|  |  |  |- package-routes.js
|  |  |  |- user-routes.js
|  |  |
|  |  |- .gitignore
|  |  |- app.js    (to set up the server)
|  |  |- package-lock.json
|  |  |- package.json   (for package dependencies)
|  |
|  |
|  |- Frontend
|  |  |- .expo-shared
|  |  |  |- assets.json
|  |  |
|  |  |- assets
|  |  |  |- ..
|  |  |
|  |  |- constants  (load and export constants)
|  |  |  |- icons.js
|  |  |  |- images.js
|  |  |  |- index.js
|  |  |  |- theme.js
|  |  |
|  |  |- navigation
|  |  |  |- customerTabs.js
|  |  |  |- personnelTabs.js
|  |  |  |- restaurantTabs.js
|  |  |  |- warehouseTabs.js
|  |  |
|  |  |- screens    (frontend for all screens)
|  |  |  |- Order.js
|  |  |  |- WarehouseRestaurant.js
|  |  |  |- WarehouseHome.js
|  |  |  |- Cart.js
|  |  |  |- PersonnelHome.js
|  |  |  |- DeliverOrder.js
|  |  |  |- index.js
|  |  |  |- SignUp.js
|  |  |  |- Wallet.js
|  |  |  |- Restaurant.js
|  |  |  |- RestaurantHome.js
|  |  |  |- Scan.js
|  |  |  |- CustomerHome.js
|  |  |
|  |  |- .gitignore
|  |  |- App.js     (main app for the frontend)
|  |  |- app.json
|  |  |- babel.config.js
|  |  |- package-lock.json
|  |  |- package.json   (for package dependencies)
|  |
|  |- .gitignore
|  |- package-lock.json
|  |- README.md

```
## The API
It has been hosted on https://powerful-bastion-70976.herokuapp.com/ on Port 443.


## Login credentials:
- Customer
  - Phone No.: 98981,
  - Password: admin,
  - User Type: Customer 

- Delivery Personnel
  - Phone No.: 98986,
  - Password: admin,
  - User Type: Delivery Personnel 

- Restaurant
  - Phone No.: 98985,
  - Password: admin,
  - User Type: Restaurant 

- Warehouse:
  - Phone No.: 98980,
  - Password: admin,
  - User Type: Warehouse

Every phone number of the form 9898x belong to the restaurant except for x = 0, 1 and 6.