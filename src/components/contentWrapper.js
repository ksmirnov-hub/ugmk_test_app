import React from 'react';
import { connect } from "react-redux";
import ReactLoading from 'react-loading';

function ContentWrapper({
	children,
	isLoading
}) {
  return (
	<>
		{isLoading ? (
			<div  className='flex flex-row justify-around w-full mt-[20%]'>
				<ReactLoading type='bars' color="#413839" className="!w-[200px]"/>
			</div>
		) : (

				<div className="w-full h-full px-[100px] py-[50px]">
					{children}
				</div>
		)}
	</>
  );
}

const mapStateToProps = state => {
	return {
		isLoading: state.data.isLoading
	};
}

const mapDispatchToProps = dispatch => {}


export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);