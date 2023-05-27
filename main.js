Mera_Yaar="";
Jugnu_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Mera_Yaar = "";
song_Jugnu = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Mera_Yaar = loadSound("Mera Yaar.mp3");
    Jugnu_song = loadSound("Jugnu.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Mera_Yaar = Mera_Yaar.isPlaying();
    console.log(song_Mera_Yaar);

    song_Jugnu = Jugnu_song.isPlaying();
    console.log(song_Jugnu);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Jugnu_song.stop();
        if(song_Mera_Yaar == false){
            Mera_Yaar.play();
        }
        else{
            console.log("Song Name: Mera Yaar by Dhvani Banushali");
            document.getElementById("song_id").innerHTML = "Song Name: Mera Yaar by Dhvani Banushali";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Mera_Yaar.stop();
        if(song_Jugnu == false){
            Jugnu_song.play();
        }
        else{
            console.log("Song Name: Jugnu by Badshah");
            document.getElementById("song_id").innerHTML = "Song Name: Jugnu by Badshah";
        }
    }
}

function modelLoaded(){
    console.log("Pose has loaded");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}