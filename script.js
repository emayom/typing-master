const timer = document.querySelector(".timer");
const total_score = document.querySelector(".score");
const start_btn = document.querySelector(".start-btn");
const word_input = document.querySelector(".word-input");
const word = document.querySelector(".word-display");


const GAMETIME = 10;
let isPlaying = false;
let words = [];
let time = 10;
let score = 0;

init();

function buttonChange(text) {
    start_btn.innerHTML = text;
};

function getWords() {
    buttonChange("LOADING ...");

    axios.get('https://random-word-api.herokuapp.com//word?number=100')
    .then(function (response) {
      words = response.data.filter((el) => el.length < 10);
      buttonChange("GAME START");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function init() {
    getWords();
}

const handleScore = () => {
    word_input.addEventListener("keydown", (event) => {
        
        //게임 중 일때만 점수를 카운팅할 수 있게 
        if(isPlaying) {
            if(event.keyCode !== 13) {
                return
            }

            (word_input.value === word.innerHTML)? score++ : '';
            total_score.innerHTML = score;
            word_input.value = "";

            //랜덤 문자 변경
            const random = Math.floor(Math.random() * words.length);
            word.innerHTML = words[random];
        }
    });
};

const handleTimer = () => {
    (time>0)? time-- : clearInterval(timeInterval);
    timer.innerHTML = time;   
};

const run = () => {

    isPlaying = true;
    word_input.value = "";
    time = GAMETIME;
    timer.innerHTML = time;   
    //STOP으로 텍스트 변경
    buttonChange("STOP");
    start_btn.classList.add("counting");

    handleScore();
    timeInterval = setInterval(handleTimer, 1000);

    //10초가 끝나면 START로 다시 자동 변경
    setTimeout(()=> {
        isPlaying = false;
        buttonChange("GAME START");
        start_btn.classList.remove("counting");
        isPlaying = false;
    }, 10000);
};

start_btn.addEventListener("click", run);
