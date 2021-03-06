import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
  sortBy: null,
  search:[],
  heart:[],
  usedHeart:[],
  
  // 컨텐트 안에 아바타 닉네임 내용 타입 읽었는지 - 지금은 내용만
  alertNumber: 0,
  alert:[],
  readAlert:[],

  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    getAlert(state){
      state.alertNumber = state.alert.length;
    },
    
    addAlert(state, action) {
      const alert = action.payload;
      if(state.alert.length >= 10){
        state.alert.pop();
        state.alert = uniqBy([alert, ...state.alert]);
      } else {
        state.alert = uniqBy([alert, ...state.alert]);
      }
    },

    readAlert(state, action) {
      const readAlert = state.alert.filter((item) => item !== action.payload);
      state.alert = readAlert;
      state.alertNumber = readAlert.length;
      if(state.readAlert >= 10){
        state.readAlert.pop();
        state.readAlert = uniqBy([action.payload, ...state.readAlert]);
      } else {
        state.readAlert = uniqBy([action.payload, ...state.readAlert]);
      }
    },

    deleteAllAlert(state) {
      state.alert = [];
      state.readAlert = [];
      state.alertNumber = 0 ;
    },

    addHeartUsed(state, action) {
      const product = action.payload;
      if(state.usedHeart.length >= 10){
        state.usedHeart.pop();
        state.usedHeart = uniqBy([product, ...state.usedHeart]);
      } else {
        state.usedHeart = uniqBy([product, ...state.usedHeart]);
      }
    },

    deleteHeartUsed(state, action) {
      const updateProduct = state.usedHeart.filter((item) => item.id !== action.payload);
      state.usedHeart = updateProduct;
    },
    
    deleteAllHeartUsed(state) {
      state.usedHeart = [];
    },


    addHeart(state, action) {
      const product = action.payload;
      if(state.heart.length >= 10){
        state.heart.pop();
        state.heart = uniqBy([product, ...state.search]);
      } else {
        state.heart = uniqBy([product, ...state.search]);
      }
      console.log(state.heart)
    },

    deleteHeart(state, action) {
      const updateProduct = state.heart.filter((item) => item.id !== action.payload);
      state.heart = updateProduct;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((cartItem) => cartItem.price * cartItem.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = state.checkout.cart.map((_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    addSearch(state, action) {
      const newsearch = action.payload;
      if(state.search.length >= 10){
        state.search.pop();
        state.search = uniqBy([newsearch, ...state.search]);
      } else {
        state.search = uniqBy([newsearch, ...state.search]);
      }
    },

    deleteSearch(state, action) {
      const updateSearch = state.search.filter((item) => item !== action.payload);
      state.search = updateSearch;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getAlert,
  addAlert,
  readAlert,
  deleteAllAlert,
  addHeart,
  deleteHeart,
  addHeartUsed,
  deleteHeartUsed,
  deleteAllHeartUsed,
  addSearch,
  deleteSearch,
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products');
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products/product', {
        params: { name },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
