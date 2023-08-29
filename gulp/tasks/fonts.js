import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
	//search file fonts .otf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.otf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "FONTS",
						message: "Error: <%= error.message %>",
					}),
				),
			)
			//convert to .ttf
			.pipe(
				fonter({
					formats: ["ttf"],
				}),
			)
			.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
	);
};

export const ttfToWoff = () => {
	//search files fonts .ttf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "FONTS",
						message: "Error: <%= error.message %>",
					}),
				),
			)
			//convert to .woff
			.pipe(
				fonter({
					formats: "woff",
				}),
			)
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			//search files fonts .ttf
			.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
			//convert to .woff2
			.pipe(ttf2woff2())
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	);
};

export const fontsStyle = () => {
	// Путь к файлу со стилями шрифтов
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

	// Проверяем существование файла со стилями шрифтов
	fs.readdir(app.path.build.fonts, function (err, files) {
		if (files) {
			// Проверяем существование файла шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файл не существует, создаем его
				fs.writeFile(fontsFile, "", cb);

				let newFileOnly;
				for (var i = 0; i < files.length; i++) {
					// Чтение имени файла шрифта для добавления в файл стилей
					let fontFileName = files[i].split(".")[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split("-")[0]
							? fontFileName.split("-")[0]
							: fontFileName;
						let fontWeight = fontFileName.split("-")[1]
							? fontFileName.split("-")[1]
							: fontFileName;

						// Обработка значений fontWeight
						if (fontWeight.toLowerCase() === "thin") {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === "extralight") {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === "light") {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === "medium") {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === "semibold") {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === "bold") {
							fontWeight = 700;
						} else if (
							fontWeight.toLowerCase() === "extrabold" ||
							fontWeight.toLowerCase() === "heavy"
						) {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === "black") {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}

						// Добавление стилей шрифта в файл
						fs.appendFile(
							fontsFile,
							`@font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"),
                     url("../fonts/${fontFileName}.woff") format("woff");
                font-weight: ${fontWeight};
                font-style: normal;
              }\n`,
							"utf-8", // Добавьте кодировку
							cb,
						);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл уже существует
				console.log(
					"File scss/fonts.scss already exists. To update this file, you need to delete it.",
				);
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
};

function cb() {}
