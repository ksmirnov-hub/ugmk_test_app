import React from 'react';
import { connect } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

function PieChartBlock({
	currentData
}) {
    const COLORS = ['#006400', '#FFA500'];

    const renderCustomizedLabel = ({ x, y, value, index }) => {
        console.log('index', index)
        return (
          <text x={x - 30} y={y + 10} fill={COLORS[index % COLORS.length]} dominantBaseline="central">
            {`${(value).toFixed(0)}`}
          </text>
        );
      };

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={currentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {currentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}

const mapStateToProps = state => {
	return {
		isLoading: state.data.isLoading,
	};
}

const mapDispatchToProps = dispatch => {}


export default connect(mapStateToProps, mapDispatchToProps)(PieChartBlock);