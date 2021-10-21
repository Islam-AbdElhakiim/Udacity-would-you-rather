import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {_getUsers} from "../udacity files/_DATA";

//Fetch users Thunk creator
export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async () => await _getUsers()
);

const slice = createSlice({
	name: "users",
	initialState: {
		list: {},
		loader: null,
	},
	reducers: {},
	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.loader = true;
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.list = action.payload;
			state.loader = null;
		},
	},
});

export default slice.reducer;
