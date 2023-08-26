import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./public";
const srcFolder = "./src";

export const path = {
	build: {
		css: `${buildFolder}/css/`,
		html: `${buildFolder}`,
		files: `${buildFolder}/files/`,
	},
	src: {
		scss: `${srcFolder}/scss/app.scss`,
		html: `${srcFolder}/*.html`, //.pug
		files: `${srcFolder}/files/**/*.*`,
	},
	watch: {
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`, //.pug
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: "",
};
