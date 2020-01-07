export default {
	REFRESH_POSTS: (state, Posts) => {
		state.posts = Posts
	},
	REFRESH_PAGES: (state, Pages) => {
		state.pages = Pages
	}
	// ,
	// appendPet: (state, { species, pet }) => {
	// 	state[species].push(pet)
	// }
}
