import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";

let inputFolder = "src";
let outputFolder = "img";
let targetWidth = 1920;

const prossesImg = async () => {
   try {
      const files = await fse.readdir(inputFolder);

      for (const file of files) {
         let inputPath = `${inputFolder}/${file}`;
         let outputPath = `${outputFolder}/${file}`;

         await sharp(inputPath).resize(targetWidth).toFile(outputPath);
			await imagemin([outputPath],{
				destination : outputFolder,
				plugins: [
					imageminGifsicle(),
					imageminJpegtran({quality:80}),
					imageminPngquant(),
					imageminSvgo(),
					imageminWebp({quality:80})
				]
			})
			console.log("Acabo con exito el proseso de optimixar las imagenes");
      }
   } catch (err) {
      console.error(err);
   }
};

prossesImg();
