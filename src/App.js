import "./App.css";
import Navbar from "./Compontents/Navbar";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./views/Home";
import AddNew from "./views/AddNew";
import LeaderboardPlayer from "./views/LeaderboardPlayer";
import Login from "./views/Login";
import QuestionData from "./Compontents/QuestionData";
import NotFound from "./Compontents/NotFound";
import {useSelector} from "react-redux";

function App() {
	// Auth user Slice info {user and loader}
	const authUserSlice = useSelector((state) => state.authUser);
	const user = authUserSlice.user;

	return (
		<div className='App'>
			<Navbar />

			<Switch>
				<Route
					path='/question/:id'
					render={(props) =>
						user ? (
							<QuestionData {...props} />
						) : (
							<>
								<Login {...props} />
								<Redirect to='/welcome' />
							</>
						)
					}
				/>
				<Route
					path='/add'
					render={(props) =>
						user ? (
							<AddNew {...props} />
						) : (
							<Redirect to='/welcome' />
						)
					}
				/>
				<Route
					path='/leaderboard'
					render={(props) =>
						user ? (
							<LeaderboardPlayer {...props} />
						) : (
							<Redirect to='/welcome' />
						)
					}
				/>
				<Route path='/welcome' component={Login} />
				<Route
					path='/'
					exact
					render={(props) =>
						user ? <Home {...props} /> : <Redirect to='/welcome' />
					}
				/>
				<Route component={NotFound} />)
			</Switch>
		</div>
	);
}

export default App;
