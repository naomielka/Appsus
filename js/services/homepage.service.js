'use strict'
export const homepageService = {
    getCreators,
}

var gCreators = [{
    img: '../img/naomis-pic.jpg',
    name: 'Naomi Elkayam',
    about: '21 years old, from Tel Aviv.',
    instagramLink: 'https://www.instagram.com/naomielka/?hl=en',
    facebookLink: 'https://www.facebook.com/naomi.elkayam/',
    githubLink: 'https://github.com/naomielka'
}]

function getCreators() {
    return gCreators
}