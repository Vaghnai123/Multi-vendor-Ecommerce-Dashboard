import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_blog, messageClear } from '../../store/Reducers/blogReducer';
import { toast } from 'react-hot-toast';

const AddBlog = () => {
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage } = useSelector(state => state.blog);

    const [state, setState] = useState({
        title: '',
        category: '',
        description: ''
    });

    const [image, setImage] = useState(null);
    const [imageShow, setImageShow] = useState('');

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setState({ title: '', category: '', description: '' });
            setImage(null);
            setImageShow('');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const imageHandle = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageShow(URL.createObjectURL(file));
        }
    };

    const add = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', state.title);
        formData.append('category', state.category);
        formData.append('description', state.description);
        formData.append('image', image);

        dispatch(add_blog(formData));
    };

    return (
        <div className='px-2 lg:px-7 pt-5 h-full bg-[#cdcae9] min-h-screen'>
            
            {/* Header Section */}
            <div className='w-full p-4 flex justify-between items-center'>
                 <h1 className='text-[#333] font-bold text-2xl'>Add New Blog</h1>
                 <Link to='/admin/dashboard/blogs' className='bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 text-white rounded-md px-7 py-2 my-2 transition-all duration-300 font-medium'>
                    All Blogs
                 </Link>
            </div>

            {/* Main Form Card */}
            <div className='w-full p-6 bg-white rounded-xl shadow-md mb-5'>
                <form onSubmit={add}>
                    <div className='flex flex-col mb-3 md:flex-row gap-4 w-full'>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-slate-600 font-medium' htmlFor="title">Post Title</label>
                            <input onChange={inputHandle} value={state.title} className='px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-slate-50 border border-slate-200 rounded-md text-[#333]' type="text" placeholder='Blog title' name='title' id='title' required />
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-slate-600 font-medium' htmlFor="category">Category</label>
                            <input onChange={inputHandle} value={state.category} className='px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-slate-50 border border-slate-200 rounded-md text-[#333]' type="text" placeholder='Category' name='category' id='category' required />
                        </div>
                    </div>

                    <div className='flex flex-col mb-3 w-full gap-1'>
                        <label className='text-slate-600 font-medium' htmlFor="image">Banner Image</label>
                        <input onChange={imageHandle} className='px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-slate-50 border border-slate-200 rounded-md text-[#333] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100' type="file" name='image' id='image' required />
                        {imageShow && <img src={imageShow} alt="preview" className="mt-3 w-full md:w-[300px] h-[150px] object-cover rounded-md border border-slate-200" />}
                    </div>

                    <div className='flex flex-col mb-3 w-full gap-1'>
                        <label className='text-slate-600 font-medium' htmlFor="description">Description</label>
                        <textarea onChange={inputHandle} value={state.description} rows={5} className='px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none bg-slate-50 border border-slate-200 rounded-md text-[#333]' placeholder='Blog content...' name='description' id='description' required></textarea>
                    </div>

                    <button disabled={loader} type="submit" className='bg-purple-600 w-full md:w-[200px] hover:shadow-purple-500/30 hover:shadow-lg hover:bg-purple-700 text-white rounded-md px-7 py-3 mb-3 font-medium transition-all duration-300 disabled:bg-purple-300'>
                        {loader ? 'Loading...' : 'Add Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;