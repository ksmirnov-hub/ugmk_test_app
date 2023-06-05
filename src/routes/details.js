import React, {useState, useCallback, useEffect} from 'react';
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';

import ContentWrapper from "../components/contentWrapper";
import PieChartBlock from "../components/PieChartBlock";
import {monthes} from "../utils/constants";

function Details({
    products = []
}) {
    const [currentData, setCurrentData] = useState([])
    let location = useLocation();
    let parsed = location.pathname.split('/');
    let factory = parsed[2] || 0;
    let month = parsed[3] || 0;
    let monthName = monthes[Number(month) - 1]

    useEffect(() => {
        if (products.length) {
            const selectedMonth = products.filter(p => Number(p.month) === Number(month));
            const {product1, product2} = selectedMonth[0][`f${factory}`];
    
            setCurrentData([
                { name: 'Продукт 1', value: Math.floor(product1 / 1000)},
                { name: 'Продукт 2', value: Math.floor(product2 / 1000)},
              ])
        }
    }, [products, factory, month]);

	return (
		<ContentWrapper>
            <div className='h-[300px]'>
                <div className='text-center'>
                    {`Статистика по продукции Фабрики ${factory === 1 ? 'А' : 'Б'} за ${monthName}`}
                </div>
                <PieChartBlock currentData={currentData} />
            </div>
		</ContentWrapper>
	);
}

const mapStateToProps = state => {
	return {
		products: state.data.products,
	};
}

export default connect(mapStateToProps, {})(Details);