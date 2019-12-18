const sizes = {
    "startup-image": {
        "ios": [
            {
                dimensions: [640, 960], // iPhone 4
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [640, 1136], // iPhone 5
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [750, 1334], // iPhone 6, 6S, 7, 8
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [828, 1792], // iPhone XR
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1125, 2436], // iPhone X, XS
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1242, 2208], // iPhone 6+, 6S+, 7+, 8+
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1242, 2688], // iPhone XS Max
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [768, 1024], // iPad 1, 2, Mini
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1536, 2048], // iPad 3, 4, Air, Mini 2, Pro 9.7
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1668, 2224], // iPad Pro 10.5
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1668, 2388], // iPad Pro 11
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [2048, 2732], // iPad Pro 12.9
                scale_factor: 3,
                mode: "default",
            },
        ],
    },
    "touch-icon": {
        "ios": [
            {
                dimensions: [76, 76],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [120, 120],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [152, 152],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [167, 167],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [180, 180],
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [1024, 1024],
                scale_factor: 1.5,
                mode: "default",
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
                dimensions: [512, 512],
                scale_factor: 1,
                mode: "transparent",
            },
        ],
    },
    "launcher-icon": {
        "android": [
            {
                dimensions: [48, 48],
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [72, 72],
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [96, 96],
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [144, 144],
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [192, 192],
                scale_factor: 1.75,
                mode: "circle",
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

let totalLength = 0;
for (const x in sizes)
    for (const y in sizes[x])
        totalLength += sizes[x][y].length

module.exports.outputSizes = sizes;
module.exports.totalSizesLength = totalLength;
