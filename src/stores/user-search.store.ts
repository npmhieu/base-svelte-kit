import { writable, get } from 'svelte/store';
import {searchFiltersStore, DefaultSearchString, searchQueryStore} from '@stores/search-filters.store';
import {userStore, currentUser} from '@stores/user-store';

import {formatSalary} from '@utils/search.util.js';
import {kitApi} from '@core/variables';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

export const userSearchStore = writable({
	currentPage: null,
	totalUserCount: null,
	totalPage: null,
	userIds: [],
	searchSessionId: null
});

const DEFAULT_SEARCH_STORE = {
	currentPage: null,
	totalUserCount: null,
	totalPage: null,
	userIds: [],
	searchSessionId: null
}

export const search =  async function () {

	// reset result
	userSearchStore.set(DEFAULT_SEARCH_STORE);

	// convert salary text to id
	let searchQuery = get(searchQueryStore);
	const payload = {...searchQuery, salary: formatSalary(searchQuery.salary)}

	const res = await fetch(kitApi.search, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'content-type': 'application/json'
		}
	});
	const {data} = await res.json();

	const users = {};

	if (data) {
		data.items.forEach(user => users[user.userId] = {
			...user,
			lastUpdated: moment(user.updatedOn, 'DD-MM-YYYY hh:mm').fromNow()
		});

		userStore.set({users: users, selectedId: null});

		userSearchStore.set({
			totalUserCount: data.pagination.totalItems,
			searchSessionId: uuidv4(),
			currentPage: 1,
			totalPage: data.pagination.totalPages,
			userIds: data.items.map(user => user.userId)
		});

	}
}

export const searchMore =  async function () {
	// $userSearchStore.currentPage = $userSearchStore.currentPage + 1;

	let searchStore = get(userSearchStore);
	let searchQuery = get(searchQueryStore);
	const payload = {...searchQuery, salary: formatSalary(searchQuery.salary)};

	const res = await fetch(kitApi.search, {
		method: 'POST',
		body: JSON.stringify({
			...payload,
			page: searchStore.currentPage + 1
		}),
		headers: {
			'content-type': 'application/json'
		}
	});
	const {data} = await res.json();

	let users = get(userStore).users;
	// let currentUserSearchStore = get(userSearchStore);

	if (data) {
		data.items.forEach(user => users[user.userId] = {
			...user,
			lastUpdated: moment(user.updatedOn, 'DD-MM-YYYY hh:mm').fromNow()
		});

		// check this
		userStore.set({users: users, selectedId: null});

		userSearchStore.set({
			...searchStore,
			totalUserCount: data.pagination.totalItems,
			currentPage: data.pagination.currentPage,
			totalPage: data.pagination.totalPages,
			userIds: [...searchStore.userIds, ...data.items.map(user => user.userId)]
		});

	}
}