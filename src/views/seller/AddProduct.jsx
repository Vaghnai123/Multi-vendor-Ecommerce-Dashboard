/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { get_category } from '../../store/Reducers/categoryReducer';
import { add_product,messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AddProduct = () => {
    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.category)
    const { loader,successMessage,errorMessage } = useSelector(state => state.product)

     useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            setState({
                name: "",
                description: '',
                discount: '',
                price: "",
                brand: "",
                stock: ""
            }) 
            setImageShow([])
            setImages([])
            setCategory('')

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        

    },[successMessage,errorMessage])

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: '',
            page: ""
        }))
    }, [])
     

    const [state, setState] = useState({
        name: "",
        description: '',
        discount: '',
        price: "",
        brand: "",
        stock: ""
    
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const [cateShow, setCateShow] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('') 

        const categorySearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srcValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllCategory(srcValue)
        } else {
            setAllCategory(categorys)
        }

    }

    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])

    const imageHandle = (e) => {
        const files = e.target.files 
        const length = files.length;
        if (length > 0) {
            setImages([...images, ...files])
            let imageUrl = []
            for (let i = 0; i < length; i++) {
                imageUrl.push({url: URL.createObjectURL(files[i])}) 
            }
            setImageShow([...imageShow, ...imageUrl])
        }
    }

    const changeImage = (img, index) => {
        if (img) {
            let tempUrl = imageShow
            let tempImages = images

            tempImages[index] = img
            tempUrl[index] = {url : URL.createObjectURL(img)}
            setImageShow([...tempUrl])
            setImages([...tempImages])

        }
    }

    const removeImage = (i) => {
        const filterImage = images.filter((img,index) => index !== i)
        const filterImageUrl = imageShow.filter((img, index) => index !== i )

        setImages(filterImage)
        setImageShow(filterImageUrl)
    }

     const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',state.name)
        formData.append('description',state.description)
        formData.append('price',state.price)
        formData.append('stock',state.stock)
        formData.append('discount',state.discount)
        formData.append('brand',state.brand)
        formData.append('shopName','EasyShop') 
        formData.append('category',category)

        for (let i = 0; i < images.length; i++) {
            formData.append('images',images[i]) 
        }
        // console.log(state)
        dispatch(add_product(formData))

    }

    useEffect(() => {
        setAllCategory(categorys)
    },[categorys])

    return (
        <div className='px-2 lg:px-7 pb-20 min-h-screen bg-gradient-to-br bg-[#cdcae9]'>
            
            <div className='w-full p-6 lg:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50'>

                <div className='justify-between flex items-center pb-6 mb-6 border-b border-slate-200'>
                    <h3 className='text-slate-700 text-xl font-semibold'>Product Information</h3>
                    <Link to='/seller/dashboard/products' className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg px-6 py-2.5 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95'>All Product</Link>
                </div>


                <form  onSubmit={add}>
                    <div className='flex flex-col mb-5 md:flex-row gap-5 w-full'>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="name" className='font-semibold text-sm text-slate-700'>Product Name</label>
                            <input className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300' onChange={inputHandle} value={state.name} type="text" name='name' id='name' placeholder='Enter product name' />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="brand" className='font-semibold text-sm text-slate-700'>Product Brand</label>
                            <input className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300' onChange={inputHandle} value={state.brand} type="text" name='brand' id='brand' placeholder='Enter brand name' />
                        </div>
                    </div>

                    <div className='flex flex-col mb-5 md:flex-row gap-5 w-full'>
                        <div className='flex flex-col w-full gap-2 relative'>
                            <label htmlFor="category" className='font-semibold text-sm text-slate-700'>Category</label>
                                <input readOnly onClick={()=> setCateShow(!cateShow)} className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 cursor-pointer transition-all duration-300' onChange={inputHandle} value={category} type="text" id='category' placeholder='--select category--' />

                            <div className={`absolute top-[110%] bg-white w-full transition-all duration-300 rounded-xl shadow-2xl border border-slate-300 overflow-hidden z-50 ${cateShow ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none' } `}>
                                    <div className='w-full px-4 py-3 bg-slate-50 border-b border-slate-200'>
                                        <input value={searchValue} onChange={categorySearch} className='px-4 py-2.5 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300' type="text" placeholder='Search category...' /> 
                                    </div>
                                <div className='flex justify-start items-start flex-col max-h-[200px] overflow-y-auto'>
                                 {
                                    allCategory.map((c,i) => <span key={i} className={`px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 w-full cursor-pointer transition-all duration-200 text-slate-700 ${category === c.name && 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold'}`} onClick={()=> {
                                    setCateShow(false)
                                    setCategory(c.name)
                                    setSearchValue('')
                                    setAllCategory(categorys)
                                     }}>{c.name} </span> )
                                } 
                                </div>
                            </div>
                        </div>  

                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="stock" className='font-semibold text-sm text-slate-700'>Product Stock</label>
                            <input className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300' onChange={inputHandle} value={state.stock} type="text" name='stock' id='stock' placeholder='Enter stock quantity' />
                        </div>
                    </div>

                    <div className='flex flex-col mb-5 md:flex-row gap-5 w-full'>
                            <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="price" className='font-semibold text-sm text-slate-700'>Price</label>
                            <input className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300' onChange={inputHandle} value={state.price} type="number" name='price' id='price' placeholder='Enter price' />
                            </div>  

                        <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="discount" className='font-semibold text-sm text-slate-700'>Discount</label>
                        <input className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300' onChange={inputHandle} value={state.discount} type="number" name='discount' id='discount' placeholder='Discount by %' />
                        </div>   
                    </div>

                    <div className='flex flex-col w-full gap-2 mb-6'>
                    <label htmlFor="description" className='font-semibold text-sm text-slate-700'>Description</label>
                    <textarea className='px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 transition-all duration-300 resize-none' onChange={inputHandle} value={state.description} name='description' id='description' placeholder='Enter product description' cols="10" rows="4"></textarea> 
                    </div> 

                    <div className='mb-6'>
                        <label className='font-semibold text-sm text-slate-700 mb-3 block'>Product Images</label>
                          <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
               {
                imageShow.map((img,i) => <div className='h-[180px] relative'>
                    <label htmlFor={i}>
                        <img className='w-full h-full rounded-sm' src={img.url} alt="" />
                    </label>
                    <input onChange={(e)=> changeImage(e.target.files[0],i) } type="file" id={i} className='hidden'/>
                    <span onClick={()=>removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'><IoMdCloseCircle /></span>
                </div> )
               }
               
                            <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 w-full text-slate-600 hover:text-indigo-600 rounded-lg transition-all duration-300 group' htmlFor="image">
                            <span className='text-4xl mb-2 group-hover:scale-110 transition-transform duration-300'><IoMdImages /></span>
                            <span className='font-semibold text-sm'>Select Image</span>
                           </label>
                           <input className='hidden' onChange={imageHandle} multiple type="file" id='image' />

                            </div>
                    </div>

                    <div className='flex pt-3'>
                    <button disabled={loader ? true : false} className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 w-full md:w-[280px] shadow-lg hover:shadow-xl text-white font-semibold rounded-lg px-7 py-3.5 mb-3 transition-all duration-300 hover:scale-105 active:scale-95'>
                    { 
                        loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Product'
                    } 
                    </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddProduct;