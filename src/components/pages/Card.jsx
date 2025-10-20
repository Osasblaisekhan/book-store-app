import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Card = ({ books }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <div className='mt-24 flex flex-wrap justify-center' data-aos="fade-up-right">
      {books.map((book) => (
        <div
          className='m-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105'
          key={book._id}
        >
          <h2 className='text-lg font-semibold'>Book Title: <span className='text-blue-600'>{book.title}</span></h2>
          <h2 className='text-lg font-semibold'>Book Author: <span className='text-green-600'>{book.author}</span></h2>
          <h2 className='text-lg font-semibold'>Book Publish Date: <span className='text-purple-600'>{formatDate(book.publishDate)}</span></h2>
        </div>
      ))}
    </div>
  );
};

export default Card;