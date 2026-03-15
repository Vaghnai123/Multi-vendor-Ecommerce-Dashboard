import React, { useEffect, useState } from 'react';
import { FaImages } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { profile_image_upload,profile_info_add, messageClear } from '../../store/Reducers/authReducer'
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils'; 
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';
const Profile = () => {
    const dispatch = useDispatch()
    const { userInfo,loader,successMessage } = useSelector(state => state.auth)
  
    const [state, setState] =  useState({
        division: '',
        district: '',
        shopName: '',
        sub_district: '' 
    })

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[successMessage])

     const add_image = (e) => {
        if (e.target.files.length > 0) { 
            const formData = new FormData()
            formData.append('image',e.target.files[0])
            dispatch(profile_image_upload(formData))
        }
    }

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const add = (e) => {
        e.preventDefault()
        dispatch(profile_info_add(state))
    }


    return (
        <div className='px-2 lg:px-7 pb-20 bg-gradient-to-br bg-[#cdcae9] min-h-screen'>
            <div className='w-full  flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    <div className='w-full p-2 bg-white rounded-2xl shadow-xl border border-slate-200/50 text-slate-700'>
            <div className='flex justify-center items-center py-3'>
                {
                    userInfo?.image ? <label htmlFor="img" className='h-[220px] w-[220px] relative p-3 cursor-pointer object-contain '>
                        <img src={userInfo?.image} alt="" />
                        {
                        loader && <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                            <span>
                                <FadeLoader/>
                            </span>
                        </div>
                    }


                    </label> : <label className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-indigo-500 border-slate-300 relative' htmlFor="img">
                    <span><FaImages /> </span>
                    <span>Select Image</span>
                    {
                        loader && <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                            <span>
                                <FadeLoader/>
                            </span>

                        </div>
                    }

                </label>
                }
                <input onChange={add_image} type="file" className='hidden' id='img' /> 
            </div>

                    <div className='px-0 md:px-5 py-2'>
                        <div className='flex justify-between text-sm flex-col gap-3 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md border border-slate-200 relative'>
                            <span className='p-[6px] bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'><TbEdit size={16} /> </span>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Name :</span>
                                <span className='font-medium text-slate-800'>{userInfo.name}</span> 
                            </div>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Email :</span>
                                <span className='font-medium text-slate-800'>{userInfo.email}</span> 
                            </div>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Role :</span>
                                <span className='font-medium text-slate-800'>{userInfo.role}</span> 
                            </div>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Status :</span>
                                <span className='font-medium text-slate-800'>{userInfo.status}</span> 
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-semibold text-slate-600'>Payment Account :</span>
                                <p>
                                    {
                                        userInfo.payment === "active" ? <span className='bg-red-500 text-white text-xs cursor-pointer font-semibold px-3 py-1 rounded-full shadow-md hover:bg-green-600 transition-all'>{userInfo.payment}</span> : <span onClick={()=> dispatch(create_stripe_connect_account())} className='bg-indigo-500 text-white text-xs cursor-pointer font-semibold px-3 py-1 rounded-full shadow-md hover:bg-indigo-600 transition-all'>Click Active</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='px-0 md:px-5 py-2'>
                    {
                        !userInfo?.shopInfo ? <form onSubmit={add}>
                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="Shop">Shop Name</label>
                            <input value={state.shopName} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="text" name='shopName' id='Shop' placeholder='Shop Name' />
                        </div>  

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="division">Shop Address</label>
                            <input value={state.division} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="text" name='division' id='division' placeholder='division Name' />
                        </div>  

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="district">District Name</label>
                            <input value={state.district} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="text" name='district' id='district' placeholder='District Name' />
                        </div>  

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="sub">Sub District Name</label>
                            <input value={state.sub_district} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="text" name='sub_district' id='sub' placeholder='Sub District Name' />
                        </div>  

                        <button disabled={loader ? true : false} className='bg-indigo-600 w-[200px] hover:shadow-indigo-600/50 hover:shadow-lg hover:bg-indigo-700 text-white rounded-lg px-7 py-2 mb-3 transition-all'>
                        { 
                        loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Save Changes'
                        } 
                        </button>

                        </form> : <div className='flex justify-between text-sm flex-col gap-3 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md border border-slate-200 relative'>
                            <span className='p-[6px] bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'><TbEdit size={16} /> </span>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Shop Name :</span>
                                <span className='font-medium text-slate-800'>{ userInfo.shopInfo?.shopName }</span> 
                            </div>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Shop Address :</span>
                                <span className='font-medium text-slate-800'>{ userInfo.shopInfo?.division }</span> 
                            </div>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>District Name :</span>
                                <span className='font-medium text-slate-800'>{ userInfo.shopInfo?.district }</span> 
                            </div>
                            <div className='flex gap-2'>
                                <span className='font-semibold text-slate-600'>Sub District Name :</span>
                                <span className='font-medium text-slate-800'>{ userInfo.shopInfo?.sub_district }</span> 
                            </div>
                        </div>
                    }
                    </div>

                    </div>
                </div>

                <div className='w-full md:w-6/12'>
                    {/* right side content */}
                    <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
                        <div className='bg-white rounded-2xl shadow-xl border border-slate-200/50 text-slate-700 p-4'>
                            <h1 className='text-slate-800 text-lg mb-3 font-semibold'>Change Password</h1>
                            <form>
                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="email">Email</label>
                            <input className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="email" name='email' id='email' placeholder='Email' />
                        </div>  

                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="o_password">Old Password</label>
                            <input className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="password" name='old_password' id='o_password' placeholder='Old Password' />
                        </div>  
 
                        <div className='flex flex-col w-full gap-1 mb-2'>
                            <label htmlFor="n_password">New Password</label>
                            <input className='px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-slate-300 rounded-lg text-slate-700' type="password" name='new_password' id='n_password' placeholder='New Password' />
                        </div>   
                        <button className='bg-indigo-600 hover:shadow-indigo-600/40 hover:shadow-md hover:bg-indigo-700 text-white rounded-lg px-7 py-2 my-2 transition-all'>Change Password </button>
                        </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;