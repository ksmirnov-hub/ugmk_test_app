import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import {monthes} from "../utils/constants";

function ChartBlock({
	products,
    currentProduct,
	isLoading
}) {
    const [productsList, setProductsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const normalised = products.map((item) => {
            return {
                monthNumber: Number(item.month),
                month: monthes[Number(item.month) - 1],
                f1: Math.floor(item.f1[currentProduct] / 1000),
                f2: Math.floor(item.f2[currentProduct] / 1000)
            }
        })
        setProductsList(normalised)
    }, [products, currentProduct])

    const handleClick = (event) => {
        console.log('event', event)
        const {dataKey, payload: {monthNumber}} = event.tooltipPayload[0];
        const factoryId = dataKey === 'f2' ? 2 : 1;
        navigate(`/details/${factoryId}/${monthNumber}`)
    } 
	console.log('productsList', productsList)
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={productsList}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Legend formatter={(value) => value === 'f1' ? "Фабрика А" : "Фабрика Б"}/>
                    <Bar dataKey="f1"  cursor="pointer" fill="#FF0000" onClick={handleClick} />
                    <Bar dataKey="f2"  cursor="pointer" fill="#0000CD" onClick={handleClick} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

const mapStateToProps = state => {
	return {
		isLoading: state.data.isLoading,
        currentProduct: state.data.currentProduct
	};
}

const mapDispatchToProps = dispatch => {}


export default connect(mapStateToProps, mapDispatchToProps)(ChartBlock);