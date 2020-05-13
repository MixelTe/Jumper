import { fileLoaded } from "../JumperBase/loading.js";

window.Misha = window.Misha || Object.create(null);
Misha.soundsEffect = true;

const sounds = {};

sounds.portal = {};
sounds.portal.files = [];
sounds.portal.now = false;

export function loadFiles()
{
    sounds.portal.files[0] = document.createElement("AUDIO");
    sounds.portal.files[0].src = "sounds/portal.mp3";
    sounds.portal.files[0].onloadeddata = function ()
    {
        fileLoaded();
    }
}

export function platformsSounds(plts, lvlEnd, chr)
{
    const distance = lvlEnd.x - chr.x;
    if (distance < 300 && distance > 0)
    {
        sounds.portal.files[0].play();
        sounds.portal.files[0].volume = (300 - distance) / 300;
    }
    else if (distance > -300 && distance < 0)
    {
        sounds.portal.files[0].play();
        sounds.portal.files[0].volume = (300 + distance) / 300;
    }
    else
    {
        sounds.portal.files[0].pause();
    }
}