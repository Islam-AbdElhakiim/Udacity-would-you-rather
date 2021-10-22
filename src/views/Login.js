import React, {useEffect, useState} from "react";
import AppLogo from "../assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "./../store/users";
import {setAuthUser} from "./../store/authUser";
import {Link} from "react-router-dom";
import {fetchQuestions} from "./../store/questions";

const Login = (props) => {
	const dispatch = useDispatch();
	const usersSlice = useSelector((state) => state.users);
	const [userID, setUserID] = useState(null);
	const previousURL = props.location.pathname;

	const users = Object.values(usersSlice.list);
	//Start fetching users on start
	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchQuestions());
		return () => {
			//Start fetching users on COMPONENTWILLUNMOUNT
		};
	}, [dispatch]);

	//Function to handle the selected user
	const selectedUser = (e) => {
		setUserID(e.target.value);
	};

	//Function to handle the selected user
	const handleLogin = () => {
		dispatch(setAuthUser(userID));
	};

	return (
		<form className='login-form border text-center'>
			<div className='form-header card-header'>
				<h3>Welcome to the would you rather App</h3>
				<h6>Please sign in to continue</h6>
			</div>
			<div className='login-logo'>
				<img
					src={AppLogo}
					alt='would you rather logo'
					style={{width: "300px"}}
					className='my-2'
				/>
			</div>
			<label htmlFor='loginSelect'>
				<h2 className='text-success'>Sign In</h2>
			</label>
			<br />

			<select
				name='login'
				id='login'
				defaultValue=''
				className='w-100'
				onChange={(e) => selectedUser(e)}
			>
				<option value='' hidden disabled>
					Pick a user
				</option>
				{users.map((user) => (
					<option value={user.id} key={user.id}>
						{user.name}
					</option>
				))}
			</select>

			<br />
			<Link
				to={previousURL ? previousURL : "/"}
				type='submit'
				onClick={() => handleLogin()}
				className={
					userID
						? "btn btn-success w-100"
						: "btn btn-success w-100 disabled"
				}
			>
				Sign in
			</Link>
		</form>
	);
};

export default Login;
