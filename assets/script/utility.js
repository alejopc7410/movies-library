'use strict'

function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

function onEvent(selector, event, callback) {
    return selector.addEventListener(event, callback);
}

function modifyWords(sentence) {
    let words = sentence.split(' ');
    words = words.map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1);
    });
    return words.join(' ');
}

export {select, selectAll, onEvent, modifyWords}