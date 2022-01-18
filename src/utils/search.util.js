import {SALARY_REFERENCES} from '@core/constants';

export const TAB_MAPPING = {
	1: 'profile',
	2: 'resumes',
	3: 'activity',
	4: 'application',
	5: 'note',
};
export const DEFAULT_SEARCH_FILTER = {
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
};

export const  formatSalary = function (salaries) {
	let results = [];
	salaries.forEach(item => {
		let found = SALARY_REFERENCES.find(salary => salary.name === item);
		if (found){
			results.push(found.id)
		}
	});

	return results;
}