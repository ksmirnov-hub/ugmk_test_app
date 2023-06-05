import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { connect } from "react-redux";

import { Home, Details } from "./routes";
import { MainLayout } from "./components/MainLayout";
import { getProductsDataRequest } from "./redux/actions/data";
import './App.css';

function App({
	isAuth = true,
	logoutAction,
	getProducts
}) {
	let location = useLocation();
	let state = location.state;

	useEffect(() => {
		getProducts();
	}, [getProducts])

	return (
		<div className='app h-full'>
			<Routes location={state?.backgroundLocation || location}>
				<Route path="/" element={<MainLayout logoutAction={logoutAction} isAuth={true} />}>
					<Route index element={<Home />} />
					<Route
						path="details/:factory/:month"
						element={<Details />}
					/>
				</Route>
			</Routes>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		isLoading: state.data.isLoading
	};
}

const mapDispatchToProps = dispatch => {
	return {
		getProducts: data => dispatch(getProductsDataRequest(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
