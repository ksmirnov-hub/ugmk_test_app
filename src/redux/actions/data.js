import { createAction } from 'redux-actions'

export const GET_PRODUCTS_DATA_SUCCESS = 'GET_PRODUCTS_DATA_SUCCESS'
export const GET_PRODUCTS_DATA_REQUEST = 'GET_PRODUCTS_DATA_REQUEST'
export const GET_PRODUCTS_DATA_FAILURE = 'GET_PRODUCTS_DATA_FAILURE'

export const CHANGE_PRODUCT = 'CHANGE_PRODUCT'


export const getProductsDataSuccess = createAction(GET_PRODUCTS_DATA_SUCCESS)
export const getProductsDataRequest = createAction(GET_PRODUCTS_DATA_REQUEST)
export const getProductsDataFailure = createAction(GET_PRODUCTS_DATA_FAILURE)

export const changeProduct = createAction(CHANGE_PRODUCT)