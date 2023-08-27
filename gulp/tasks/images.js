import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
	return app.gulp
		.src(app.path.src.images)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "IMAGE",
					message: "Error: <%= error.message %>",
				}),
			),
		)
		.pipe(app.plugins.newer(app.path.src.images))
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.images))
		.pipe(app.plugins.newer(app.path.src.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewbox: false }],
				optimizationLevel: 3, // o to 7
			}),
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
};
