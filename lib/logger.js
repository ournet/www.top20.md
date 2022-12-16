"use strict";

(module.exports = {
	info: (...args) => {
		return console.log(...args);
	},
	warn: (...args) => {
		return console.warn(...args);
	},
	error: (...args) => {
		return console.error(...args);
	},
});
