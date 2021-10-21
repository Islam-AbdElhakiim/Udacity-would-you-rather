import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addNewQuestion, fetchQuestions} from "../store/questions";
import {fetchUsers} from "./../store/users";

export default function AddNew() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.authUser.user);
	const [optionOneText, setOptionOneText] = useState(null);
	const [optionTwoText, setOptionTwoText] = useState(null);

	const addNewHandler = () => {
		let question = {
			author: user.id,
			optionOneText,
			optionTwoText,
		};

		dispatch(addNewQuestion(question));
		dispatch(fetchQuestions());
		dispatch(fetchUsers());
	};
	return (
		<div className='container'>
			<div className='formWrapper border p-2'>
				<form>
					<div className='text-center'>
						<h2 className='border-bottom pb-2'>
							Would You Rather?!
						</h2>
						<input
							type='text'
							onChange={(e) => setOptionOneText(e.target.value)}
							placeholder='First option'
							className='form-control text-center my-3'
						/>
						<h2>OR</h2>
						<input
							type='text'
							onChange={(e) => setOptionTwoText(e.target.value)}
							placeholder='option two'
							className='form-control text-center'
						/>
						<Link
							to='/home'
							onClick={() => addNewHandler()}
							type='submit'
							className={
								!optionOneText || !optionTwoText
									? "btn btn-success w-100 disabled"
									: "btn btn-success w-100"
							}
						>
							Submit
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
