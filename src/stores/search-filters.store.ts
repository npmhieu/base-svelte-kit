import { writable } from 'svelte/store';
import type {PartialProps} from '@core/types';
import type {SearchFilter} from '@core/constants';
import {variables} from '@core/variables';

let isDirty = false;

export const DefaultSearchString =
	JSON.stringify({
		"sortBy": 2,
		"job-industry": [],
		"job-function": [],
		"isVietnamese": 0,
		"salary": [],
		"location": [],
		"src": [],
		"stringFind": "",
		"language": [],
		"newProfileOnly": 0,
		"activeOnly": 0,
		"lastUpdated": 1,
		"age": [null, null]
	});
function generateDefaultSearch() {
	return JSON.parse(DefaultSearchString)
}

function optimizeSearchKeyword(rawInput): string
	{
		let searchKeyword = rawInput
			.replace(/“”‘’"/g, `'`)
			.replace(/(\(\))/g, '')
			.replace(/''/g, '')
			.replace(/""/g, '')
			.trim()
			.replace(/ or /gi, ' OR ')
			.replace(/ and /gi, ' AND ')
			.replace(/'/g, `"`);
		if (searchKeyword.endsWith(' AND')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' AND')).trim();
		} else if (searchKeyword.endsWith('"AND')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf('AND')).trim();
		} else if (searchKeyword.endsWith(`'AND`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(`AND`)).trim();
		} else if (searchKeyword.endsWith(' AND"')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' AND"')).trim();
		} else if (searchKeyword.endsWith(` AND'`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` AND'`)).trim();
		} else if (searchKeyword.endsWith(` AND(`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` AND(`)).trim();
		} else if (searchKeyword.endsWith(` AND (`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` AND (`)).trim();
		} else if (searchKeyword.endsWith(' &')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf('&')).trim();
		} else if (searchKeyword.endsWith('"&')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf('&')).trim();
		} else if (searchKeyword.endsWith(`'&`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(`&`)).trim();
		} else if (searchKeyword.endsWith(' &"')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' &"')).trim();
		} else if (searchKeyword.endsWith(` &'`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` &'`)).trim();
		} else if (searchKeyword.endsWith(` &(`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` &(`)).trim();
		} else if (searchKeyword.endsWith(` & (`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` & (`)).trim();
		} else if (searchKeyword.endsWith(' OR')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' OR')).trim();
		} else if (searchKeyword.endsWith('"OR')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf('OR')).trim();
		} else if (searchKeyword.endsWith(`'OR`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(`OR`)).trim();
		} else if (searchKeyword.endsWith(' OR"')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' OR"')).trim();
		} else if (searchKeyword.endsWith(` OR'`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` OR'`)).trim();
		} else if (searchKeyword.endsWith(` OR(`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` OR(`)).trim();
		} else if (searchKeyword.endsWith(` OR (`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` OR (`)).trim();
		} else if (searchKeyword.endsWith(' NOT')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' NOT')).trim();
		} else if (searchKeyword.endsWith('"NOT')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf('NOT')).trim();
		} else if (searchKeyword.endsWith(`'NOT`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(`NOT`)).trim();
		} else if (searchKeyword.endsWith(' NOT"')) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(' NOT"')).trim();
		} else if (searchKeyword.endsWith(` NOT'`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` NOT'`)).trim();
		} else if (searchKeyword.endsWith(` NOT(`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` NOT(`)).trim();
		} else if (searchKeyword.endsWith(` NOT (`)) {
			searchKeyword = searchKeyword.substr(0, searchKeyword.lastIndexOf(` NOT (`)).trim();
		}
		return searchKeyword;
	}

export const searchQueryStore = writable<SearchQuery>(generateDefaultSearch());

export const searchFiltersStore: any = {
	subscribe: searchQueryStore.subscribe,
	set: searchQueryStore.set,
	update: (value: PartialProps<SearchQuery>) => {
		searchQueryStore.update(props => ({...props, ...value}));
		return value;
	},
	reset: () => searchQueryStore.set(generateDefaultSearch()),
	updateSearchKeyword: (rawInput) => searchQueryStore.update(payload => {
		payload.stringFind = optimizeSearchKeyword(rawInput);
		return payload;
	})
}

interface SearchQuery {
	page?: number;
	sortBy: 1 | 2;
	"job-industry": string[];
	"job-function": string[];
	"isVietnamese": 0 | 1 | 2;
	"age": number[];
	"salary": string[];
	"location": number[];
	"src": string[];
	"stringFind": string;
	"language": string[];
	"newProfileOnly": number;
	"activeOnly": number;
	"lastUpdated": typeof SearchFilter.LastUpdateTime;
}
