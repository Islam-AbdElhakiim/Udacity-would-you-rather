import React, {useState} from "react";
import {useLocation, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addNewAnswer, fetchQuestions} from "../store/questions";
import {fetchUsers} from "./../store/users";
import {updateAuthUser} from "../store/authUser";

const QuestionData = (props) => {
	const dispatch = useDispatch();
	const authUserSlice = useSelector((state) => state.authUser);
	const user = authUserSlice.user;
	const loader = authUserSlice.loader;
	const location = useLocation();
	const {action, authorName, authorAvatar} = location;
	const questionsList = useSelector((state) => state.questions.list);
	const id = props.match.params.id;
	const selectedQuestion = questionsList[id];
	const [answer, setAnswer] = useState(null);
	const userAnswer = user.answers[id];
	const optionOneLength = selectedQuestion.optionOne.votes.length;
	const optionTwoLength = selectedQuestion.optionTwo.votes.length;
	const totalQuestionVotes = optionOneLength + optionTwoLength;
	const optionOnePercentage = (
		(selectedQuestion.optionOne.votes.length * 100) /
		totalQuestionVotes
	).toFixed(0);
	const optionTwoPercentage = (
		(selectedQuestion.optionTwo.votes.length * 100) /
		totalQuestionVotes
	).toFixed(0);

	console.log(
		totalQuestionVotes,
		optionOneLength,
		optionTwoLength,
		optionOnePercentage,
		optionTwoPercentage
	);

	const addNewAnswerHandler = (authedUser, qid, answer) => {
		const answerData = {
			authedUser,
			qid,
			answer,
		};
		dispatch(addNewAnswer(answerData));
		dispatch(fetchQuestions());
		dispatch(fetchUsers());
		dispatch(updateAuthUser(user.id));
	};

	return loader ? (
		<div className='loader'></div>
	) : action === "answer" ? (
		<div className='question-data-wrapper my-5  border border-success'>
			<div className='question-title'>
				<small> {authorName} asks:</small>
			</div>
			<div className='question-body d-flex m-2'>
				<div className='question-avatar px-5  text-center'>
					<img
						src={authorAvatar}
						className='rounded-circle'
						style={{width: "100px"}}
						alt=''
					/>
				</div>
				<div className='question-text flex-grow-1 mx-3 '>
					<h3>Would you rather</h3>

					<div className='form-check'>
						<input
							className='form-check-input'
							type='radio'
							name='flexRadioDefault'
							id='flexRadioDefault1'
							onChange={() => setAnswer("optionOne")}
						/>
						<label
							className='form-check-label'
							htmlFor='flexRadioDefault1'
						>
							{selectedQuestion.optionOne.text}
						</label>
					</div>
					<div className='form-check'>
						<input
							className='form-check-input'
							type='radio'
							name='flexRadioDefault'
							id='flexRadioDefault2'
							onChange={() => setAnswer("optionTwo")}
						/>
						<label
							className='form-check-label'
							htmlFor='flexRadioDefault2'
						>
							{selectedQuestion.optionTwo.text}
						</label>
					</div>

					<Link
						to={`/question/${id}`}
						onClick={() => addNewAnswerHandler(user.id, id, answer)}
						type='submit'
						className={
							answer
								? "btn btn-success w-100 my-3"
								: "btn btn-success w-100 my-3 disabled"
						}
					>
						Submit
					</Link>
				</div>
			</div>
		</div>
	) : (
		<div className='question-data-wrapper my-5  border border-success'>
			<div className='question-title'>
				<small> {authorName}'s Asked:</small>
			</div>
			<div className='question-body d-flex m-2'>
				<div className='question-avatar px-5  text-center'>
					<img
						src={authorAvatar}
						className='rounded-circle'
						style={{width: "100px"}}
						alt=''
					/>
				</div>
				<div className='question-text flex-grow-1 mx-3 '>
					<h3>Result:</h3>
					<h6>Would you rather</h6>
					<hr />
					<div
						style={{
							border:
								userAnswer === "optionOne"
									? "2px solid green"
									: "1px solid #dee2e6",
						}}
						className='answer-1 text-center p-3'
					>
						<h5>{selectedQuestion.optionOne.text}</h5>
						<div id='myProgress'>
							<div
								id='myBar'
								style={{
									width: `${optionOnePercentage}%`,
									margin: "0, 20%",
								}}
							>
								{optionOnePercentage}%
							</div>
						</div>
						{optionOneLength} out of {totalQuestionVotes} votes
					</div>
					<div
						style={{
							border:
								userAnswer === "optionTwo"
									? "2px solid green"
									: "1px solid #dee2e6",
						}}
						className='answer-2 text-center p-3'
					>
						<h5>{selectedQuestion.optionTwo.text}</h5>
						<div id='myProgress'>
							<div
								id='myBar'
								style={{
									width: `${optionTwoPercentage}%`,
									margin: "0, 20%",
								}}
							>
								{optionTwoPercentage}%
							</div>
						</div>
						{optionTwoLength} out of {totalQuestionVotes} votes
					</div>
				</div>
			</div>
			<Link
				className='btn btn-success w-100'
				to={{
					pathname: "/",
				}}
			>
				Back
			</Link>
		</div>
	);
};

export default QuestionData;
