const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());//React to link to API
app.use(express.json()); //API can read JSON data sent from react 

//mock data 
let events = [
  {
    id: 1, 
    title: "Morning Yoga", 
    date: "2026-11-10",
    startTime: "08:30",
    endTime: "09:15",
    location: "Community Hall",
    category: "Fitness",
    description: "Enjoy a refreshing yoga session to start your day.",
    capacity: 20, 
    spotsRemaining: 5, 
    isCancelled: false, 
  },
  {
    id: 2, 
    title: "Trail Walk",
    date: "2026-11-10",
    startTime: "11:30",
    endTime: "14:30",
    location: "Forest Trails",
    category: "Outdoors",
    description: "A guided walk through the local forest trails.",
    capacity: 30, 
    spotsRemaining:15, 
    isCancelled: false, 
  }
];

//retrieve data - all events
app.get('/api/events', (req, res) =>{
  res.json(events);
});

// retrieve data - 1 event 
app.get('/api/events/:id', (req,res) => {
  const id = Number(req.params.id); // convert string URL param to number
  const event = events.find( e => e.id === id);


  //in the case the id cannot be matched
  if (!event) {
    return res.status(404).json({ error: true, reason: "Event not found"});

  }
  res.json(event);
});

// register for an event
app.post('api/register/', (req, res) => {
  const { fullName, email, eventID } = req.body;

  //Basic Validation
  if (!fullName || !email) {
    return res.status(400).json({error: true, reason: "Name and email are required"});
  }

  //save onto database 
  console.log(`Registration received for ${fullName}' (${email}) for event ID: ${eventID}`);
  
  res.status(200).json({
    success: true, 
    message: `Registration successful for ${fullName}!`
  });
});

// start server
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
