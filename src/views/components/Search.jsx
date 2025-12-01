
import React from 'react';
const Search = ({setParPage,setSearchValue,searchValue}) => {
    return (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <select
                        onChange={(e) => setParPage(parseInt(e.target.value))}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input
                        onChange={(e) => setSearchValue(e.target.value)} 
                        value={searchValue}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        type="text"
                        placeholder="Search..."/>
                </div>
    );
};

export default Search;