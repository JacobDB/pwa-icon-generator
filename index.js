#!/usr/bin/env node

const Jimp = require("jimp");

const options = {
    "c": {
        alias: "color",
        default: "448AFF",
        type: "string",
    },
    "i": {
        alias: "icon",
        default: `${__dirname}/assets/default-icon.png`,
        type: "string",
    },
    "o": {
        alias: "output",
        default: "media",
        type: "string",
    },
}
const argv = require("yargs").options(options).argv;

for (const i in options) {
    if (options[i].default === argv[i]) {
        console.info(`INFO: Using default value of '${options[i].alias}' (${argv[i]})`);
    }
}
console.log('\n');

const bg_color = Jimp.cssColorToHex(`#${argv.color}`);
const icon_path = argv.icon;

const output_sizes = require("./output-sizes");

// Generate images
for (const name_prefix in output_sizes) {
    const currentNamePrefix = output_sizes[name_prefix];

    for (const platform in currentNamePrefix) {
        const currentPlatform = currentNamePrefix[platform];

        currentPlatform.forEach((settings) => {
            // set the default background in an array
            const backgrounds = [new Jimp(settings.dimensions[0], settings.dimensions[1], bg_color)];

            // determine the icon size based on the x dimension divided by the scaling factor
            const icon_size = Math.ceil(settings.dimensions[0] / settings.scale_factor);

            // if dimension aren't equal, add a rotated background to the array
            if (settings.dimensions[0] !== settings.dimensions[1]) {
                backgrounds.push(new Jimp(settings.dimensions[1], settings.dimensions[0], bg_color));
            }

            Jimp.read(icon_path).then((icon) => {
                icon.resize(icon_size, Jimp.AUTO);

                backgrounds.forEach((background) => {
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
                                // reszie the circle mask to match the background
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
                        const finalIconLocation = `${argv.output}/${platform}/`;
                        const finalIconSize = `${background.bitmap.width}x${background.bitmap.height}`;

                        const finalIconFile = `${finalIconLocation}${name_prefix}-${finalIconSize}.png`;

                        // write the image
                        background.composite(icon, icon_position[0], icon_position[1]).write(finalIconFile);
                    });
                });
            });
        });

    }
}
