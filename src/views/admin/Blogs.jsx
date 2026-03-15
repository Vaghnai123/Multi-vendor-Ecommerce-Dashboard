import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_blogs, delete_blog, messageClear } from '../../store/Reducers/blogReducer';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'; 
import { toast } from 'react-hot-toast';

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, successMessage } = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(get_blogs());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(get_blogs()); 
        }
    }, [successMessage, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(delete_blog(id));
        }
    };

    return (
        <div className='px-2 lg:px-7  h-full bg-[#cdcae9] min-h-screen'> 
            {/* Header Section */}
            <div className='w-full p-4 flex justify-between items-center  pb-6'>
                 <h1 className='text-[#333] font-bold text-2xl'>Blog Management</h1>
                 <Link to='/admin/dashboard/add-blog' className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 text-white rounded-md px-6 py-2 transition-all duration-300 font-medium'>
                    <FaPlus /> Add New Blog
                 </Link>
            </div>

            {/* Main Card Section */}
            <div className='w-full p-6 bg-white rounded-xl shadow-md'> 
                
                <div className='flex justify-between items-center pb-6 border-b border-slate-100 mb-4'>
                    <h2 className='text-slate-700 text-lg font-semibold'>All Blogs</h2>
                </div>

                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-slate-600'>
                        <thead className='text-xs text-slate-600 uppercase bg-transparent border-b border-slate-200'>
                            <tr>
                                <th scope='col' className='py-3 px-4 font-bold'>No</th>
                                <th scope='col' className='py-3 px-4 font-bold'>Image</th>
                                <th scope='col' className='py-3 px-4 font-bold'>Title</th>
                                <th scope='col' className='py-3 px-4 font-bold'>Category</th>
                                <th scope='col' className='py-3 px-4 font-bold text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length > 0 ? (
                                blogs.map((b, i) => (
                                    <tr key={i} className='bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200'>
                                        <td className='py-4 px-4 font-medium whitespace-nowrap text-slate-800'>{i + 1}</td>
                                        <td className='py-4 px-4'>
                                            <div className='w-[50px] h-[50px] overflow-hidden rounded-lg shadow-sm bg-slate-100'>
                                                <img className='w-full h-full object-cover' src={b.image} alt={b.title} />
                                            </div>
                                        </td>
                                        <td className='py-4 px-4 font-medium text-slate-700'>{b.title}</td>
                                        <td className='py-4 px-4'>
                                            <span className='bg-purple-100 text-purple-700 py-1 px-3 rounded-full text-xs font-semibold'>
                                                {b.category}
                                            </span>
                                        </td>
                                        <td className='py-4 px-4 text-right'>
                                            <div className='flex justify-end items-center gap-3'>
                                                <Link to={`/admin/dashboard/edit-blog/${b._id}`} className='p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors'>
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(b._id)} className='p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors'>
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-slate-400">
                                        No blogs found. Start by adding one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Blogs;