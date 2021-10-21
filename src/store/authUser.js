import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/* Method to UPDATE the Authenicated User */
export const updateAuthUser = createAsyncThunk(
	"authUser/updateAuthUser",
	async (id, {getState, dispatch}) => {
		/**
		 * as I already know how long it will take to update the backEnd -the setTimeout value- I've decided to postpone the Authenicated user updating by the same amount of time ((instead of updating the store localy in parralel with updating the database)).
		 *
		 * and also by setTimeout ;)
		 **/
		setTimeout(() => {
			const user = getState().users.list[id];

			// dispatch the authenicated user as an action payload to set the authUser slice's initial state
			dispatch(updateUser(user));
		}, 1000);
	}
);

const slice = createSlice({
	name: "authUser",
	initialState: {
		loader: null,
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state, action) => {
			state.user = null;
		},
		updateUser: (state, action) => {
			state.user = action.payload;
			state.loader = null;
		},
	},
	extraReducers: {
		[updateAuthUser.fulfilled]: (state, action) => {
			state.loader = true;
		},
	},
});

export const {setUser, clearUser, updateUser} = slice.actions;

/* Method to SET the Authenicated User */
export const setAuthUser = (id) => (dispatch, getState) => {
	// Select the user from the ( users slice ) state by the selected ID

	const user = getState().users.list[id];

	// dispatch the authenicated user as an action payload to set the authUser slice's initial state
	dispatch(setUser(user));
};

export default slice.reducer;
