import "./App.css";
import Navbar from "./Compontents/Navbar";
import {Route, Switch} from "react-router-dom";
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
							</>
						)
					}
				/>
				<Route
					path='/add'
					render={(props) =>
						user ? <AddNew {...props} /> : <Login {...props} />
					}
				/>
				<Route
					path='/leaderboard'
					render={(props) =>
						user ? (
							<LeaderboardPlayer {...props} />
						) : (
							<Login {...props} />
						)
					}
				/>
				<Route
					path='/'
					exact
					render={(props) =>
						user ? <Home {...props} /> : <Login {...props} />
					}
				/>
				<Route
					render={(props) =>
						user ? <NotFound {...props} /> : <Login {...props} />
					}
				/>
				)
			</Switch>
		</div>
	);
}

export default App;
