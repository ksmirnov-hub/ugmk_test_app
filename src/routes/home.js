import React, {useState, useCallback} from 'react';
import { connect } from "react-redux";
import { Select } from 'antd';

import ContentWrapper from "../components/contentWrapper";
import ChartBlock from "../components/ChartBlock";
import { changeProduct as changeProductAction} from "../redux/actions/data";

function Home({
	products = [],
	changeProduct,
	currentProduct
}) {
	const handleChange = useCallback((value) => {
		localStorage.removeItem('type');
		changeProduct(value)
	}, [changeProduct])

	return (
		<ContentWrapper>
			<div className="w-[800px] h-full mx-[30%]">
				<div className="flex flex-col gap-[20px] h-auto font-normal border-solid border-black text-[14px]">
					<div className='h-[100px] w-[800px] rounded-lg border-1 border-[black] border-2 text-right'>
						<div className='flex flex-row justify-end gap-[20px] p-[20px]'>
							<div>Фильтр по типу продукции: </div>
							<Select
								defaultValue={currentProduct}
								style={{ width: 320 }}
								onChange={handleChange}
								options={[
									{ value: 'total', label: 'Все' },
									{ value: 'product1', label: 'Продукт 1' },
									{ value: 'product2', label: 'Продукт 2' },
								]}
								/>
						</div>
					</div>
					<div className='h-[300px] w-[800px] rounded-lg border-1 border-[black] border-2'>
						<ChartBlock products={products}/>
					</div>
				</div>
			</div>
		</ContentWrapper>
	);
}

const mapStateToProps = state => {
	return {
		products: state.data.products,
		currentProduct: state.data.currentProduct
	};
}

const mapDispatchToProps = dispatch => {
	return {
		changeProduct: data => dispatch(changeProductAction(data)),
	};
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);