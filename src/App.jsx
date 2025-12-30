import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Favourite from './Pages/Favourite/Favourite';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer.jsx';
import Sidebar from './Components/Sidebar/Sidebar';
import ContextProvider from './Store/Store';
import About from './Pages/About/About.jsx';
import Result from './Pages/Result/Result.jsx';
import Person from './Pages/Person/Person.jsx'; // Import New Page

function App() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favourite-movies' element={<Favourite />} />
          <Route path='/about-movie/:id' element={<About />} />
          <Route path='/result-movies' element={<Result />} />
          <Route path='/person/:personId' element={<Person />} /> {/* Add Route */}
        </Routes>
        <Footer />
      </ContextProvider>
    </>
  );
}

export default App;
