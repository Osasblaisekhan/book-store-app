import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Time from './Time';
import Modal from './modal';
import BASE_URL from './BASEURL';


const Navbar = ({ fetchBooks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const [isAdding, setIsAddingBook] = useState(false);
    
    const [modalData, setModalData] = useState({author:'', title:'', publishDate:''})
    const HandleAddBooks = async () => {
        try{
            if(!modalData.author || !modalData.title || !modalData.publishDate){
                 toast.error('All fields are required', {
                                         position: 'top-right',
                                         autoClose: 5000,
                                         hideProgressBar: false,
                                         closeOnClick: true,
                                         pauseOnHover: true,
                                         draggable: true,
                                     });
                                     return
            }
            setIsAddingBook(true);
            await axios.post(BASE_URL, modalData);
              
            toast.success('Book Added successfully', {
                                         position: 'top-right',
                                         autoClose: 5000,
                                         hideProgressBar: false,
                                         closeOnClick: true,
                                         pauseOnHover: true,
                                         draggable: true,
                                     })

                                     await fetchBooks()
        }catch(err){
            toast.error('Unable To Add Book', {
                                         position: 'top-right',
                                         autoClose: 5000,
                                         hideProgressBar: false,
                                         closeOnClick: true,
                                         pauseOnHover: true,
                                         draggable: true,
                                     });
                                     console.error('Unable to add book', err);
        };

        setModalData({author:'', title:'', publishDate:''});
        setIsAddingBook(false);
        setIsOpen(false)


    }
 return (
    <div className='w-full bg-[#7c41ac7c] h-20 fixed top-0 flex justify-between px-10 items-center'>
        <div className='hidden md:block'>
            <Time />
        </div>
      <nav>
        <ul className='flex gap-10 md:gap-24 items-center justify-center'>
            <Link to={'/'} className='btn font-bold '>
            <li>TABLE</li>
            </Link>
             <Link to={'/card'} className='btn font-bold'>
             <li>CARDS</li>
            </Link>
        </ul>
      </nav>
        <button className="btn font-bold" onClick={() => setIsOpen(true)}>{isEdit ? 'UPDATING BOOK' : 'ADD BOOK'}</button>
      <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title={isEdit ? 'EDIT BOOK' : 'ADD BOOK'}>
        <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={(e)=>{e.preventDefault(); HandleAddBooks()}}>
      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={modalData.author}
          onChange={(e) => setModalData({ ...modalData, author: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter author name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={modalData.title}
          onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter book title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Publish Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={modalData.publishDate}
          onChange={(e) => setModalData({ ...modalData, publishDate: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
       {isAdding ? 'SUBMITING...' : 'SUBMIT'}
      </button>
    </form>
      </Modal>
      </div>
    </div>
  )
}

export default Navbar;
