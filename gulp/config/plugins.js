import replace from "gulp-replace";
import plumber from "gulp-plumber"; //resolve error
import notify from "gulp-notify"; //output message error
import browsersync from "browser-sync"; //local server
import newer from "gulp-newer"; //check updated out image
import ifPlugin from "gulp-if";

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
};
