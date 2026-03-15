
import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Header = ({ showSidebar, setShowSidebar }) => {

    const {userInfo } = useSelector(state => state.auth)

 return (
         <div className="w-full py-4 px-4 lg:px-7">
             <div className="ml-0 lg:ml-[260px] rounded-2xl h-[65px] flex justify-between items-center bg-[#cdcae9]  px-5 transition-all duration-300">

                 <div onClick={() => setShowSidebar(!showSidebar)} className="w-[35px] flex lg:hidden h-[35px] rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-105 text-white">
                  <span><FaList /></span>
                  </div>
                  
                  <div className="hidden md:block">
                    <input className="px-6 py-2.5 w-[350px] outline-none border bg-slate-50 border-slate-300 rounded-full text-slate-700 placeholder-slate-400 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" type="text"
                    name="search"
                    placeholder="Search..." />
                    </div>

                 <div className="flex justify-center items-center gap-8 relative">
                     <div className="flex justify-center items-center">
                         <div className="flex justify-center items-center gap-4">
                             <div className="flex justify-center items-center flex-col text-end">
                                 <h2 className="text-md font-bold text-slate-800">{ userInfo.name }</h2>
                                     <span className="text-[15px] text-slate-800 w-full font-medium ">{ userInfo.role }</span>
                             </div>
                                <div> 
                                {
                                userInfo.role === 'admin' ? <img className="w-[45px] h-[45px] rounded-full object-contain ring-2 ring-indigo-500 shadow-md"  src="/public/image/admin.png"alt="Admin Profile" /> : <img className='w-[45px] h-[45px] rounded-full overflow-hidden' src={userInfo.image} alt="" />
                                }
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
 );
};

export default Header;