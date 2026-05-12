fetch('word.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomWord = data[randomIndex];
        console.log(`Random word: ${randomWord.word}, Hint: ${randomWord.hint}`);
        if (!randomWord) {
            console.log("Word list is empty.");
        } else {
            hangmanCr(randomWord)
        }
    })
    .catch(error => {
        console.error('Error fetching word list:', error);
    });

function hangmanCr(data) {
    console.log(data)
    function createWordList() {
        for (let i = 0; i < data.word.length; i++) {
            const letterW = document.createElement('li'); // create _ 
            letterW.textContent = '_';
            letterW.id = `answer`;
            document.querySelector("#ul").append(letterW);
        }
    }
    function handleLetterGuess() {
        const letter = document.querySelectorAll('#letterK');
        if (letter) {
            letter.forEach(e => {
                e.addEventListener('click', () => {
                    findIndexOfletter(e)
                    falseLetter(e);
                    e.style.color = "rgb(132, 132, 141)"
                    e.style.backgroundColor = "rgb(59, 59, 61)"

                })
            });
        }
        else {
            console.log("Button not found");
        }
    }
    function findIndexOfletter(e) {
        const str = data.word,
            letter = e.innerText;

        const indexes = [];
        if (str.indexOf(letter) !== -1) {
            for (let i = 0; i < str.length; i++) {
                if (str[i] == letter) {
                    indexes.push(i);
                    guessedLetter(indexes, e)
                    e.disabled = true;
                }
            }
        }
    }
    let c = 0
    function guessedLetter(indexes, e) {
        const answer = document.querySelectorAll('#ul li');
        let correctGuesses = 0;

        indexes.forEach(index => {
            if (answer[index].textContent === "_") {
                answer[index].textContent = e.innerText;
                correctGuesses++;
            }
        });

        if (correctGuesses > 0) {
            c += correctGuesses;
            console.log(`Угадано букв: ${c}`);
        }

        if (c === data.word.length) {
            showWinModal();
        }
    }

    let attempt = 6;
    const hangmanImages = [
        "imgs/default-stage.png",
        "imgs/1.png",
        "imgs/2.png",
        "imgs/3.png",
        "imgs/4.png",
        "imgs/5.png",
        "imgs/6.png"
    ];
    function falseLetter(e) {
        const attemptsLeft = document.querySelector('#attempts-left');
        const hangmanImage = document.querySelector('.hangman-img img');

        if (!hangmanImage) {
            console.error("Hangman image not found!");
        }

        const str = data.word;

        if (str.indexOf(e.innerText) === -1) {
            console.log("Incorrect letter");
            e.disabled = true;
            attempt--;

            attemptsLeft.textContent = `Attempts left: ${attempt}`;

            hangmanImage.src = hangmanImages[6 - attempt];

            if (attempt === 0) {
                   const modal = document.querySelector(".modal-dn");

                modal.style.display = "block";

                restartGame()
            }
        }
    }

    function showWinModal() {
        const modal = document.querySelector(".modal-dn"),
            modalp = document.querySelector(".modal-p"),
            modalMessage = document.querySelector("#modal-message"),
            modalButton = document.querySelector("#modal-button");


        modalp.textContent = "you won :)"
        modal.style.display = "block";
        modalMessage.textContent = `congrutulations , you win: ${data.word}`;
        modalButton.addEventListener("click", () => {
            location.reload();
        });
    }

    function restartGame() {
        const restartBtn = document.querySelector("#modal-button")
        restartBtn.addEventListener("click", () => {
            location.reload();
        });
    }
    document.querySelector("body").innerHTML = ""
    const container = document.createElement("div");
    container.className = "hangaman";
    container.id = "hangaman"
    container.innerHTML = `
    <div class="container">
        <div class="hangman-img">
                <img id="hangman-imgs" src="imgs/defoult-stage.png" alt="Hangman">
                <h1>HANGMAN GAME</h1>
            </div>
            <div class="modal-dn">
            <div class="modal-bg">
            <div class="modal">
            <p class="modal-p" >you lose :(</p>
                <p id="modal-message">your word was: ${data.word} </p>
            <div class="modal-content">
                <button id="modal-button">RESTART</button>
            </div>
            </div>
            </div>
        </div>
            <div class="hangman-info">
                <div class="quation">
                    <p id="equation">Hint: ${data.hint}</p>
                </div>
                <ul id="ul">
                </ul>
                <p id="attempts-left">Attempts left: 6</p>
                <div class="keybord">
                    <button id="letterK">a</button>
                    <button  id="letterK">b</button>
                    <button  id="letterK">c</button>
                    <button  id="letterK">d</button>
                    <button  id="letterK">e</button>
                    <button  id="letterK">f</button>
                    <button  id="letterK">g</button>
                    <button  id="letterK">h</button>
                    <button  id="letterK">i</button>
                    <button  id="letterK">j</button>
                    <button  id="letterK">k</button>
                    <button  id="letterK">l</button>
                    <button  id="letterK">m</button>
                    <button  id="letterK">n</button>
                    <button  id="letterK">o</button>
                    <button  id="letterK">p</button>
                    <button  id="letterK">q</button>
                    <button  id="letterK">r</button>
                    <button  id="letterK">s</button>
                    <button  id="letterK">t</button>
                    <button  id="letterK">u</button>
                    <button  id="letterK">v</button>
                    <button  id="letterK">w</button>
                    <button  id="letterK">x</button>
                    <button  id="letterK">y</button>
                    <button  id="letterK">z</button>
                </div>
            </div>
    </div>

    `

    document.querySelector("body").append(container);
    createWordList()
    handleLetterGuess()
}

