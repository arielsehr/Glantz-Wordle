document.addEventListener("DOMContentLoaded", () => {
    createSquares();
  
    let guessedWords = [[]];
    let availableSpace = 1;
  
    let word = 'glantz';
    let guessedWordCount = 0;
  
    const keys = document.querySelectorAll(".keyboard-row button");

  
    function getCurrentWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords - 1];
    }
  
    function updateGuessedWords(letter) {
      const currentWordArr = getCurrentWordArr();
  
      if (currentWordArr && currentWordArr.length < 6) {
        currentWordArr.push(letter);
  
        const availableSpaceEl = document.getElementById(String(availableSpace));
  
        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = letter;

        console.log(currentWordArr);
      }
    }
  
    function getTileColor(letter, index) {
      const isCorrectLetter = word.includes(letter);

      let checkdouble = currentWordArr.join();

      console.log(checkdouble);

      const isDoubledUp = checkdouble.includes(letter);

      if (isDoubledUp) {
        return "rgb(58, 58, 60)";
      }
  
      if (!isCorrectLetter) {
        return "rgb(58, 58, 60)";
      }


  
      const letterInThatPosition = word.charAt(index);
      const isCorrectPosition = letter === letterInThatPosition;
  
      if (isCorrectPosition) {
        return "rgb(83, 141, 78)";
      }
  
      return "rgb(181, 159, 59)";
    }
  
    function handleSubmitWord() {
      const currentWordArr = getCurrentWordArr();
      if (currentWordArr.length !== 6) {
        window.alert("Word must be 6 letters");
        return;
      }
  
      const currentWord = currentWordArr.join("");
  
      fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentWord}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": '37de72842fmsh221a2c2a663db58p18cdb7jsne7b1aafac6d3',
        },
      })
        .then((res) => {
          if (!res.ok && currentWord !== 'glantz') {
            throw Error();
          }
  
          const firstLetterId = guessedWordCount * 6 + 1;
          const interval = 200;
          currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
              const tileColor = getTileColor(letter, index);
  
              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
          });
  
          guessedWordCount += 1;
  
          if (currentWord === word) {
            window.alert("you got it! nice work!");
            exit;

          }
  
          if (guessedWords.length === 6 && currentWord != word) {
            window.alert("sorry! try again!");
          }
  
          guessedWords.push([]);
        })
        .catch(() => {
          if (currentWord !== 'glantz') {
            window.alert("hey, that's not a word!");
          }
        });
    }
  
    function createSquares() {
      const gameBoard = document.getElementById("board");
  
      for (let index = 0; index < 36; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
      }
    }
  
    function handleDeleteLetter() {
      const currentWordArr = getCurrentWordArr();

      if(currentWordArr.length >= 1) {
      
      const removedLetter = currentWordArr.pop();
  
      guessedWords[guessedWords.length - 1] = currentWordArr;
  
      const lastLetterEl = document.getElementById(String(availableSpace - 1));
  
      lastLetterEl.textContent = "";
      availableSpace = availableSpace - 1;
      }
    }
  
    function logKey(e) {
        const alpha = e.code;

        if (alpha === 'Enter') {
            handleSubmitWord()
            return;
        }
        if(alpha === 'Backspace') {
            handleDeleteLetter();
            return;
        }

        if (alpha.slice(0, 3) === "Key") {
            const part = alpha.slice(3,);
            const part2 = part.toLowerCase();
            updateGuessedWords(part2);
        }
       };

    
    for (let i = 0; i < keys.length; i++) {

    document.addEventListener('keydown', logKey);

    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
  
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }
  
      if (letter === "del") {
        handleDeleteLetter();
        return;
      }
  
      updateGuessedWords(letter);
    }
    
      ;
    }
  });