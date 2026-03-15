/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer';
const Sellers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch()
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false);

    const {sellers,totalSeller } = useSelector(state => state.seller)

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_active_sellers(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className="px-4 lg:px-7 pt-6 bg-[#cdcae9] min-h-screen font-sans">
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <select onChange={(e) => setParPage(parseInt(e.target.value))}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        onChange={e => setSearchValue(e.target.value)} 
                        value={searchValue}
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                <div className="relative overflow-x-auto mt-6 rounded-xl border border-slate-200 shadow-md">
                    <table className="w-full text-sm text-left">

                        <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                            <tr>
                                <th scope="col" className="py-4 px-6 font-bold">No</th>
                                <th scope="col" className="py-4 px-6 font-bold">Image</th>
                                <th scope="col" className="py-4 px-6 font-bold">Name</th>
                                <th scope="col" className="py-4 px-6 font-bold">Shop Name</th>
                                <th scope="col" className="py-4 px-6 font-bold">Payment Status</th>
                                <th scope="col" className="py-4 px-6 font-bold">Email</th>
                                <th scope="col" className="py-4 px-6 font-bold">Status</th>
                                <th scope="col" className="py-4 px-6 font-bold">District</th>
                                <th scope="col" className="py-4 px-6 font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {sellers.map((d, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                                    <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">{i+1}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        <img className="w-[50px] h-[50px] rounded-lg object-cover shadow-md border-2 border-slate-200 hover:scale-110 hover:shadow-lg transition-all duration-300" src={d.image} alt="" />
                                    </td>
                                    <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-700">{d.name}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">{d.shopInfo?.shopname}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">{d.payment}</span>
                                    </td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">{d.email}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                         <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">{d.status}</span>
                                    </td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">{d.shopInfo?.district}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <Link to={`/admin/dashboard/seller/details/${d._id}`} className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
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
                    totalSeller <= parPage ? <div className="w-full flex justify-center sm:justify-end mt-6">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalSeller}
                        parPage={parPage}
                        showItem={4}
                    />
                </div> : ''
                }
                
            </div>
        </div>
    );
};

export default Sellers;