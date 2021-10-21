import React from "react";
import {useSelector} from "react-redux";

const LeaderboardPlayer = () => {
	const users = useSelector((state) => state.users.list);
	let sortedUsers = Object.values(users)
		.map((user) => ({
			...user,
			answeredQuestionsCount: Object.values(user.answers).length,
			createdQuestionsCount: user.questions.length,
			totalScore:
				Object.values(user.answers).length + user.questions.length,
		}))
		.sort((a, b) => a.totalScore - b.totalScore)
		.reverse();
	let trophyColor;

	return Object.values(sortedUsers).map((user, id) => {
		switch (id) {
			case 0:
				trophyColor = "#ffcc2c";
				break;
			case 1:
				trophyColor = "#ffc5a1";
				break;
			case 2:
				trophyColor = "#6f8789";
				break;
			default:
				trophyColor = "#ffcc2c";
		}
		return (
			<div key={user.id} className='leaderboard-player d-flex border'>
				<div className='leaderboard-avatar position-relative pb-5 pe-2'>
					<div className='trophy-wrapper'>
						<i
							className='player-trophy bi bi-trophy-fill'
							style={{color: trophyColor}}
						></i>
					</div>
					<img
						src={user.avatarURL}
						alt={user.name}
						width=' 100px'
						className='mx-3'
					/>
				</div>
				<div className='leaderboard-credentials text-center border flex-grow-1'>
					<h2 className='card-header'>{user.name}</h2>
					<div className='row mt-3'>
						<div className='col'>
							<p>Answered Question</p>
						</div>
						<div className='col'>
							<p>{user.answeredQuestionsCount}</p>
						</div>
					</div>
					<hr />
					<div className='row'>
						<div className='col'>
							<p>Created Question</p>
						</div>
						<div className='col'>
							<p>{user.createdQuestionsCount}</p>
						</div>
					</div>
				</div>
				<div className='card leaderboard-score'>
					<h2 className='card-header'>Score</h2>
					<div className='card-body d-flex flex-direction-column justify-content-center align-items-center'>
						<div className='score-wrapper rounded-circle bg-success text-white text-center p-3'>
							<h2>{user.totalScore}</h2>
						</div>
					</div>
				</div>
			</div>
		);
	});
};

export default LeaderboardPlayer;
