"use strict";

export const utilsService = {
    storeToStorage,
    loadFromStorage,
    getRandomInt,
    getRandomId,
    getMapRandomId,
    getLoremIpsum
};

function storeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value || null));
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
}

function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

function getMapRandomId() {
    var pt2 = getRandomInt(1000, 9999).toString(16);
    return `${pt2}`.toUpperCase();
}

function getRandomInt(num1, num2) {
    var max = num1 >= num2 ? num1 + 1 : num2 + 1;
    var min = num1 <= num2 ? num1 : num2;
    return Math.floor(Math.random() * (max - min)) + min;
}

function getLoremIpsum(wordsCount) {
    var loremIpsom = ""

    for (let i = 0; i < wordsCount; i++) {
        loremIpsom += getWord()
    }
    console.log(loremIpsom)
    return loremIpsom
}

function getWord() {
    var alphabet = 'zxcvbnmasdfghjklqwertyuiop'
    var wordLength = getRandomInt(3, 6)
    var word = ''
    for (var i = 0; i < wordLength; i++) {
        word += alphabet.charAt(getRandomInt(0, 26))
    }
    return word
}