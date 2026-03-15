import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// Add Coupon
export const add_coupon = createAsyncThunk(
    'coupon/add_coupon',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/coupon/add', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Get Coupons
export const get_coupons = createAsyncThunk(
    'coupon/get_coupons',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/coupon/get-coupons')
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Delete Coupon
export const delete_coupon = createAsyncThunk(
    'coupon/delete_coupon',
    async (couponId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/coupon/delete/${couponId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
                                                    // Order Reducer :-
export const get_admin_orders = createAsyncThunk(
    'orders/get_admin_orders',
    async({ parPage,page,searchValue },{rejectWithValue, fulfillWithValue}) => {
        
        try {
             
            const {data} = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,{withCredentials: true})  
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
)
  // End Method  

  export const get_admin_order = createAsyncThunk(
    'orders/get_admin_order',
    async( orderId ,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.get(`/admin/order/${orderId}`,{withCredentials: true})  
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
) 
  // End Method  

  export const admin_order_status_update = createAsyncThunk(
    'orders/admin_order_status_update',
    async( {orderId,info} ,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.put(`/admin/order-status/update/${orderId}`,info,{withCredentials: true})  
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
) 
  // End Method  

   export const get_seller_orders = createAsyncThunk(
    'orders/get_seller_orders',
    async({ parPage,page,searchValue,sellerId },{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.get(`/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,{withCredentials: true})  
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
) 
  // End Method 

  export const get_seller_order = createAsyncThunk(
    'orders/get_seller_order',
    async( orderId ,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.get(`/seller/order/${orderId}`,{withCredentials: true})  
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
) 
  // End Method  

  export const seller_order_status_update = createAsyncThunk(
    'orders/seller_order_status_update',
    async( {orderId,info} ,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.put(`/seller/order-status/update/${orderId}`,info,{withCredentials: true})  
            return fulfillWithValue(data)
        } catch (error) { 
            return rejectWithValue(error.response.data)
        }
    }
) 
  // End Method 


export const couponReducer = createSlice({
    name: 'coupon',
    initialState: {
        loader: false,
        successMessage: '',
        errorMessage: '',
        coupons: [],
        totalOrder: 0,
        order : {}, 
        myOrders: []
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_coupon.pending, (state) => { state.loader = true })
            .addCase(add_coupon.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.coupons = [payload.coupon, ...state.coupons];
            })
            .addCase(add_coupon.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(get_coupons.fulfilled, (state, { payload }) => {
                state.coupons = payload.coupons;
            })
            .addCase(delete_coupon.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.coupons = state.coupons.filter(c => c._id !== payload.couponId);
            })


            .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
                        state.myOrders = payload.orders;
                        state.totalOrder = payload.totalOrder; 
            })
             .addCase(get_admin_order.fulfilled, (state, { payload }) => {
            state.order = payload.order; 
            })
            .addCase(admin_order_status_update.rejected, (state, { payload }) => {
            state.errorMessage = payload.message; 
            })
            .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message; 
            })


             .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
            state.myOrders = payload.orders;
            state.totalOrder = payload.totalOrder; 
            })
            .addCase(get_seller_order.fulfilled, (state, { payload }) => {
            state.order = payload.order; 
            })
            .addCase(seller_order_status_update.rejected, (state, { payload }) => {
            state.errorMessage = payload.message; 
            })
            .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message; 
            })
    }
})

export const { messageClear } = couponReducer.actions
export default couponReducer.reducer