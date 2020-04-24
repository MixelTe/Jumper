"use strict";

window.Misha = window.Misha || Object.create(null);
Misha.music = {};
Misha.musics = true;

Misha.music.ost = document.createElement("AUDIO");
Misha.music.ost.src = "sounds/ost.mp3";
Misha.music.ost.autoplay = true;
Misha.music.ost.loop = true;
// Misha.music.ost.controls = true;
document.body.appendChild(Misha.music.ost);
MUS_ost_read();
// Misha.music.ost.onload = function ()
// {
//     // Misha.music.ost.play();
//     Misha.music.ost.load();
// }


function MUS_ost_read()
{
    if (sessionStorage.getItem("ost") != null)
    {
        Misha.music.ost.currentTime = parseInt(sessionStorage.getItem("ost"));
    }
}

function MUS_ost_write()
{
    sessionStorage.setItem("ost", Misha.music.ost.currentTime);
}


Misha.music.button1 = { x: canva.width / 2 - 125, y: canva.height / 2 - 35, width: 250, height: 70, color: "lime", Tcolor: "black", value: "play", Tvalue: "Continue", Tx: 53, Ty: 23, Tscale: 35};
Misha.music.buttons = [Misha.music.button1]
Misha.music.pause = 1;
if (sessionStorage.getItem("music.pause") != null)
{
    Misha.music.pause = parseInt(sessionStorage.getItem("music.pause"));
    sessionStorage.setItem("music.pause", 1);
}


function MUS_drawAll()
{
    if (Misha.music.pause)
    {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, -10, canva.width, canva.height + 10);

        MUS_drawButton(Misha.music.button1)
        ctx.restore();
    }
}

function MUS_drawButton(button)
{
    ctx.save();
    ctx.translate(button.x, button.y);

    ctx.fillStyle = button.color;
    ctx.fillRect(0, 0, button.width, button.height);

    ctx.translate(button.Tx, button.Ty);
    ctx.scale(1, -1);
    ctx.fillStyle = button.Tcolor;
    ctx.font = button.Tscale + "px Arial";
    ctx.fillText(button.Tvalue, 0, 0);

    ctx.restore();
}

canva.addEventListener('click', function (event) { MUS_click(event) })
function MUS_click(event)
{
    let x = event.pageX;
    let y = event.pageY;
    x -= canva.offsetLeft;
    y = Math.abs(y - canva.offsetTop - canva.height);
    let clickButton = null;
    for (let i = 0; i < Misha.music.buttons.length; i++)
    {
        if (
            y > Misha.music.buttons[i].y &&
            y < Misha.music.buttons[i].y + Misha.music.buttons[i].height &&
            x > Misha.music.buttons[i].x &&
            x < Misha.music.buttons[i].x + Misha.music.buttons[i].width)
        {
            clickButton = Misha.music.buttons[i];
        }
    }
    if (clickButton != null)
    {
        switch (clickButton.value)
        {
            case "play":
                Misha.music.pause = 0;
                Misha.music.ost.play();
                break;

            default:
                break;
        }
    }
}