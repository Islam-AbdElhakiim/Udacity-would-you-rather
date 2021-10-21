import React from "react";
import Question from "../Compontents/Question";
import {useSelector} from "react-redux";

export default function Home() {
	const user = useSelector((state) => state.authUser.user);
	const userAnswersArray = Object.keys(user.answers);
	const usersSlice = useSelector((state) => state.users.list);
	const questionsSlice = useSelector((state) => state.questions);
	const questionsList = Object.values(questionsSlice.list);
	const questionsLoader = questionsSlice.loader;

	let answeredQuestions = questionsList
		.filter((quest) => userAnswersArray.includes(quest.id))
		.reverse();

	let unAnsweredQuestions = questionsList
		.filter((quest) => !userAnswersArray.includes(quest.id))
		.reverse();
	// console.log(users);

	return questionsLoader ? (
		<div className='loader'></div>
	) : (
		<div className='home-nav border border-secondary'>
			<nav>
				<div
					className='nav nav-tabs justify-content-center'
					id='nav-tab'
					role='tablist'
				>
					<button
						className='nav-link active'
						id='unaswered-tab'
						data-bs-toggle='tab'
						data-bs-target='#unasnwered'
					>
						Unanswered Questions
					</button>
					<button
						className='nav-link'
						id='answered-tab'
						data-bs-toggle='tab'
						data-bs-target='#answered'
					>
						Answered Questions
					</button>
				</div>
			</nav>
			<div className='tab-content' id='nav-tabContent'>
				<div
					className='tab-pane fade show active '
					id='unasnwered'
					role='tabpanel'
					aria-labelledby='unasnwered-tab'
				>
					{unAnsweredQuestions.length < 1 ? (
						<p className='text-center py-3 text-info'>
							you've answered all of the questions
						</p>
					) : (
						<>
							{unAnsweredQuestions.map((question) => (
								<Question
									key={question.id}
									action='answer'
									question={question}
									authorName={
										usersSlice[question.author].name
									}
									authorAvatar={
										usersSlice[question.author].avatarURL
									}
								/>
							))}
						</>
					)}
				</div>
				<div
					className='tab-pane fade'
					id='answered'
					role='tabpanel'
					aria-labelledby='answered-tab'
				>
					{answeredQuestions < 1 ? (
						<p className='text-center py-3 text-info'>
							you have no answered question...
						</p>
					) : (
						<>
							{answeredQuestions.map((question) => (
								<Question
									key={question.id}
									action='view'
									question={question}
									authorName={
										usersSlice[question.author].name
									}
									authorAvatar={
										usersSlice[question.author].avatarURL
									}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
