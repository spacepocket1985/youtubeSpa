## Project Description  

This React application is designed for searching YouTube videos by keywords and saving search queries. Users can log in, perform searches, view results, and manage saved queries.  

## Technologies  

- React  
- Typescript  
- React Router
- Redux, RTK  
- React-hook-form
- YouTube Data API v3  
- ToDo API for authentication  
- Local Storage for data storage  

## Functionality  

### Authentication Page  

- Login form with fields for username and password.  
- Authentication using the ToDo API.  
- On successful login, the token is saved in localStorage, which redirects the user to the main page.  

### Main Page  

- Search bar for entering keywords.  
- Utilizes the YouTube Data API to perform video searches.  
- Search results are displayed as video cards, similar to YouTube, and can toggle between list and card views.  
- By default, displays 12 videos in list view.  

### Saved Queries  

- Separate page to display saved search queries.  
- Ability to edit and execute queries using the "Execute" button.  
- To save a query, an icon "Save Search" opens a form with fields:  
  - "Query" field pre-filled with the search bar input (non-editable).  
  - "Title" field for the name of the query (required).  
  - "Sort By" field (dropdown, values fetched from YouTube API).  
  - "Maximum Count" field (number from 0 to 50, optional).  
  
### User Logout  

- Users can log out of the service, which clears the token from localStorage.  

### Managing Saved Queries  

- Upon re-logging in, users see their saved queries.  
- Queries are personalized, showing only the saved queries for the logged-in user.  

## API  

The application uses the YouTube Data API for searching videos:  

### GET https://www.googleapis.com/youtube/v3/search  

## Conclusion  

This application provides users with a convenient interface for searching YouTube videos and managing their queries. It leverages modern web technologies to offer a reliable and intuitive user experience.  

## Notes  

- Ensure you have the necessary keys to work with the YouTube API and ToDo API.  
- Additional improvements may be needed for error handling and enhancing the user interface. 