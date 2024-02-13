const express = require('express')
const app = express();
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoutes = require('./routes/usersRoute')
const busRoutes = require('./routes/busRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const path = require('path');

app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/buses',busRoutes)
app.use('/api/bookings' ,bookingsRoute)
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  const rootPath = path.join(__dirname, '../'); // Go up two directories to the root
  const staticFolderPath = path.join(rootPath, 'Frontend', 'build');

  // Set a static folder
  app.use(express.static(staticFolderPath));

  // Any route which is not API will be routed to index.html
  app.get('*', (req, res) => {
    const indexPath = path.resolve(staticFolderPath, 'index.html');
    res.sendFile(indexPath);
  });
}else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.listen(port ,() => {
    console.log(`Node server listening on port :${port}`  )
} )