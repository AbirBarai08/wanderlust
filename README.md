# wanderlust
Wanderlust is a full-stack web application that helps users explore listings with rich geospatial features. Built with Node.js, Express, MongoDB, and Leaflet, it combines backend muscle with interactive frontend elegance.

# Features
- Dynamic star rating system using custom CSS
- Interactive maps powered by Leaflet and Geoapify
- Advanced search filtering using MongoDB queries and regular expressions
- Responsive UI with dropdown controls and swipe interactions
- Scalable backend with robust schema validation using Joi
- 
  # Tech Stack
- Frontend: HTML, CSS, JavaScript (Starability CSS, swipe interactions)
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Maps & Location: Leaflet, Geoapify
- Validation: Joi
- 
  # Setup Instructions
- Clone this repo:
git clone https://github.com/AbirBarai08/wanderlust.git
- Install dependencies:
npm install
- Configure environment variables (e.g. API keys, Mongo URI)
- Start the app:
node app.js

# Folder Structure
- /controllers – Route handlers
- /models – Mongoose schemas
- /views – EJS templates
- /public – Static files (CSS, JS, images)
- /utils – Helper modules
- /init – Application setup and configuration logic  
- /routes – Defines and organizes application endpoints

# Future Ideas
- Add user authentication and reviews
- Enable location-based search
- Integrate Mapbox for enhanced visuals
- Deploy to Render for live access
