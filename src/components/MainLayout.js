import React from 'react';
import { NavLink, Outlet, useNavigate} from "react-router-dom";

export const MainLayout = () => {
	const inactiveStyle = {
		textDecoration: "underline",
	};

	const checkActive = ({ isActive }) => {
		return isActive ? undefined : inactiveStyle;
	}

	return (
		<>
		<div className="flex flex-row bg-[#413839] ">
			<div
				className="w-[90%] h-[100px] px-[30%] items-center flex flex-row justify-around [&>a]:text-[#F0FFF0] [&>a]:text-[25px]"
			>
				<NavLink to="/" style={checkActive}>Главная</NavLink>
			</div>
		</div>
			<div className="h-full">
				<Outlet />
			</div>
		</>
  );
};
