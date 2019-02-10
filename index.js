#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

const Jimp = require("jimp");
const yargs = require("yargs");
const svgToPng = require("svg-to-png");
const _cliProgress = require('cli-progress');

const { outputSizes, totalSizesLenght } = require("./output-sizes");


const options = {
    "c": {
        alias: "color",
        default: "448AFF",
        type: "string",
    },
    "i": {
        alias: "icon",
        default: "assets/default-icon.png",
        type: "string",
    },
    "o": {
        alias: "output",
        default: "media",
        type: "string",
    },
}
const argv = yargs.options(options).argv;

for (const i in options) {
    if (options[i].default === argv[i]) {
        console.info(`INFO: Using default value of '${options[i].alias}' (${argv[i]})`);
    }
}

const bgColor = Jimp.cssColorToHex(`#${argv.color}`);

new Promise(async (resolve) => {
    // verify if icon are svg
    if (path.extname(argv.icon) === '.svg') {
        // get path of icon
        const iconFolder = path.dirname(argv.icon);
        const iconName = path.basename(argv.icon, '.svg');

        // get fullpath of temp file
        const tempIcon = `${iconName}.png`;

        console.warn(`\nWARN: Please don't delete ${tempIcon}. We'll do it for you when we're done.\n`);

        // create temp png of svg
        await svgToPng.convert(path.resolve(argv.icon), iconFolder, {
            defaultHeight: 8000,
            defaultWidth: 8000,
        });

        resolve({
            iconPath: path.resolve(path.join(iconFolder, tempIcon)), 
            bySVG: true
        });
    } else {
        console.warn(`\nWARN: Please don't delete ${path.basename(argv.icon)}.\n`);
        resolve({
            iconPath: path.resolve(argv.icon),
            bySVG: false
        });
    }
}).then((params, bySVG) => {
    // create a new progress bar instance and use shades_classic theme
    const progress = new _cliProgress.Bar({
        format: 'Progress [{bar}] {percentage}% ({value}/{total}) | ETA: {eta}s | Status: {status}'
    });
    
    // start the progress bar with a total value of 'totalSizesLenght' and start value of 0
    progress.start(totalSizesLenght, 0, {
        status: 'Starting...'
    });
    let currentProgress = 0;


    // Generate images
    for (const namePrefix in outputSizes) {
        const currentNamePrefix = outputSizes[namePrefix];

        for (const platform in currentNamePrefix) {
            const currentPlatform = currentNamePrefix[platform];

            currentPlatform.forEach((settings) => {
                // set the default background in an array
                const backgrounds = [new Jimp(settings.dimensions[0], settings.dimensions[1], bgColor)];

                // determine the icon size based on the x dimension divided by the scaling factor
                const icon_size = Math.ceil(settings.dimensions[0] / settings.scale_factor);

                // if dimension aren't equal, add a rotated background to the array
                if (settings.dimensions[0] !== settings.dimensions[1]) {
                    backgrounds.push(new Jimp(settings.dimensions[1], settings.dimensions[0], bgColor));
                }

                const finalIconLocation = `${argv.output}/${platform}/`;
                progress.update(currentProgress, {
                    status: `${finalIconLocation}...`
                });

                Jimp.read(params.iconPath).then((icon) => {
                    icon.cover(icon_size, icon_size);

                    backgrounds.forEach((background) => {
                        const finalIconSize = `${background.bitmap.width}x${background.bitmap.height}`;
                        const finalIconFile = `${finalIconLocation}${namePrefix}-${finalIconSize}.png`;


                        progress.update(currentProgress, {
                            status: `${finalIconFile}...`
                        });
                        // determine where to position the icon for it to appear centered
                        const icon_position = [Math.ceil((background.bitmap.width / 2) - icon_size / 2), Math.ceil((background.bitmap.height / 2) - icon_size / 2)];

                        // set the background to transparent if opaque is false
                        if (settings.mode === "transparent") {
                            background.opacity(0);
                        }

                        // check if the image needs to be masked
                        new Promise((resolve) => {
                            // adjust the background if mode is circle
                            if (settings.mode === "circle") {
                                // read the circle mask
                                Jimp.read(`${__dirname}/assets/circle-mask.png`).then((mask) => {
                                    // resize the circle mask to match the background
                                    mask.resize(background.bitmap.width, background.bitmap.height);

                                    // apply the circle mask the background
                                    background.mask(mask, 0, 0);

                                    // emboss
                                    background.convolute([[-2, -1, 0], [-1, 1, 1], [0, 1, 2]]);

                                    // read the shadow
                                    Jimp.read(`${__dirname}/assets/circle-shadow.png`).then((shadow) => {
                                        // resize the shadow to match the background
                                        shadow.resize(background.bitmap.width, background.bitmap.height);

                                        // layer the shadow below the background
                                        shadow.composite(background, 0, 0);

                                        // return the background for final write
                                        resolve(shadow);
                                    });
                                });
                            } else {
                                // immediately resolve with the existing background if mode is not circle
                                resolve(background);
                            }
                        }).then((background) => {


                            // write the image
                            background.composite(icon, icon_position[0], icon_position[1]).write(finalIconFile);

                            // update the current value
                            currentProgress += 1;
                            progress.update(currentProgress, {
                                status: `${finalIconFile} OK!`
                            });

                            // verify if is the last item
                            if (currentProgress === totalSizesLenght) {
                                progress.update(currentProgress, {
                                    status: `Finished!`
                                });
            
                                // delete temp png of svg
                                if (params.bySVG) {
                                    fs.unlinkSync(params.iconPath);
                                }

                                // stop the progress bar
                                progress.stop();
                            }
                        });
                    });
                });
            });



        }
    }
});
