/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { TbEdit } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { categoryAdd, messageClear, get_category,updateCategory,deleteCategory } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Search from '../components/Search';

const Category = () => {

    const dispatch = useDispatch()
    const {loader,successMessage,errorMessage,categorys} = useSelector(state=> state.category)


    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [imageShow, setImage] = useState('')
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
     const [state, setState] = useState({

        name: '',
        image: ''

    })

    const imageHandle = (e) => {
        let files = e.target.files 
        if (files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }

    const addOrUpdateCategory = (e) => {
        e.preventDefault()
        if (isEdit) {
            dispatch(updateCategory({ id:editId, ...state }))
        }else{
            dispatch(categoryAdd(state))
        }
        
        // console.log(state)
    }

     useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            setState({
                name: '',
                image: ''
            }) 
            setImage('')

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        

    },[successMessage,errorMessage,dispatch])

 useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj))

    },[searchValue, currentPage,parPage])

    /// Handle Edit Button 
    const handleEdit = (category) => {
        setState({
            name: category.name,
            image: category.image
        })
        setImage(category.image)
        setEditId(category._id)
        setIsEdit(true)
        setShow(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure to delete category?')) {
            console.log("delete category id",id);
            dispatch(deleteCategory(id));
        }
    }

    return (
        <div className="bg-gradient-to-br bg-[#cdcae9] min-h-screen px-4 lg:px-7 pt-6 font-sans">

            <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-2xl shadow-xl border border-slate-200/50">
                <h1 className="text-lg font-bold text-slate-800">Category</h1>
                <button
                    onClick={() => setShow(true)}
                    className="bg-indigo-600 shadow-lg hover:shadow-indigo-600/40 px-4 py-2 cursor-pointer text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all"
                >
                    Add
                </button>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-7">

                <div className="w-full lg:w-7/12">

                    <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">

                        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}  />

                        <div className="relative overflow-x-auto mt-6 rounded-xl border border-slate-200 shadow-md">
                            <table className="w-full text-sm text-left">

                                <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                                    <tr>
                                        <th scope="col" className="py-4 px-6 font-bold">Number</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Image</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Name</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Action</th>
                                    </tr>
                                </thead>

                                <tbody className='bg-white'>
                                    {categorys.map((d, i) => (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">{i+1}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <img className="w-[50px] h-[50px] rounded-lg object-cover shadow-md border-2 border-slate-200 hover:scale-110 hover:shadow-lg transition-all duration-300" src={d.image} alt="" />
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-700">{d.name}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <Link onClick={() => handleEdit(d)} className="p-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                        <TbEdit size={16} />
                                                    </Link>
                                                    <Link onClick={() => handleDelete(d._id)} className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                        <FaTrashCan size={14} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                        <div className="w-full flex justify-center sm:justify-end mt-6">
                            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} parPage={parPage} showItem={4} />
                        </div>

                    </div>

                </div>

                <div className={`w-full lg:w-5/12 transform transition-transform duration-500 ease-in-out ${show ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 fixed lg:relative top-0 right-0 h-full lg:h-auto z-50`}>
                    <div className="w-full h-full">

                        <div className="bg-white h-full lg:rounded-2xl shadow-xl border border-slate-200/50 px-6 py-4">

                            <div className="flex justify-between items-center mb-6">
                                <h1 className="font-bold text-xl  text-slate-800">Add Category</h1>
                                <div onClick={() => setShow(false)} className="block lg:hidden cursor-pointer text-2xl text-slate-600 hover:text-red-500 transition-colors">
                                    <IoMdCloseCircle />
                                </div>
                            </div>

                            <form onSubmit={addOrUpdateCategory}>
                                <div className="flex flex-col w-full gap-2 mb-4">
                                    <label htmlFor="name" className="text-sm text-slate-700 font-medium">Category Name</label>
                                    <input value={state.name} onChange={(e)=>setState({...state,name : e.target.value})} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" type="text" id="name" name="category_name" placeholder="Category Name" />
                                </div>

                                <div className="flex flex-col w-full gap-2 mb-4">
                                    <label htmlFor="image" className="text-sm text-slate-700 font-medium">Image</label>
                                    <label className="flex justify-center items-center flex-col h-[180px] cursor-pointer border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 w-full rounded-lg transition-all" htmlFor="image">
                                    {
                                        imageShow ? <img className='w-full h-full' src={imageShow} /> : <>
                                        <span className="text-4xl mb-2 text-slate-400"><FaImage /></span>
                                        <span className="text-sm text-slate-600">Select Image</span>
                                        </>
                                    }
                                        
                                    </label>
                                    <input onChange={imageHandle} className="hidden" type="file" name="image" id="image" />
                                </div>

                                <div className="mt-6">
                                    <button disabled={loader ? true : false} className="bg-indigo-600 w-full hover:shadow-indigo-600/40 hover:shadow-lg hover:bg-indigo-700 text-white rounded-lg px-7 py-2 font-semibold transition-all active:scale-95">
                                    { 
                                        loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Category'
                                    } 
                                    </button>
                                </div>       
                            </form>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Category;