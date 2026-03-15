import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";
import couponReducer from './Reducers/couponReducer';
import chatReducer from "./Reducers/chatReducer";
import blogReducer from './Reducers/blogReducer';
import PaymentReducer from "./Reducers/PaymentReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import bannerReducer from "./Reducers/bannerReducer";
const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  coupon: couponReducer,
  chat: chatReducer,
  blog: blogReducer,
  payment: PaymentReducer,
  dashboard: dashboardReducer,
  banner: bannerReducer
};
export default rootReducer;
