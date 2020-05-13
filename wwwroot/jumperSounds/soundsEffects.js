import { fileLoaded } from "../JumperBase/loading.js";
import { random_num } from "../JumperBase/Functions.js";
window.Misha = window.Misha || Object.create(null);
Misha.soundsEffect = true;

const sounds = {};

sounds.going = {};
sounds.going.files = [];
sounds.going.now = false;

sounds.jumping = {};
sounds.jumping.files = [];
sounds.jumping.now = false;

sounds.hit = {};
sounds.hit.files = [];
sounds.hit.now = false;

export function loadFiles()
{
    sounds.going.files[0] = document.createElement("AUDIO");
    sounds.going.files[0].src = "sounds/jumper/going.mp3";
    sounds.going.files[0].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.jumping.files[0] = document.createElement("AUDIO");
    sounds.jumping.files[0].src = "sounds/jumper/jumping.mp3";
    sounds.jumping.files[0].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.jumping.files[1] = document.createElement("AUDIO");
    sounds.jumping.files[1].src = "sounds/jumper/jumping2.mp3";
    sounds.jumping.files[1].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[0] = document.createElement("AUDIO");
    sounds.hit.files[0].src = "sounds/jumper/hit.mp3";
    sounds.hit.files[0].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[1] = document.createElement("AUDIO");
    sounds.hit.files[1].src = "sounds/jumper/hit2.mp3";
    sounds.hit.files[1].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[2] = document.createElement("AUDIO");
    sounds.hit.files[2].src = "sounds/jumper/hit3.mp3";
    sounds.hit.files[2].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[3] = document.createElement("AUDIO");
    sounds.hit.files[3].src = "sounds/jumper/hit4.mp3";
    sounds.hit.files[3].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[4] = document.createElement("AUDIO");
    sounds.hit.files[4].src = "sounds/jumper/hit5.mp3";
    sounds.hit.files[4].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[5] = document.createElement("AUDIO");
    sounds.hit.files[5].src = "sounds/jumper/hit6.mp3";
    sounds.hit.files[5].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[6] = document.createElement("AUDIO");
    sounds.hit.files[6].src = "sounds/jumper/hitdown.mp3";
    sounds.hit.files[6].volume = 0.4;
    sounds.hit.files[6].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[7] = document.createElement("AUDIO");
    sounds.hit.files[7].src = "sounds/jumper/hitdown2.mp3";
    sounds.hit.files[7].volume = 0.4;
    sounds.hit.files[7].onloadeddata = function ()
    {
        fileLoaded();
    }

    sounds.hit.files[8] = document.createElement("AUDIO");
    sounds.hit.files[8].src = "sounds/jumper/hitdown3.mp3";
    sounds.hit.files[8].volume = 0.4;
    sounds.hit.files[8].onloadeddata = function ()
    {
        fileLoaded();
    }

}

export function characterSounds(chr)
{
    switch (chr.state) {
        case "going":
            if (sounds.going.now == false)
            {
                sounds.going.files[0].currentTime = 0;
            }
            sounds.going.files[0].play();
            sounds.going.now = true;
            characterSounds_default("going");
            break;

        case "jumping":
            if (sounds.jumping.now == false)
            {
                const r = random_num(0, 2);
                console.log(r);
                sounds.jumping.files[r].play();
                sounds.jumping.now = true;
            }
            characterSounds_default("jumping");
            break;

        default:
            characterSounds_default();
            break;
    }
    if (chr.sound_up)
    {
        if (!chr.snowding)
        {
            // ding2.currentTime = 0;
            // ding2.play();
            chr.snowding = true;
        }
        chr.sound_up = false;
    }
    else if (chr.sound_side)
    {
        if (!chr.snowbum)
        {
            sounds.hit.files[random_num(0, 6)].play()
                .catch(e =>
                {
                    if (e.name != 'NotAllowedError')
                    {
                        console.error(e);
                    }
                });
                chr.snowbum = true;
        }
        chr.sound_side = false;
    }
    else
    {
        chr.snowding = false;
        chr.snowbum  = false;
    }

    if (chr.statePast != chr.state)
    {
        if (chr.statePast == "falling" && !isPlayingNow(sounds.hit.files))
        {
            sounds.hit.files[random_num(6, 9)].play();
        }
    }

}

function characterSounds_default(exclude)
{
    switch (exclude) {
        case "going":
            sounds.jumping.now = false;
            break;

        case "jumping":
            sounds.going.now = false;
            sounds.going.files[0].pause();
            break;

        default:
            sounds.going.now = false;
            sounds.going.files[0].pause();
            sounds.jumping.now = false;
            break;
    }

}

function isPlayingNow(list)
{
    for (let i = 0; i < list.length; i++) {
        const el = list[i];
        if (!el.ended && el.currentTime > 0)
        {
            return true
        }
    }
}