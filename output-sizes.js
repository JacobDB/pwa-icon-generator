const sizes = {
    "startup-image": {
        "ios": [
            {
                dimensions: [2048, 2732], // 12.9" iPad Pro
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1668, 2388], // 11" iPad Pro, 10.5" iPad Pro
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1536, 2048], // 9.7" iPad Pro, 7.9" iPad mini, 9.7" iPad Air, 9.7" iPad
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1668, 2224], // 10.5" iPad Air
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1620, 2160], // 10.2" iPad
                scale_factor: 3,
                mode: "default",
            },
            {
                dimensions: [1284, 2778], // iPhone 12 Pro Max
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1170, 2532], // iPhone 12 Pro, iPhone 12
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1125, 2436], // iPhone 12 mini, iPhone 11 Pro, iPhone XS, iPhone X
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1242, 2688], // iPhone 11 Pro Max, iPhone XS Max
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [828, 1792], // iPhone 11, iPhone XR
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [1080, 1920], // iPhone 8 Plus, iPhone 7 Plus, iPhone 6s Plus, iPhone 6 Plus
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [750, 1334], // iPhone 8, iPhone 7, iPhone 6s, iPhone 6, 4.7" iPhone SE
                scale_factor: 2,
                mode: "default",
            },
            {
                dimensions: [640, 1136], // 4 iPhone SE, iPod touch 5th generation and later
                scale_factor: 2,
                mode: "default",
            }
        ],
    },
    "touch-icon": {
        "ios": [
            {
                dimensions: [180, 180], // iPhone (3x)
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [120, 120], // iPhone (2x)
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [167, 167], // iPad Pro
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [152, 152], // iPad, iPad mini
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [1024, 1024], // App Store
                scale_factor: 1.5,
                mode: "default",
            },
        ],
    },
    "spotlight-icon": {
        "ios": [
            {
                dimensions: [120, 120], // iPhone
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [80, 80], // iPad Pro, iPad, iPad mini
                scale_factor: 1.5,
                mode: "default",
            },
        ]
    },
    "settings-icon": {
        "ios": [
            {
                dimensions: [87, 87], // iPhone
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [58, 58], // iPad Pro, iPad, iPad mini
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
                dimensions: [36, 36], // ldpi
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [48, 48], // mdpi
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [72, 72], // hdpi
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [96, 96], // xhdpi
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [144, 144], // xxhdpi
                scale_factor: 1.75,
                mode: "circle",
            },
            {
                dimensions: [192, 192], // xxxhdpi
                scale_factor: 1.75,
                mode: "circle",
            },
        ],
    },
    "notification-icon": {
        "android": [
            {
                dimensions: [18, 18], // ldpi
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [24, 24], // mdpi
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [36, 36], // hdpi
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [48, 48], // xhdpi
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [72, 72], // xxhdpi
                scale_factor: 1,
                mode: "transparent",
            },
            {
                dimensions: [96, 96], // xxxhdpi
                scale_factor: 1,
                mode: "transparent",
            },
        ],
        "ios": [
            {
                dimensions: [60, 60], // iPhone
                scale_factor: 1.5,
                mode: "default",
            },
            {
                dimensions: [40, 40], // iPad Pro, iPad, iPad mini
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
