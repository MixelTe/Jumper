import { rectIntersect } from "./Functions.js";
import { fileLoaded } from "./loading.js";
import { change_ost_volume, get_ost_volume } from "./music.js";

const sounds = {};
sounds.shieldActivation = document.createElement("AUDIO");
sounds.shieldActivation.src = "sounds/jumper/shieldActivation.mp3";
sounds.shieldActivation.onloadeddata = function ()
{
    fileLoaded();
}

sounds.immortal = document.createElement("AUDIO");
sounds.immortal.src = "sounds/jumper/immortal.mp3";
sounds.immortal.volume = 0;
sounds.immortal.loop = true;
sounds.immortal.onloadeddata = function ()
{
    fileLoaded();
}

const Vlife = { x: 685, y: 5, width: 90, height: 90, count: 4};
export function get_Vlife()
{
    return {x: Vlife.x, y: Vlife.y, width: Vlife.width, height: Vlife.height, count: Vlife.count}
}

export function lifeSystem(chr, enemys)
{
    if (!chr.immortal.active)
    {
        const newChr = { x: chr.x - 2, y: chr.y - 2, width: chr.width + 4, height: chr.height + 4 };
        for (let i = 0; i < enemys.length; i++)
        {
            const el = enemys[i];
            if (rectIntersect(newChr, el))
            {
                Vlife.count = Math.max(Vlife.count - 1, 0);
                chr.immortal.active = true;
                chr.immortal.activTime = 0;
                if (el.x > chr.x)
                {
                    el.moveSpeed = 20;
                }
                else
                {
                    el.moveSpeed = -20;
                }
                sounds.shieldActivation.currentTime = 0;
                sounds.shieldActivation.play();
                sounds.immortal.currentTime = 0;
                sounds.immortal.play();
            }
        }

        sounds.immortal.volume = Math.max(sounds.immortal.volume - 0.02, 0);  // volume change
        change_ost_volume(Math.min(get_ost_volume() + 0.01, 0.5));
    }
    if (chr.immortal.active)
    {
        if (chr.immortal.activTime != -1)
        {
            chr.immortal.activTime += 1;
            if (chr.immortal.activTime > 180)
            {
                chr.immortal.active = false;
            }
        }

        sounds.immortal.volume = Math.min(sounds.immortal.volume + 0.005, 0.6);  // volume change
        change_ost_volume(Math.max(get_ost_volume() - 1, 0.001));
    }
    if (sounds.immortal.volume == 0)
    {
        sounds.immortal.pause();
    }
}