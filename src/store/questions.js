import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from "../udacity files/_DATA";

//Fetch Questions Thunk creator
export const fetchQuestions = createAsyncThunk(
	"questions/fetchQuestions",
	async () => await _getQuestions()
);

// Add New Questions
export const addNewQuestion = createAsyncThunk(
	"questions/addNewQuestion",
	async (question) => await _saveQuestion(question)
);

// Add New Answer
export const addNewAnswer = createAsyncThunk(
	"questions/addNewAnswer",
	async (user, question, answer) =>
		await _saveQuestionAnswer(user, question, answer)
);

const slice = createSlice({
	name: "questions",
	initialState: {
		list: {},
		loader: null,
	},
	reducers: {},
	extraReducers: {
		[fetchQuestions.pending]: (state, action) => {
			state.loader = true;
		},
		[fetchQuestions.fulfilled]: (state, action) => {
			state.list = action.payload;
			state.loader = null;
		},
		[addNewAnswer.fulfilled]: (state, action) => {},
	},
});

export default slice.reducer;
