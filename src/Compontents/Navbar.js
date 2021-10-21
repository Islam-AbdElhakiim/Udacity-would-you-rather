import React from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {clearUser} from "../store/authUser";

export default function Navbar() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.authUser.user);

	// method to log out
	const byebye = () => dispatch(clearUser());
	return (
		<div>
			<nav
				className='navbar navbar-expand-lg navbar-light'
				style={{borderBottom: "3px solid #9615d1"}}
			>
				<div className='container'>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse'
						id='navbarSupportedContent'
					>
						<ul
							className='nav nav-tabs me-auto mb-2 mb-lg-0'
							id='myTab'
							role='tablist'
						>
							<li className='nav-item' role='presentation'>
								<Link to='/' className='nav-link active'>
									Home
								</Link>
							</li>
							<li className='nav-item' role='presentation'>
								<Link to='/add' className='nav-link'>
									New Question
								</Link>
							</li>
							<li className='nav-item' role='presentation'>
								<Link to='/leaderboard' className='nav-link'>
									Leader-Board!
								</Link>
							</li>
						</ul>
						{!user ? (
							<Link
								to='welcome'
								className='btn btn-outline-success '
								type='submit'
							>
								Login!
							</Link>
						) : (
							<div className='d-flex align-items-center justify-content-between'>
								<img
									src={user.avatarURL}
									className='rounded-circle'
									style={{width: "62px"}}
									alt={user.name}
								/>
								<div className='ps-2 pe-4'>{user.name}</div>
								<Link
									to='welcome'
									className='btn btn-outline-danger '
									type='submit'
									onClick={() => byebye()}
								>
									Logout!
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}
