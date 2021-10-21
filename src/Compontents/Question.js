import React from "react";
import {Link} from "react-router-dom";

export default function Question(props) {
	// Destructin question Data
	const {question, action, authorName, authorAvatar} = props;
	return (
		<div className='question-wrapper my-4 border border-success'>
			<div className='question-title'>
				<small>{authorName} asks:</small>
			</div>
			<div className='question-body d-flex m-2'>
				<div className='question-avatar px-5  text-center'>
					<img
						src={authorAvatar}
						className='rounded-circle'
						style={{maxWidth: "100px"}}
						alt=''
					/>
				</div>
				<div className='question-text flex-grow-1 mx-3'>
					<h3>Would you rather</h3>
					<h6>..{question.optionOne.text}...</h6>
					{action === "answer" ? (
						<Link
							className='btn btn-success w-100'
							to={{
								pathname: `/question/${question.id}`,
								authorName,
								authorAvatar,
								action,
							}}
						>
							Answer Poll
						</Link>
					) : (
						<Link
							className='btn btn-primary w-100'
							to={{
								pathname: `/question/${question.id}`,
								authorName,
								authorAvatar,
								action,
							}}
						>
							View Answer
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
