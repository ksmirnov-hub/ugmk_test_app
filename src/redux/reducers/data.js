const productType = localStorage.getItem('type');

const initialState = {
  url: '',
  loading: false,
  error: false,
  currentProduct: productType || 'total',
  data: []
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case 'GET_PRODUCTS_DATA_REQUEST':
			return {
				...state,
				isLoading: true
			}
		case 'GET_PRODUCTS_DATA_SUCCESS':
			return {
			  ...state,
			  products: payload,
			  isLoading: false
			}
		case 'GET_PRODUCTS_DATA_FAILURE':
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case 'CHANGE_PRODUCT':
			localStorage.setItem('type', payload);
			return {
				...state,
				isLoading: false,
				currentProduct: payload
			}
		default:
			return state
	}
}

export default reducer;