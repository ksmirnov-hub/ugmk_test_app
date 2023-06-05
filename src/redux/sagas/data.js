import { put, call, takeEvery } from 'redux-saga/effects'
import moment from 'moment';
import sortBy from 'lodash/sortBy';
import * as actions from '../actions/data';
import * as api from '../../utils/axios';

function* getProductsData({ payload }) {
	try {

		const data = yield call(api.getData)

		const reduced = data.reduce((acc, item, index) => {
			if (item.date === null) {
				return acc;
			}
			const month = moment(item.date, "DD-MM-YYYY").format('MM');
			const monthData = acc.findIndex(el => el.month === month);
			const total = (item.product1 || 0) + (item.product2 || 0) + (item.product3 || 0);

			if (monthData !== -1) {
				let f1 = acc[monthData].f1;
				let f2 = acc[monthData].f2;

				let newf1 = {}
				let newf2 = {}
				if (item.factory_id === 1) {
                    newf1 = {
						product1: f1.product1 + item.product1 || 0,
						product2: f1.product2 + item.product2 || 0,
						total: f1.total + total
					}
					newf2 = f2;
				} 
				if (item.factory_id === 2) {
                    newf2 = {
						product1: f2.product1 + item.product1 || 0,
						product2: f2.product2 + item.product2 || 0,
						total: f2.total + total
					}
					newf1 = f1
				}
				acc[monthData] = {
					month,
					f1: newf1,
					f2: newf2
				}
			} else {
				let pf1, pf2;
				let empty = {
					product1: 0,
					product2: 0,
					total: 0
				};
	
				const productData = {
						product1: item.product1 || 0,
						product2: item.product2 || 0,
						total
				};
				if (item.factory_id === 1) {
					pf1 = productData
					pf2 = empty;
				} 
				if (item.factory_id === 2) {
					pf2 = productData
					pf1 = empty;
				}
				const initial = {
					month,
					f1: pf1,
					f2: pf2,
				}
	
				acc.push(initial)
			}

			return acc;
		}, [])

		if (data.length) {
			yield put(actions.getProductsDataSuccess(sortBy(reduced, [(o) => o.month])));
		} else {
			yield put(actions.getProductsDataFailure())
		}
	} catch (error) {
		yield put(actions.getProductsDataFailure(error))
		console.error(error);
	}
}

export default function* root() {
  yield takeEvery(actions.getProductsDataRequest, getProductsData);
}