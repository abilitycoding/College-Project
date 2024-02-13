# Mega Bus Ticket Booking App

Welcome to the Mega Bus Ticket Booking App, a comprehensive solution for booking bus tickets.

## Prerequisites

Before running the application, ensure you have the following prerequisites:

- Node.js (v18.16.1)
- npm (v9.5.1)

## Available Scripts

In the project directory, you can run the following scripts:

### `npm test`

This script is for running tests. By default, it reports an error if no tests are specified.

### `npm start`

This script starts the application in production mode.

### `npm run server`

This script starts the development server for the backend. It uses Nodemon for automatic server restarts when code changes are detected.

### `npm run client`

This script starts the development server for the frontend. It uses the specified prefix to locate the frontend directory.

### `npm run dev`

This script is for running both the client and server concurrently. It's a convenient way to work on both parts of your application during development.

### `npm run data:import`

This script runs the `seeder.js` script to import data into your application.

### `npm run data:destroy`

This script runs the `seeder.js` script with the `-d` flag to destroy data.

### `npm run build`

This script installs project dependencies, then installs frontend dependencies using the specified prefix and finally builds the frontend for production. The optimized production build is located in the `build` folder.

## License

This project is licensed under the ISC License.

## Acknowledgments

Special thanks to the creators of the libraries and tools used in this project.
