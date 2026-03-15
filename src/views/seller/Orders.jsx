/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'; 
import Search from '../components/Search';
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_orders } from '../../store/Reducers/couponReducer';

const Orders = () => {

        const dispatch = useDispatch()

        const {myOrders,totalOrder } = useSelector(state => state.coupon)
        const {userInfo } = useSelector(state => state.auth)

        const [currentPage, setCurrentPage] = useState(1)
        const [searchValue, setSearchValue] = useState('')
        const [parPage, setParPage] = useState(5)

        useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue,
            sellerId: userInfo._id
        }
        dispatch(get_seller_orders(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className='bg-gradient-to-br bg-[#cdcae9] min-h-screen px-4 lg:px-7  font-sans'>
            <div className='w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50'>
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                <div className="relative overflow-x-auto mt-6 rounded-xl border border-slate-200 shadow-md">
                            <table className="w-full text-sm text-left">

                                <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                                    <tr>
                                        <th scope="col" className="py-4 px-6 font-bold">Order ID</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Price</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Payment Status</th>
                                        <th scope='col' className='py-4 px-6 font-bold'>Order Status</th>
                                        <th className="py-4 px-6 font-bold">Date</th>
                                        <th scope="col" className="py-4 px-6 font-bold">Action</th>

                                    </tr>
                                </thead>

                                <tbody className='bg-white'>
                                    {myOrders.map((d, i) => (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">#{d._id}</td>
                                            <td scope="row" className="py-4 px-6 font-bold whitespace-nowrap text-green-600">₹{d.price}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold'>{d.payment_status}</span>
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>{d.delivery_status}</span>
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">{d.date}</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <Link to={`/seller/dashboard/order/details/${d._id}`} className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                        <FaEye size={16} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                        {
                            totalOrder <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                            <Pagination 
                                pageNumber = {currentPage}
                                setPageNumber = {setCurrentPage}
                                totalItem = {totalOrder}
                                parPage = {parPage}
                                showItem = {3}/>
                            </div> 
                        }
            </div> 
        </div>
    );
};

export default Orders;