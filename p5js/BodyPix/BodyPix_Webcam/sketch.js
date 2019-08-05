let bodypix;
let video;
let segmentation;
let img;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5 
    palette: {
        "leftFace": {
            "id": 0,
            "color": [110, 64, 170]
        },
        "rightFace": {
            "id": 1,
            "color": [106, 72, 183]
        },
        "rightUpperLegFront": {
            "id": 2,
            "color": [100, 81, 196]
        },
        "rightLowerLegBack": {
            "id": 3,
            "color": [92, 91, 206]
        },
        "rightUpperLegBack": {
            "id": 4,
            "color": [84, 101, 214]
        },
        "leftLowerLegFront": {
            "id": 5,
            "color": [75, 113, 221]
        },
        "leftUpperLegFront": {
            "id": 6,
            "color": [66, 125, 224]
        },
        "leftUpperLegBack": {
            "id": 7,
            "color": [56, 138, 226]
        },
        "leftLowerLegBack": {
            "id": 8,
            "color": [48, 150, 224]
        },
        "rightFeet": {
            "id": 9,
            "color": [40, 163, 220]
        },
        "rightLowerLegFront": {
            "id": 10,
            "color": [33, 176, 214]
        },
        "leftFeet": {
            "id": 11,
            "color": [29, 188, 205]
        },
        "torsoFront": {
            "id": 12,
            "color": [26, 199, 194]
        },
        "torsoBack": {
            "id": 13,
            "color": [26, 210, 182]
        },
        "rightUpperArmFront": {
            "id": 14,
            "color": [28, 219, 169]
        },
        "rightUpperArmBack": {
            "id": 15,
            "color": [33, 227, 155]
        },
        "rightLowerArmBack": {
            "id": 16,
            "color": [41, 234, 141]
        },
        "leftLowerArmFront": {
            "id": 17,
            "color": [51, 240, 128]
        },
        "leftUpperArmFront": {
            "id": 18,
            "color": [64, 243, 116]
        },
        "leftUpperArmBack": {
            "id": 19,
            "color": [79, 246, 105]
        },
        "leftLowerArmBack": {
            "id": 20,
            "color": [96, 247, 97]
        },
        "rightHand": {
            "id": 21,
            "color": [115, 246, 91]
        },
        "rightLowerArmFront": {
            "id": 22,
            "color": [134, 245, 88]
        },
        "leftHand": {
            "id": 23,
            "color": [155, 243, 88]
        }
    }
}

function setup() {
    createCanvas(320, 240);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas

    bodypix = ml5.bodyPix(video, options, modelReady)
}

function modelReady() {
    console.log('ready!')
    bodypix.segment(gotResults, options)
    // bodypix.segmentWithParts(gotResults, options)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result);
    segmentation = result;

    background(0);
    image(video, 0, 0, width, height)
    image(segmentation.maskBackground, 0, 0, width, height)
    // image(segmentation.bodyParts, 0, 0, width, height)

    bodypix.segment(gotResults, options)

}