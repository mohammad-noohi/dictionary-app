"use strict";

//------------------------------------------ ELEMENTS------------------------------------------//
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const content = document.querySelector(".content");
const word = document.querySelector(".word");
const audio = document.querySelector("audio");
const audioBtn = document.querySelector(".audio-btn");
const wordType = document.querySelector(".word-type");
const wordPhonetic = document.querySelector(".word-phonetic");
const wordDefinition = document.querySelector(".word-defenition");

//------------------------------------------ FUNCTOINS ------------------------------------------//
function displayWordData() {
  let searchedWord = searchInput.value.trim().toLowerCase();

  // check the world not be empty value
  if (searchedWord) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`)
      .then(resp => resp.json())
      .then(data => {
        const wordData = data[0];

        // insert data in DOM
        word.textContent = wordData.word;
        audio.src = wordData.phonetics[0].audio;
        wordType.textContent = wordData.meanings[0].partOfSpeech;
        wordPhonetic.textContent = wordData.phonetic;
        wordDefinition.textContent = wordData.meanings[0].definitions[0].definition;

        // show the contetn after set content
        content.classList.add("active");
        content.style.height = `${content.scrollHeight}px`;
      })
      .catch(err => {
        Swal.fire({
          title: "Error!",
          text: "Please Enter correct Word(en)",
          icon: "error",
          confirmButtonText: "Ok!",
        });
      });
  } else {
    Swal.fire({
      title: "Please enter something",
      icon: "warning",
    });
  }
}
//------------------------------------------ EVENTS ------------------------------------------//

// automatic focus on search input
window.addEventListener("load", () => {
  searchInput.focus();
});

searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    displayWordData();
  } else if (searchInput.value === "") {
    content.classList.remove("active");
    content.style.height = "0";
  }
});

searchBtn.addEventListener("click", displayWordData);

audioBtn.addEventListener("click", () => {
  audio.play();
});
