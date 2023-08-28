import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";
import utill from "gulp-util";

export const ftp = () => {
	configFTP.log = utill.log;
	const ftpConnect = vinylFTP.create(configFTP);
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "FTP",
					message: "Error: <%= error.message %>",
				}),
			),
		)
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};
