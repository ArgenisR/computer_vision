// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/vYno-IaQ5/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confianza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.position(
    (windowWidth - video.width) / 2,
    (windowHeight - video.height) / 2
  );
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  text(confianza, 10, height - 4);
  textAlign(LEFT);

  if (label == "tomatodo" && confianza >= 0.9) {
    filter(BLUR);
    filter(POSTERIZE);
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text("TOMA AWA", width / 2, height / 2);
  }
  if (label == "celular" && confianza >= 0.9) {
    fill(0, 255, 0); // Color verde de la matriz
    textSize(40);
    textAlign(CENTER);
    for (let i = 0; i < width; i += 40) {
      let letter = char(0x30a0 + int(random(0, 96))); // Caracteres aleatorios
      text(letter, i, random(height));
    }
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
