/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'; 
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import { get_seller_request } from '../../store/Reducers/sellerReducer';

const SellerRequest = () => {
     const dispatch = useDispatch()
    const {sellers,totalSeller} = useSelector(state=> state.seller)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(get_seller_request({
            parPage,
            searchValue,
            page: currentPage
        }))

    },[parPage,searchValue,currentPage])

    return (
        <div className="px-4 lg:px-7 pt-3 bg-[#cdcae9] min-h-screen font-sans">
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50">
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}  />

                <div className="relative overflow-x-auto mt-6 rounded-xl border border-slate-200 shadow-md">
                    <table className="w-full text-sm text-left">

                        <thead className="text-xs uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white tracking-wider">
                            <tr>
                                <th scope="col" className="py-4 px-6 font-bold">No</th>
                                <th scope="col" className="py-4 px-6 font-bold">Name</th>
                                <th scope="col" className="py-4 px-6 font-bold">Email</th>
                                <th scope="col" className="py-4 px-6 font-bold">Payment Status</th>
                                <th scope="col" className="py-4 px-6 font-bold">Status</th>
                                <th scope="col" className="py-4 px-6 font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {sellers.map((d, i) => (
                                <tr className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300" key={i}>
                                    <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">{i+1}</td>
                                    <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-700">{d.name}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-slate-600">{d.email}</td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">{d.payment}</span>
                                    </td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">{d.status}</span>
                                    </td>
                                    <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <Link
                                                to={`/admin/dashboard/seller/details/${d._id}`}
                                                className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
                                                <FaEye size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="w-full flex justify-center sm:justify-end mt-6">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={50}
                        parPage={parPage}
                        showItem={4}/>
                </div>

            </div>
        </div>
    );
};

export default SellerRequest;