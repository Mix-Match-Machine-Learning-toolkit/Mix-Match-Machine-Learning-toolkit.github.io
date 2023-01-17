let textClassModel;

async function chooseMLmodel(token1, token2) {
    //text classification (100, 109)
    if (token1 == 100 & token2 == 109) {
        loadInteractiveExample("textClassification.html");
        loadTextClassification();
    }
    //image classification (98, 109)
    if (token1 == 98 & token2 == 109) {
        loadInteractiveExample("imageClassification.html");
        // loadImageClassification();
    }
    //image classification (97, 109)
    if (token1 == 97 & token2 == 109) {
        loadInteractiveExample("audioClassification.html");

    }
    //table classification (99, 109)
    if (token1 == 99 & token2 == 109) {
        loadInteractiveExample("tableClassification.html");
    }
    // audio understand (97, 122)
    if (token1 == 97 & token2 == 122) {
        loadInteractiveExample("audioUnderstand.html");

    }

    // audio communicate (97, 113)
    if (token1 == 97 & token2 == 113) {
        loadInteractiveExample("audioCommunicate.html");

    }

}

function loadInteractiveExample(path) {
    console.log(path);
    var xhttpCombi = new XMLHttpRequest();
    xhttpCombi.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("interactiveExample").innerHTML = this.responseText;
            if (path == 'tableClassification.html') {
                document.getElementById("rs-range-line1").addEventListener("input", function () { showSliderValue("rs-range-line1", "rs-bullet1"); }, false);
                document.getElementById("rs-range-line2").addEventListener("input", function () { showSliderValue("rs-range-line2", "rs-bullet2"); }, false);
                document.getElementById("rs-range-line3").addEventListener("input", function () { showSliderValue("rs-range-line3", "rs-bullet3"); }, false);
                document.getElementById("rs-range-line4").addEventListener("input", function () { showSliderValue("rs-range-line4", "rs-bullet4"); }, false);
            }
            if (path == 'audioUnderstand.html') {
                recognizeSpeech();
            }
            if (path=='audioCommunicate.html'){
                textToSpeech();
                // document.getElementById("rate").addEventListener("input", function () { showSliderValue("rate", "rate-bullet"); }, false);
                // document.getElementById("pitch").addEventListener("input", function () { showSliderValue("pitch", "pitch-bullet"); }, false);

            }
        }
    };
    xhttpCombi.open("GET", "/assets/interactiveExamples/" + path, true);
    xhttpCombi.send();

}


//-------------Text classification ---------------------------------------
async function loadTextClassification() {
    const threshold = 0.8
    textClassModel = await toxicity.load(threshold);
    console.log(textClassModel);
}
async function textClassification() {
    // console.log(textClassModel);
    document.getElementById('buttonClassify').innerHTML = 'Classifying';
    let textData = document.getElementById('textToClassify').value;
    console.log(textData);
    var predictions = await textClassModel.classify(textData);
    document.getElementById('buttonClassify').innerHTML = 'Classify'
    document.getElementById('predictions').style.visibility = 'visible';
    console.log(predictions);
    jsonPredictions = JSON.stringify(predictions, null, 2);

    let label = predictions[1].label;
    let probabilityInsult = predictions[1].results[0].probabilities[1];
    let probabilityToxic = predictions[6].results[0].probabilities[1];
    document.getElementById('inputtedText').innerHTML = textData;
    document.getElementById('probInsult').innerHTML = (probabilityInsult * 100).toFixed(2) + '%';
    document.getElementById('probToxicity').innerHTML = (probabilityToxic * 100).toFixed(2) + '%';
}

// --------- Image classification -------------------------------------------
// async function loadImageClassification() {

// }

var loadFile = function (event) {
    var image = document.getElementById('img');
    image.src = URL.createObjectURL(event.target.files[0]);
};

async function classifyImage() {

    document.getElementById('buttonClassify').innerHTML = 'Classifying';
    // Load the model.
    console.log("Loading");
    imageClassModel = await mobilenet.load();
    console.log("Model loaded");
    const imageData = document.getElementById('img');
    var predictions = await imageClassModel.classify(imageData);
    document.getElementById('buttonClassify').innerHTML = 'Classify'
    document.getElementById('predictions').style.visibility = 'visible';
    console.log(predictions);
    document.getElementById('label1').innerHTML = predictions[0].className;
    document.getElementById('prob1').innerHTML = (predictions[0].probability * 100).toFixed(2) + '%';
    document.getElementById('label2').innerHTML = predictions[1].className;
    document.getElementById('prob2').innerHTML = (predictions[1].probability * 100).toFixed(2) + '%';
    document.getElementById('label3').innerHTML = predictions[2].className;
    document.getElementById('prob3').innerHTML = (predictions[2].probability * 100).toFixed(2) + '%';
    console.log(document.getElementById('label2').offsetHeight, document.getElementById('prob2').offsetHeight);

    document.getElementById('prob1').style.height = document.getElementById('label1').offsetHeight + 'px';
    document.getElementById('prob2').style.height = document.getElementById('label2').offsetHeight + 'px';
    document.getElementById('prob3').style.height = document.getElementById('label3').offsetHeight + 'px';
    console.log(document.getElementById('label2').offsetHeight, document.getElementById('prob2').offsetHeight);

}

//--------------Audio classification------------------------------------------------------------------

let recognizer;

function predictWord() {
    // Array of words that the recognizer is trained to recognize.
    const words = recognizer.wordLabels();
    document.getElementById('predictions').style.visibility = 'visible';
    recognizer.listen(({ scores }) => {
        // Turn scores into a list of (score,word) pairs.
        scores = Array.from(scores).map((s, i) => ({ score: s, word: words[i] }));
        // Find the most probable word.
        scores.sort((s1, s2) => s2.score - s1.score);
        document.querySelector('#wordPredicted1').textContent = scores[0].word;
        document.querySelector('#probWord1').textContent = (scores[0].score * 100).toFixed(2) + '%';
        document.querySelector('#wordPredicted2').textContent = scores[1].word;
        document.querySelector('#probWord2').textContent = (scores[1].score * 100).toFixed(2) + '%';
        document.querySelector('#wordPredicted3').textContent = scores[2].word;
        document.querySelector('#probWord3').textContent = (scores[2].score * 100).toFixed(2) + '%';
    }, { probabilityThreshold: 0.0 });
}

async function startListening() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    predictWord();
    document.getElementById("stopListening").style.display = 'inline-block';
    document.getElementById("startListening").style.display = 'none';

}

function stopListening() {
    if (recognizer.isListening()) {

        document.getElementById("startListening").style.display = 'inline-block';
        document.getElementById("stopListening").style.display = 'none';
        document.getElementById("predictions").style.visibility = 'hidden';
        return recognizer.stopListening();

    }
}


//--------------- Penguin classifier (tabular data) ---------------------------

// async function loadPenguinClassifier() {
//     const penguinClasModel = await tf.loadLayersModel('/assets/MLmodels/palmerpenguins/model.json');
//     // console.log(penguinClasModel);
// }

async function classifyPenguins() {
    let bill_length = document.getElementById('rs-range-line1').value;
    let bill_depth = document.getElementById('rs-range-line2').value;
    let flipper_length = document.getElementById('rs-range-line3').value;
    let body_mass = document.getElementById('rs-range-line4').value * 1000;
    // let bill_depth = 15.3;
    // let bill_length = 50.4;
    // let flipper_length = 20;
    // let body_mass = 50;
    let penguinClasses = ['Adelie', 'Gentoo', 'Chinstrap'];


    tf.tidy(() => {
        document.getElementById('buttonClassify').innerHTML = 'Classifying';
        tf.loadLayersModel('/assets/MLmodels/palmerpenguins/model.json').then(model => {
            //scaled features
            let scaled_bill_length = (bill_length - 44.19227468) / 5.261841782685142;
            let scaled_bill_depth = (bill_depth - 17.13690987) / 1.997404512327992;
            let scaled_flipper_length = (flipper_length - 201.40343348) / 13.343284828475145;
            let scaled_body_mass = (body_mass - 4218.24034335) / 795.7032642413537;

            const scaled_features = tf.tensor1d([scaled_bill_length, scaled_bill_depth, scaled_flipper_length, scaled_body_mass]);
            // scaled_features.print()
            const result = model.predict(scaled_features.reshape([1, 4]));
            const { values, indices } = tf.topk(result, 3)
            // Log the results
            values.print();
            const winners = indices.dataSync();
            const prob = values.dataSync();
            // console.log(prob);
            // const label1 = penguinClasses[winners[0]];
            // const prob1 = prob[0];
            // const label2 = penguinClasses[winners[1]];
            // const prob2 = prob[1];
            // const label3 = penguinClasses[winners[2]];
            // const prob3 = prob[2];
            document.getElementById('penguinImage').src = "assets/photos/" + penguinClasses[winners[0]] + '.png'
            document.getElementById('predictions').style.visibility = 'visible';
            document.getElementById('label1').innerHTML = penguinClasses[winners[0]];
            document.getElementById('prob1').innerHTML = (prob[0] * 100).toFixed(2) + '%';
            document.getElementById('label2').innerHTML = penguinClasses[winners[1]];
            document.getElementById('prob2').innerHTML = (prob[1] * 100).toFixed(2) + '%';
            document.getElementById('label3').innerHTML = penguinClasses[winners[2]];
            document.getElementById('prob3').innerHTML = (prob[2] * 100).toFixed(2) + '%';
            console.log(label1, prob1);
            document.getElementById('buttonClassify').innerHTML = 'Classify';
        })
    })
}


function showSliderValue(rS, rB) {
    var rangeSlider = document.getElementById(rS);
    var rangeBullet = document.getElementById(rB);
    rangeBullet.innerHTML = rangeSlider.value;
    var bulletPosition = ((rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min));
    rangeBullet.style.left = (bulletPosition * (200 - 11)) + "px";
}

//----------------- Speech to text (audio understand) -----

function recognizeSpeech() {
    if ("webkitSpeechRecognition" in window) {
        // Initialize webkitSpeechRecognition
        let speechRecognition = new webkitSpeechRecognition();

        // String for the Final Transcript
        let final_transcript = "";

        // Set the properties for the Speech Recognition object
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        // speechRecognition.lang = document.querySelector("#select_dialect").value;
        speechRecognition.lang = 'en-US';

        // Callback Function for the onStart Event
        speechRecognition.onstart = () => {
            // Show the Status Element
            document.querySelector("#status").style.display = "block";
        };
        speechRecognition.onerror = () => {
            // Hide the Status Element
            document.querySelector("#status").style.display = "none";
        };
        speechRecognition.onend = () => {
            // Hide the Status Element
            document.querySelector("#status").style.display = "none";
        };

        speechRecognition.onresult = (event) => {
            // Create the interim transcript string locally because we don't want it to persist like final transcript
            let interim_transcript = "";

            // Loop through the results from the speech recognition object.
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }

            // Set the Final transcript and Interim transcript.
            document.querySelector("#final").innerHTML = final_transcript;
            document.querySelector("#interim").innerHTML = interim_transcript;
        };

        // Set the onClick property of the start button
        document.querySelector("#start").onclick = () => {
            // Start the Speech Recognition
            document.getElementById('stop').style.display = 'inline-block';
            document.getElementById('start').style.display = 'none';
            speechRecognition.start();
            event.preventDefault();

        };


        // Set the onClick property of the stop button
        document.querySelector("#stop").onclick = () => {
            // Stop the Speech Recognition
            speechRecognition.stop();
            event.preventDefault();
            document.getElementById('start').style.display = 'inline-block';
            document.getElementById('stop').style.display = 'none';
        };

        document.querySelector('#clear').onclick = () => {
            document.querySelector("#final").innerHTML = "";
            document.querySelector("#interim").innerHTML = "";
            final_transcript = "";
            interim_transcript = "";
            event.preventDefault();
        }
    } else {
        console.log("Speech Recognition Not Available");
    }
}

//---------- Text to speech (audio communicate) ---------------------
function showSliderValue(rS, rB) {
    var rangeSlider = document.getElementById(rS);
    var rangeBullet = document.getElementById(rB);
    rangeBullet.innerHTML = rangeSlider.value;
    var bulletPosition = ((rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min));
    rangeBullet.style.left = (bulletPosition * (200 - 11)) + "px";
}


//Source https://github.com/mdn/dom-examples/tree/main/web-speech-api/speak-easy-synthesis
function textToSpeech() {
    const synth = window.speechSynthesis;

    const inputForm = document.querySelector("form");
    const inputTxt = document.querySelector(".txt");
    const voiceSelect = document.querySelector("select");

    // const pitch = document.querySelector("#pitch");
    // const pitchValue = document.querySelector(".pitch-value");
    // const rate = document.querySelector("#rate");
    // const rateValue = document.querySelector(".rate-value");
    const rateValue = 1;
    const pitchValue =1;
    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();

            if (aname < bname) {
                return -1;
            } else if (aname == bname) {
                return 0;
            } else {
                return +1;
            }
        });
        const selectedIndex =
            voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
        voiceSelect.innerHTML = "";

        for (let i = 0; i < voices.length; i++) {
            const option = document.createElement("option");
            option.textContent = `${voices[i].name} (${voices[i].lang})`;

            if (voices[i].default) {
                option.textContent += " -- DEFAULT";
            }

            option.setAttribute("data-lang", voices[i].lang);
            option.setAttribute("data-name", voices[i].name);
            voiceSelect.appendChild(option);
        }
        voiceSelect.selectedIndex = selectedIndex;
    }

    populateVoiceList();

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak() {
        if (synth.speaking) {
            console.error("speechSynthesis.speaking");
            return;
        }

        if (inputTxt.value !== "") {
            const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

            utterThis.onend = function (event) {
                console.log("SpeechSynthesisUtterance.onend");
            };

            utterThis.onerror = function (event) {
                console.error("SpeechSynthesisUtterance.onerror");
            };

            const selectedOption =
                voiceSelect.selectedOptions[0].getAttribute("data-name");

            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }
            utterThis.pitch = 1;
            utterThis.rate = 1;
            synth.cancel();
            synth.speak(utterThis);
        }
    }

    inputForm.onsubmit = function (event) {
        event.preventDefault();

        speak();

        inputTxt.blur();
    };

    // pitch.onchange = function () {
    //     pitchValue.textContent = pitch.value;
    // };

    // rate.onchange = function () {
    //     rateValue.textContent = rate.value;
    // };

    // voiceSelect.onchange = function () {
    //     //   speak();
    // };
}