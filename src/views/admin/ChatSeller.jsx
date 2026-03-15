/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useRef, useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_message, get_sellers, send_message_seller_admin,messageClear,updateSellerMessage } from '../../store/Reducers/chatReducer'
import { Link, useParams } from 'react-router-dom';
import { AiOutlineMessage } from 'react-icons/ai'
import toast from 'react-hot-toast';
import {socket} from '../../utils/utils'
const ChatSeller = () => {

    const scrollRef = useRef()
    const [show, setShow] = useState(false);
    const {sellers,activeSeller,currentSeller,seller_admin_message,successMessage} = useSelector(state => state.chat)

    const { sellerId } = useParams()
    const [text,setText] = useState('')
    const [receverMessage,setReceverMessage] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_sellers())
    }, [])

    const send = (e) => {
        e.preventDefault() 
            dispatch(send_message_seller_admin({
                senderId: '', 
                receverId: sellerId,
                message: text,
                senderName: 'Admin Support'
            }))
            setText('') 
    }

    useEffect(() => {
        if (sellerId) {
            dispatch(get_admin_message(sellerId))
        }
    },[sellerId])

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_message_admin_to_seller',seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }
    },[successMessage])

    useEffect(() => {
        socket.on('receved_seller_message', msg => {
             setReceverMessage(msg)
        })
         
    },[])


     useEffect(() => {
        if (receverMessage) {
            if (receverMessage.senderId === sellerId && receverMessage.
                receverId === '') {
                dispatch(updateSellerMessage(receverMessage))
            } else {
                toast.success(receverMessage.senderName + " " + "Send A message")
                dispatch(messageClear())
            }
        }

    },[receverMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    },[seller_admin_message])

   return (
    <div className='px-2 lg:px-7 pb-20'>
        <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-130px)]'>
        <div className='flex w-full h-full relative'>
    
     <div className={`w-[282px] h-full absolute z-10 ${show ? '-left-[16px]' : '-left-[336px]'} md:left-0 md:relative transition-all `}>
            <div className='w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto'>
                <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white'>
                    <h2 className='font-bold text-white text-lg'>Sellers</h2>
                <span onClick={() => setShow(!show)} className='block cursor-pointer md:hidden text-white hover:text-gray-200 transition-colors'><IoMdClose size={24} /> </span>
                </div>
{
        sellers.map((s,i) => <Link key={i} to={`/admin/dashboard/chat-sellers/${s._id}`} className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer bg-[#8288ed] mb-3 `}>
                <div className='relative'>
                    <img className='w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full' src={s.image} alt="" />
                    {
                        activeSeller.some(a => a.sellerId === s._id) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                    }
                </div>
    
                <div className='flex justify-center items-start flex-col w-full'>
                    <div className='flex justify-between items-center w-full'>
                         <h2 className='text-base font-semibold'>{s.name}</h2>
                    </div> 
                </div> 
        </Link> 
        )
}                     

        </div> 
    </div>

    <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
        
        <div className='flex justify-between items-center'>
            {
             currentSeller && <div className='flex justify-start items-center gap-3'>
                <div className='relative'>
                    <img className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full' src={currentSeller.image} alt="" />
                    { activeSeller.some(a => a.sellerId === currentSeller._id) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                    }
                </div>
                        <h2 className='text-base text-white font-semibold'>{currentSeller.name}</h2>
            </div> 
            }
            <div onClick={()=> setShow(!show)} className='w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white'>
                <span><FaList/> </span>
            </div> 
        </div>

        <div className='py-4'>
            <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>

            {
                sellerId ?  seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
                        return(
                            <div ref={scrollRef} key={i} className='w-full flex justify-start items-center'>
                        <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                            <div>
                                <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' src={currentSeller.image} alt="" />
                            </div>
                            <div className='bg-white text-slate-800 p-3 rounded-2xl rounded-bl-md max-w-md shadow-md border border-slate-300'>
                                    <span className='text-sm'> {m.message} </span>
                            </div>
                        </div> 
                    </div>
                        )
                    } else{
                        return(
                        <div key={i} ref={scrollRef} className='w-full flex justify-end items-center'>
                        <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-2xl rounded-br-md max-w-md shadow-lg'>
                                    <span className='text-sm'>{m.message} </span>
                            </div>
                            <div>
                                <img className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' src="/public/image/admin.png" alt="" />
                            </div>
                        </div> 
                        </div>
                        )
                    }
                    }): (
                        <div className='w-full h-full flex flex-col justify-center items-center gap-4 bg-slate-50'>
                                <div className='w-20 h-20 bg-indigo-100 rounded-full flex justify-center items-center text-indigo-500 text-3xl'>
                                    <AiOutlineMessage />
                                </div>
                                <span className='text-xl font-bold text-slate-700'>Select a Seller</span>
                        </div>
                    )
            }  
            </div> 
        </div>

        <form onSubmit={send} className='flex gap-3'>
            <input 
                    className='w-full bg-slate-800 border-1 border-slate-700 text-white focus:border-indigo-500 focus:ring-0 outline-none shadow-md rounded-full py-3 pl-4 pr-12'
                    readOnly={sellerId ? false : true}
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    type="text" 
                    placeholder='Type your message...' 
                    id="message"
                    name="message"/>
            
            <button disabled={sellerId ? false : true} type="submit" className='bg-indigo-500 hover:bg-indigo-600 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex-shrink-0'> 
                <IoSend size={22} />
            </button>
        </form>

    </div>  
        </div> 
        </div>
        
    </div>
    );
};

export default ChatSeller;      