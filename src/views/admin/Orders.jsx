/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowAltCircleDown } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders } from '../../store/Reducers/couponReducer';
const Orders = () => {

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const {myOrders,totalOrder } = useSelector(state => state.coupon)

     useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_admin_orders(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className="bg-gradient-to-br bg-[#cdcae9] min-h-screen px-4 lg:px-7 pt-6 font-sans">
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <select
                        onChange={(e) => setParPage(parseInt(e.target.value))}
                        className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        type="text"
                        placeholder="search"
                    />
                </div>

                <div className="relative overflow-x-auto mt-6 rounded-xl border border-slate-200 shadow-md">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                            <tr>
                                <th className="py-4 px-6 font-bold">Order Id</th>
                                <th className="py-4 px-6 font-bold">Name</th>
                                <th className="py-4 px-6 font-bold">Price</th>
                                <th className="py-4 px-6 font-bold">Payment Status</th>
                                <th className="py-4 px-6 font-bold">Order Status</th>
                                <th className="py-4 px-6 font-bold">Date</th>
                                <th className="py-4 px-6 font-bold">Action</th>
                            </tr>
                        </thead>
                        { myOrders.map((o,i) =>
                        <tbody key={i} className='bg-white'>
                            <tr className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                                <td className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">#{o._id}</td>
                                <td className="py-4 px-6 font-semibold text-slate-700">{o.shippingInfo?.name}</td>
                                <td className="py-4 px-6 font-semibold text-slate-700">₹{o.price}</td>
                                <td className="py-4 px-6 font-medium text-slate-600">
                                    <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold'>{o.payment_status}</span>
                                </td>
                                <td className="py-4 px-6 font-medium text-slate-600">
                                    <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold'>{o.delivery_status}</span>
                                </td>
                                <td className="py-4 px-6 font-semibold text-slate-700">{o.date}</td>
                                <td className="py-4 px-6 font-medium">
                                    <Link to={`/admin/dashboard/order/details/${o._id}`} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">View</Link>
                                </td>
                            </tr>
                        </tbody>
                        )}
                    </table>
                </div>

                {
                     totalOrder <= parPage ? <div className="w-full flex justify-center sm:justify-end mt-6">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalOrder}
                        parPage={parPage}
                        showItem={4}
                    />
                </div> : ""
                }
            </div>
        </div>
    );
};

export default Orders;