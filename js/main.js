const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");
const speak = document.querySelector("p.speak");
const chat = document.querySelector(".chat");
var player = document.querySelector(".player");
var fillbar = document.querySelector(".fill");
var currentTime = document.querySelector(".time");

var audio = new Audio();
var song = [];

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();
recorder.lang = "fr";

function addHumanText(text) {
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");
  chatContainer.classList.add("light");
  const chatBox = document.createElement("p");
  chatBox.classList.add("voice2text");
  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);
  chatContainer.appendChild(chatBox);
  return chatContainer;
}

function addBotText(text) {
  const chatContainer1 = document.createElement("div");
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("dark");
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

function botVoice(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = "Je ne comprends pas.";

  if (message.includes("Bonjour") || message.includes("salut")) {
    speech.text = "Bonjour, comment ça va?";
  }

  if (message.includes("bien") || message.includes("je vais bien")) {
    speech.text =
      "Je suis content pour vous. Vous voulez écouter la musique aujourd'hui?";
  }

  if (message.includes("j'ai mal") || message.includes("mal")) {
    speech.text = "Je suis désolé. Peut-être une chanson vous faira plaisir? ";
  }

  if (
    message.includes("je veux écouter la musique") ||
    message.includes("je veux une chanson")
  ) {
    speech.text = "vous voulez écouter Edith Piaf ou Charles Aznavour?";
  }

  if (message.includes("Édith Piaf")) {
    speech.text = "Voilà Édith Piaf";
    player.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/JKPvx38D4GM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    /*  var audio = new Audio(
      "../chansons/08EdithPiaf-NonJeNeRegretteRien-1960.mp3"
    );
    audio.play(); */
    chat.classList.add("display");
    console.log("ça marche");
  }

  if (message.includes("Charles Aznavour")) {
    speech.text = "Voilà Charles Aznavour";
    player.innerHTML = `<h1>Charles Aznavour</h1>
    <h2>Emmenez-moi</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/h6a3oEs-wJc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    /*  var audio = new Audio(
      "../chansons/08EdithPiaf-NonJeNeRegretteRien-1960.mp3"
    );
    audio.play(); */
    chat.classList.add("display");
    console.log("ça marche");
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  var element = document.querySelector(".chat");
  element.appendChild(addBotText(speech.text));
}

recorder.onstart = () => {
  console.log("Voice activated");
};

recorder.onresult = (event) => {
  const resultIndex = event.resultIndex;
  const transcript = event.results[resultIndex][0].transcript;
  var element = document.querySelector(".chat");
  element.appendChild(addHumanText(transcript));
  botVoice(transcript);
};

voice.addEventListener("click", () => {
  recorder.start();
  speak.classList.remove("display");
});
