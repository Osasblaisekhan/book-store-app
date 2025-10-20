import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { MdDetails, MdDangerous } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import Modal from '../modal';
import axios from 'axios';
import BASE_URL from '../BASEURL';
import { toast } from 'react-toastify';

const Table = ({ books, fetchBooks }) => {
  const [isBrief, setIsBrief] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelte, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [modalData, setModalData] = useState({author:'', title:'', publishDate:''})

    const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
  
  const ViewBrief = (id) => {
    setIsOpen(true);
    setIsBrief(id);
    console.log(id);
  };

  const HandleEdit = (id) => {
    setIsOpen(true);
    setIsEdit(id);
  }

  const HandleDelete = (id) =>{
    const book = books.find((b)=> b._id == id);
    confirmAlert({
      title:'DELETE',
      message:`Are you sure to delete this book: ${" "} ${book.title}?. This action can not be undone`,
      buttons:[
        {
          label:'DELETE',
          onClick: async () =>{
            setIsDelete(true);
            try{
              await axios.delete(`${BASE_URL}/${id}`)
                 toast.success('Book Deleted successfully', {
                                           position: 'top-right',
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                       });
                                       await fetchBooks();
            }catch(err){
                 toast.error('Unable To Delete Book', {
                                           position: 'top-right',
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                       });
            }
            setIsDelete(false);
          }
        },
        {
          label: 'Cancel',
          onClick : ()=> {}
        }
      ]
    })
  }

  useEffect(()=>{
    if(isBrief){
      const book = books.find((book)=> book._id == isBrief);
      setModalData({author:book.author, title:book.title, publishDate:formatDate(book.publishDate)});
  
      
    }else{
      setModalData({author:'', title:'', publishDate:''})
    }

  },[isBrief,books]);

  useEffect(()=>{
    if(isEdit){
      const book = books.find((b)=> b._id == isEdit);
       setModalData({author:book.author, title:book.title, publishDate:formatDate(book.publishDate)});
    }else{
      setModalData({author:'', title:'', publishDate:''})
    }
  },[isEdit, books]);

  const  HandleAddEditBook = async () => {
    try{
      if(isEdit){
        if(!modalData.author || !modalData.title || !modalData.publishDate){
           toast.success('All Input Are Required', {
                                           position: 'top-right',
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                       });
                                       return
        }
        setIsUpdate(true);
        await axios.put(`${BASE_URL}/${isEdit}`, modalData);
         toast.success('Book Edited successfully', {
                                           position: 'top-right',
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                       });
                                       await fetchBooks();
      }

    }catch(err){
       toast.error('Unable To Edit Book', {
                                           position: 'top-right',
                                           autoClose: 5000,
                                           hideProgressBar: false,
                                           closeOnClick: true,
                                           pauseOnHover: true,
                                           draggable: true,
                                       });
    };
     setModalData({author:'', title:'', publishDate:''});
     setIsEdit(null);
     setIsUpdate(false);
        setIsOpen(false)
  }

  return (
    <div className='mt-24 mb-16' data-aos="fade-up-right">
      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AUTHOR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TITLE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PUBLISH DATE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Dynamically render rows based on the books prop */}
            {books.map((book, index) => (
              <tr key={book.id}>
                <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(book.publishDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className='flex gap-3'>
                    <button className="btn  bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() =>ViewBrief(book._id)}>
                      <MdDetails className="inline mr-1" />   DETAILS
                      </button>
                    
                    <button className='btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600' onClick={()=> HandleEdit(book._id)}>
                      <FaRegEdit className="inline mr-1" /> EDIT
                    </button>
                    <button className='btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600' onClick={()=> HandleDelete(book._id)}>
                      <FaTrash className="inline mr-1" /> {isDelte ? 'DELETING...' : 'DELETE'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
     <Modal open={isOpen} isBrief={isBrief} isEdit={isEdit} onClose={() => {setIsEdit(null); setIsBrief(null); setIsOpen(false)}} title={isEdit ? 'EDIT' : 'DETAILS'}>
      {
        isEdit ? (
            <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={(e)=>{e.preventDefault(); HandleAddEditBook()}}>
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
      {isUpdate ? 'UPDATING...' : 'UPDATE'}
      </button>
    </form>
        ) : (
     <div>
      <h2>Author:{modalData.author}</h2>
      <h2>Title:{modalData.title}</h2>
      <h2>PublishDate:{modalData.publishDate}</h2>
     </div>
        )
      }
     </Modal>
    </div>
  );
};

export default Table;