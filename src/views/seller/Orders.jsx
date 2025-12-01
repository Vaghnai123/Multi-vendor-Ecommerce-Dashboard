
import React, {useState} from 'react';
import Search from '../components/Search';
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";

const Orders = () => {

        const [currentPage, setCurrentPage] = useState(1)
        const [searchValue, setSearchValue] = useState('')
        const [parPage, setParPage] = useState(5)

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
                                        <th scope="col" className="py-4 px-6 font-bold">Action</th>

                                    </tr>
                                </thead>

                                <tbody className='bg-white'>
                                    {[1, 2, 3, 4, 5].map((d, i) => (
                                        <tr key={i} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
                                            <td scope="row" className="py-4 px-6 font-semibold whitespace-nowrap text-slate-800">#5454</td>
                                            <td scope="row" className="py-4 px-6 font-bold whitespace-nowrap text-green-600">$455</td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold'>Pending</span>
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>Pending</span>
                                            </td>
                                            <td scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-2">
                                                    <Link to={`/seller/dashboard/order/details/34`} className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg hover:scale-110 transition-all duration-300 active:scale-95">
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
                            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} parPage={parPage} showItem={4} />
                        </div>
            </div> 
        </div>
    );
};

export default Orders;