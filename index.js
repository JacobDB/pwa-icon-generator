#!/usr/bin/env node

const Jimp = require("jimp");
const argv = require("yargs").options({
    "c": {
        alias:   "color",
        default: "448AFF",
        type:    "string",
    },
    "i": {
        alias:   "icon",
        default: `${__dirname}/assets/default-icon.png`,
        type:    "string",
    },
    "o": {
        alias:   "output",
        default: "media",
        type:    "string",
    },
}).argv;

const bg_color  = Jimp.cssColorToHex(`#${argv.color}`);
const icon_path = argv.icon;

const output_sizes = {
    "startup-image": {
        "ios": [
            {
                dimensions:   [640, 960], // iPhone 4
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [640, 1136], // iPhone 5
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [750, 1334], // iPhone 6, 6S, 7, 8
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [828, 1792], // iPhone XR
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [1125, 2436], // iPhone X, XS
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [1242, 2208], // iPhone 6+, 6S+, 7+, 8+
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [1242, 2688], // iPhone XS Max
                scale_factor: 2,
                mode:         "default",
            },
            {
                dimensions:   [768, 1024], // iPad 1, 2, Mini
                scale_factor: 3,
                mode:         "default",
            },
            {
                dimensions:   [1536, 2048], // iPad 3, 4, Air, Mini 2, Pro 9.7
                scale_factor: 3,
                mode:         "default",
            },
            {
                dimensions:   [1668, 2224], // iPad Pro 10.5
                scale_factor: 3,
                mode:         "default",
            },
            {
                dimensions:   [1668, 2388], // iPad Pro 11
                scale_factor: 3,
                mode:         "default",
            },
            {
                dimensions:   [2048, 2732], // iPad Pro 12.9
                scale_factor: 3,
                mode:         "default",
            },
        ],
    },
    "touch-icon": {
        "ios": [
            {
                dimensions:   [76, 76],
                scale_factor: 1.5,
                mode:         "default",
            },
            {
                dimensions:   [120, 120],
                scale_factor: 1.5,
                mode:         "default",
            },
            {
                dimensions:   [152, 152],
                scale_factor: 1.5,
                mode:         "default",
            },
            {
                dimensions:   [167, 167],
                scale_factor: 1.5,
                mode:         "default",
            },
            {
                dimensions:   [180, 180],
                scale_factor: 1.5,
                mode:         "default",
            },
            {
                dimensions:   [1024, 1024],
                scale_factor: 1.5,
                mode:         "default",
            },
        ],
    },
    "spotlight-icon": {
        "ios": [
            {
                dimensions: [120, 120],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [80, 80],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [58, 58],
                scale_factor: 1.5,
                mode: "default",
            },
        ]
    },
    "settings-icon": {
        "ios": [
            {
                dimensions: [87, 87],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [58, 58],
                scale_factor: 1.5,
                mode: "default",
            },
        ]
    },
    "splash-icon": {
        "android": [
            {
                dimensions:   [512, 512],
                scale_factor: 1,
                mode:         "transparent",
            },
        ],
    },
    "launcher-icon": {
        "android": [
            {
                dimensions:   [48, 48],
                scale_factor: 1.75,
                mode:         "circle",
            },
            {
                dimensions:   [72, 72],
                scale_factor: 1.75,
                mode:         "circle",
            },
            {
                dimensions:   [96, 96],
                scale_factor: 1.75,
                mode:         "circle",
            },
            {
                dimensions:   [144, 144],
                scale_factor: 1.75,
                mode:         "circle",
            },
            {
                dimensions:   [192, 192],
                scale_factor: 1.75,
                mode:         "circle",
            },
        ],
    },
    "notification-icon": {
        "android": [
            {
                dimensions: [24, 24],
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [36, 36],
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [48, 48],
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [72, 72],
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [96, 96],
                scale_factor: 1,
                mode: "transparent",
            },
        ],
        "ios": [
            {
                dimensions: [60, 60],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [40, 40],
                scale_factor: 1.5,
                mode: "default",
            },
        ],
    },
};

// Generate images
Object.keys(output_sizes).forEach((name_prefix) => {
    Object.keys(output_sizes[name_prefix]).forEach((platform) => {
        output_sizes[name_prefix][platform].forEach((settings) => {
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
                        // write the image
                        background.composite(icon, icon_position[0], icon_position[1]).write(`${argv.output}/${platform}/${name_prefix}-${background.bitmap.width}x${background.bitmap.height}.png`);
                    });
                });
            });
        });
    });
});
