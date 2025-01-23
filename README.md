# Favourite Movies & TV Show App

## Overview

**Favourite** is a Movie & TV Show search application built with **React.js**, allowing users to search for and view details about their favorite movies and TV shows. The app leverages **The Movie Database (TMDb) API** to provide real-time data about movies and shows. Users can search, view cast details, and explore related information on the results page.

## Features

- **Real-Time Search**: Search movies and TV shows using keywords, with suggestions displayed as you type.
- **Results Page**: Displays search results in an easy-to-navigate layout.
- **Movie & Show Details**: View details about movies and shows, including cast, run time, and production status.
- **TMDb API Integration**: Fetch movie/show data directly from TMDb, including cast images, production details, and more.
- **Responsive Design**: Mobile-friendly layout to ensure a smooth user experience across all devices.

## Screenshots

(Include screenshots or gifs here that highlight the main features and functionality of the app.)

## Technologies Used

- **React.js**: JavaScript library for building the user interface.
- **TMDb API**: API for retrieving movie and TV show data.
- **CSS**: For custom styling and responsive design.
- **React Router**: For navigating between the home page and the results page.
- **Axios**: For making API calls.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/sachinkumar2222/Favourite.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Favourite
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your TMDb API key:

   - Create a `.env` file in the root directory of your project.
   - Add your TMDb API key:

     ```
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open the app in your browser at `http://localhost:3000`.

## Usage

1. **Search for a Movie or TV Show**: Use the search bar in the navigation menu to type the name of a movie or TV show. Results will be displayed as you type.
2. **Navigate to the Results Page**: Hit "Enter" or click the search icon to navigate to the results page, which displays detailed information about the search results.
3. **View Details**: Click on a movie or TV show to view more information, such as the cast, production status, and run time.

## API Integration

This project integrates with the TMDb API to fetch data about movies and TV shows. To obtain an API key, visit [TMDb API](https://www.themoviedb.org/documentation/api).

### Example API Call:

```javascript
axios.get(`https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching movie details:', error);
  });
```

## Project Structure

```bash
Favourite/
├── public/
├── src/
│   ├── assets/           # Static images for navbar icons
│   ├── components/       # Components like Navbar, Suggest, etc.
│   ├── pages/            # Pages like ResultMovies.js for results
│   ├── Store/            # Global state management using Context API
│   ├── App.js            # Main component with routing setup
│   ├── index.js          # Entry point of the app
├── .env                  # API key configuration
├── package.json          # Project metadata and dependencies
└── README.md             # This README file
```

## Contributing

Contributions are welcome! If you would like to improve or add new features to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit the changes (`git commit -m "Added new feature"`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- **GitHub**: [sachinkumar2222](https://github.com/sachinkumar2222)
- **Email**: sparky.sachin.dev@gmail.com