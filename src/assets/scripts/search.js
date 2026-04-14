// For search functionality on the header.

/* global Vue, axios */
import {search, createPagination, processDisplayResults} from './utilities.js';
const parameters = new URLSearchParams(globalThis.location.search);
const searchTerm = parameters.get('s').toLowerCase();
const pageInQuery = parameters.get('page');
const pageSize = 10;

// eslint-disable-next-line no-new
new Vue({
	el: '#defaultContainer',
	mounted() {
		const vm = this;
		let results = [];

		axios.get(globalThis.location.origin + '/index.json').then(response => {
			// Perform the search
			results = search(response.data, searchTerm);

			// Convert some post values to formats that can be displayed
			if (results.length > 0) {
				results = processDisplayResults(results);
			}

			// Paginate search results
			let pagination;
			if (results.length > pageSize) {
				pagination = createPagination(results, pageSize, pageInQuery, '/search/?s=' + searchTerm + '&page=:page');
			}

			vm.pagination = pagination;
			vm.resultsToDisplay = pagination ? pagination.items : results;
			vm.searchStatus = `We found ${results.length} results for your search.`;
		});
	},
	data: {
		searchTerm: parameters.get('s'),
		searchStatus: 'Searching...',
		resultsToDisplay: [],
		pagination: null,
	},
});
