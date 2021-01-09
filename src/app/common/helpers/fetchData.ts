import defaultsDeep from 'lodash-es/defaultsDeep';

export const fetchData = (url: string, options: any = {}) => {
	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};
	return fetch(url, defaultsDeep(options, {
		headers,
	}));
};

export const fetchFileData = (url: string, options: any = {}) => {
	const headers = {
		'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
	};
	return fetch(url, defaultsDeep(options, {
		headers,
	}));
};
