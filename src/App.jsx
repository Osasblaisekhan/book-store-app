import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Table from './components/pages/Table';
import Card from './components/pages/Card';

import BASE_URL from './components/BASEURL';

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try{
      const booksData = await axios.get(BASE_URL);
      setBooks(booksData.data.AllBooks);
      console.log(booksData.data.AllBooks)
       toast.success('Books Loaded successfully', {
                             position: 'top-right',
                             autoClose: 5000,
                             hideProgressBar: false,
                             closeOnClick: true,
                             pauseOnHover: true,
                             draggable: true,
                         });

    }catch(err){
      toast.error('Unable To Load Books', {
                             position: 'top-right',
                             autoClose: 5000,
                             hideProgressBar: false,
                             closeOnClick: true,
                             pauseOnHover: true,
                             draggable: true,
                         });
      console.error(`Unable to load books`, err)
    };

  }

  useEffect(()=>{
    fetchBooks();
  },[]);

  return (
    <div>
     <Router>
        <Navbar fetchBooks={fetchBooks}/>
        <div className='md:px-20 px-8'>
          <Routes>
          <Route path={'/'} exact element={<Table books={books} fetchBooks={fetchBooks}/>}/>
          <Route path={'/card'} element={<Card books={books} fetchBooks={fetchBooks}/>}/>
        </Routes>
        </div>

        <ToastContainer />
     </Router>
    </div>
  )
}

export default App;
