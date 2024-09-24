import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { IProductState, ICheckoutCartItem } from 'src/types/product';

// ----------------------------------------------------------------------

const initialState: IProductState = {
  products: [],
  product: null,
  checkout: {
    activeStep: 0,
    cart: [],
    subTotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    totalItems: 0,
  },
  productsStatus: {
    loading: false,
    empty: false,
    error: null,
  },
  productStatus: {
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // GET PRODUCTS
    getProductsStart(state) {
      state.productsStatus.loading = true;
      state.productsStatus.empty = false;
      state.productsStatus.error = null;
    },
    getProductsFailure(state, action) {
      state.productsStatus.loading = false;
      state.productsStatus.empty = false;
      state.productsStatus.error = action.payload;
    },
    getProductsSuccess(state, action) {
      const products = action.payload;

      state.products = products;

      state.productsStatus.loading = false;
      state.productsStatus.empty = !products.length;
      state.productsStatus.error = null;
    },

    // GET PRODUCT
    getProductStart(state) {
      state.productStatus.loading = true;
      state.productStatus.error = null;
    },
    getProductFailure(state, action) {
      state.productStatus.loading = false;
      state.productStatus.error = action.payload;
    },
    getProductSuccess(state, action) {
      const product = action.payload;

      state.product = product;

      state.productStatus.loading = false;
      state.productStatus.error = null;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart: ICheckoutCartItem[] = action.payload;

      const totalItems = sum(cart.map((product) => product.quantity));

      const subTotal = sum(cart.map((product) => product.price * product.quantity));

      state.checkout.cart = cart;
      state.checkout.discount = state.checkout.discount || 0;
      state.checkout.shipping = state.checkout.shipping || 0;
      state.checkout.billing = state.checkout.billing || null;
      state.checkout.subTotal = subTotal;
      state.checkout.total = subTotal - state.checkout.discount;
      state.checkout.totalItems = totalItems;
    },

    addToCart(state, action) {
      const newProduct = action.payload;

      const cartEmpty = !state.checkout.cart.length;

      if (cartEmpty) {
        state.checkout.cart = [...state.checkout.cart, newProduct];
      } else {
        state.checkout.cart = state.checkout.cart.map((product) => {
          const existProduct = product.id === newProduct.id;

          if (existProduct) {
            return {
              ...product,
              colors: uniq([...product.colors, ...newProduct.colors]),
              quantity: product.quantity + 1,
            };
          }

          return product;
        });
      }

      state.checkout.cart = uniqBy([...state.checkout.cart, newProduct], 'id');
      state.checkout.totalItems = sum(state.checkout.cart.map((product) => product.quantity));
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((product) => product.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.cart = [];
      state.checkout.billing = null;
      state.checkout.activeStep = 0;
      state.checkout.total = 0;
      state.checkout.subTotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.totalItems = 0;
    },

    backStep(state) {
      state.checkout.activeStep -= 1;
    },

    nextStep(state) {
      state.checkout.activeStep += 1;
    },

    gotoStep(state, action) {
      state.checkout.activeStep = action.payload;
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
      state.checkout.total = state.checkout.subTotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;

      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subTotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.getProductsStart());
    try {
      const response = await axios.get(API_ENDPOINTS.product.list);
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.getProductsFailure(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(productId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.getProductStart());
    try {
      const response = await axios.get(API_ENDPOINTS.product.details, {
        params: {
          productId,
        },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.getProductFailure(error));
    }
  };
}
