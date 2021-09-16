song = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("LeftWrist score is " + scoreLeftWrist + " and RightWrist score is " + scoreRightWrist);
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;

        console.log("RightWrist X = " + rightWristX + " , the RightWrist Y = " + rightWristY);

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;

        console.log("The LeftWrist X = " + leftWristX + " , LeftWrist Y = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#0cf0e4");
    stroke("#0cf0e4");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        InNumberLeftWristY = Number(leftWristY);
        removeDecimalLeftWristY = floor(InNumberLeftWristY);
        volume = removeDecimalLeftWristY / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 20)
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }
}

function preload() {
    song = loadSound("music1.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}