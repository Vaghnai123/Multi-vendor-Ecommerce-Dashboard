import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = 'http://localhost:5000'; 

export const add_blog = createAsyncThunk(
    'blog/add_blog',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/blog-add`, info, {
                withCredentials: true
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_blogs = createAsyncThunk(
    'blog/get_blogs',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/blog-get`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_blog = createAsyncThunk(
    'blog/delete_blog',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.delete(`${base_url}/api/blog-delete/${id}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_blog_by_id = createAsyncThunk(
    'blog/get_blog_by_id',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/blog-get-id/${id}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const update_blog = createAsyncThunk(
    'blog/update_blog',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.put(`${base_url}/api/blog-update/${info.blogId}`, info.formData, {
                withCredentials: true
            });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const blogReducer = createSlice({
    name: 'blog',
    initialState: {
        blogs: [],
        blog: {},
        loader: false,
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Blog
            .addCase(add_blog.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_blog.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(add_blog.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            // Get Blogs
            .addCase(get_blogs.fulfilled, (state, { payload }) => {
                state.blogs = payload.blogs;
            })
            // Delete Blog
            .addCase(delete_blog.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })

            // Get Blog By ID cases
            .addCase(get_blog_by_id.fulfilled, (state, { payload }) => {
                state.blog = payload.blog; 
            })

            // Update Blog cases
            .addCase(update_blog.pending, (state) => {
                state.loader = true;
            })
            .addCase(update_blog.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(update_blog.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            });
    }
});

export const { messageClear } = blogReducer.actions;
export default blogReducer.reducer;