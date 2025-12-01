/* eslint-disable react-hooks/exhaustive-deps */
import Search from '../components/Search';
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { TbEdit } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { get_products } from '../../store/Reducers/productReducer';



const Products = () => {

    const dispatch = useDispatch()
    const { products,totalProduct} = useSelector(state=> state.product)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products(obj))

    },[searchValue, currentPage,parPage])


    return (
        <div className='bg-gradient-to-br bg-[#cdcae9] min-h-screen px-4 lg:px-7 pt-3 font-sans'>
            <div className='w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50'>
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                <div className="relative overflow-x-auto mt-6 rounded-xl border border-slate-200 shadow-md">
                            <table className="w-full text-sm text-left">

                                <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                                    <tr>
                                        <th scope="col" className="py-4 px-6 font-bold">Number</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Image</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Name</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Category</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Brand</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Price</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Discount</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Stock</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Action</th>

                                    </tr>
                                </thead>

                                <tbody className='bg-white'>
                                    {products.map((d, i) => (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">{i+1}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <img className="w-[50px] h-[50px] rounded-lg object-cover shadow-md border-2 border-slate-200 hover:scale-110 hover:shadow-lg transition-all duration-300" src={ d.images[0]} alt="" />
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-700">{ d?.name?.slice(0,15)}...</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">
                                                <span className='px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold'>{d.category}</span>
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">{d.brand}</td>
                                            <td scope="row" className="py-4 px-6 font-bold whitespace-nowrap text-green-600">${d.price}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">
                                                <span className='px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-semibold'>
                                                    {
                                                        d.discount === 0 ? <span>No Discount</span> : <span>{d.discount}%</span>
                                                    }
                                                </span>
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-700">{d.stock}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <Link to={`/seller/dashboard/edit-product/${d._id}`} className="p-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                        <TbEdit size={16} />
                                                    </Link>
                                                    <Link to="#" className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                        <FaEye size={16} />
                                                    </Link>
                                                    <Link to="#" className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                        <FaTrashCan size={14} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

            {
                totalProduct <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                <Pagination 
                    pageNumber = {currentPage}
                    setPageNumber = {setCurrentPage}
                    totalItem = {50}
                    parPage = {parPage}
                    showItem = {3}
                />
                </div>
            }
            
            </div> 
        </div>
    );
};

export default Products;