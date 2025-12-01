/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get_category } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdImages } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { get_product,update_product,messageClear,product_image_update} from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from "../../utils/utils";
import toast from 'react-hot-toast';

const EditProduct = () => {

    const { productId } = useParams()
    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.category)
    const { product,loader,successMessage,errorMessage } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(messageClear());   // Clears old toasts
    }, []);


    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: '',
            page: ""
        }))
    }, [])

    useEffect(() => {
        dispatch(get_product(productId))
    }, [productId])


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

   
    const [imageShow, setImageShow] = useState([])

   const changeImage = (img, files) => {
        if (files.length > 0) {
           dispatch(product_image_update({
                oldImage: img,
                newImage: files[0],
                productId
           }))     
        }
       
    }

    useEffect(() => {
        setState({
            name: product.name,
            description: product.description,
            discount: product.discount,
            price: product.price,
            brand: product.brand,
            stock: product.stock
        })
        setCategory(product.category)
        setImageShow( product.images)
    },[product])


    useEffect(() => {
        if (categorys.length > 0) {
            setAllCategory(categorys)
        }
    },[categorys])


     useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        } 
    },[successMessage,errorMessage])


    const update = (e) => {
        e.preventDefault()
        const obj = {
                name: state.name,
                description: state.description,
                discount: state.discount,
                price: state.price,
                brand: state.brand,
                stock: state.stock,
                category:category,
                productId: productId
        }
        dispatch(update_product(obj))

    }

    return (
               <div className='px-2 lg:px-7 pt-3 pb-20 min-h-screen bg-gradient-to-br bg-[#cdcae9]'>
            
            <div className='w-full p-6 lg:p-8 bg-white rounded-2xl shadow-xl border border-slate-200/50'>

                <div className='justify-between flex items-center pb-6 mb-6 border-b border-slate-200'>
                    <h3 className='text-slate-700 text-xl font-semibold'>Edit Product</h3>
                    <Link to='/seller/dashboard/products' className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg px-6 py-2.5 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95'>All Product</Link>
                </div>


                <form onSubmit={update}>
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
                                    allCategory.length > 0 && allCategory.map((c,i) => <span key={i} className={`px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 w-full cursor-pointer transition-all duration-200 text-slate-700 ${category === c.name && 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold'}`} onClick={()=> {
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

                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-5'>
                {
                   (imageShow && imageShow.length > 0) && imageShow.map((img, i) => <div>
                        <label htmlFor={i}>
                            <img src={img} alt="" />
                        </label>
                        <input onChange={(e) => changeImage(img, e.target.files)} type="file" id={i} className='hidden' />
                    </div> )
                }
                        </div>

                    <div className='flex pt-3'>
                    
                    <button disabled={loader ? true : false} className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 w-full md:w-[280px] shadow-lg hover:shadow-xl text-white font-semibold rounded-lg px-7 py-3.5 mb-3 transition-all duration-300 hover:scale-105 active:scale-95'>
                    { 
                        loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Save Changes'
                    } 
                    </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default EditProduct;

