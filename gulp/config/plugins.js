import replace from "gulp-replace";
import plumber from "gulp-plumber"; //resolve error
import notify from "gulp-notify"; //output message error
import browsersync from "browser-sync"; //local server

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
};
