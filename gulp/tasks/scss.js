import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // file css compression
import webpcss from "gulp-webpcss"; // output webp image, need plugin webp-converter@2.2.3

import autoprefixer from "gulp-autoprefixer"; //add vendor prefix crossbrowser
import groupCssMediaQueries from "gulp-group-css-media-queries"; //group media queries

const sass = gulpSass(dartSass); //compilator

export const scss = () => {
	return (
		app.gulp
			.src(app.path.src.scss, { sourcemaps: true })
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "SCSS",
						message: "Error: <%= error.message %>",
					}),
				),
			)
			.pipe(app.plugins.replace(/@img\//g, "../img/"))
			.pipe(
				sass({
					outputStyle: "expanded",
				}),
			)
			.pipe(groupCssMediaQueries())
			.pipe(
				webpcss({
					webpClass: ".webp",
					noWebpClass: ".no-webp",
				}),
			)
			.pipe(
				autoprefixer({
					grid: true,
					overrideBrowserlist: ["last 3 versions"],
					cascade: true,
				}),
			)
			//if need not minify Css
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(cleanCss())
			.pipe(
				rename({
					extname: ".min.css",
				}),
			)
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.browsersync.stream())
	);
};
