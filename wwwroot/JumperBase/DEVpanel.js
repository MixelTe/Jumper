"use strict";
import {DEVparametrs, jumper, canva, WorldAnchor, TheCounter} from "./base.js"
import {VlevelChange, ChangeLevel} from "../start.js"

const canva2 = document.getElementById("canva2");
const ctx2 = canva2.getContext('2d');
let DEVmoveSpeed = 10;
let tolvl = 1;
let toCursor = false;


const btn1 = { x: 80, y: 530, width: 60, height: 60, color: "blue", Tcolor: "yellow", value: "Up", Tvalue: "Up", Tx: 17, Ty: 24, Tscale: 20};
const btn2 = { x: 20, y: 470, width: 60, height: 60, color: "blue", Tcolor: "yellow", value: "Left", Tvalue: "Left", Tx: 12, Ty: 24, Tscale: 20};
const btn3 = { x: 140, y: 470, width: 60, height: 60, color: "blue", Tcolor: "yellow", value: "Right", Tvalue: "Right", Tx: 7, Ty: 24, Tscale: 20};
const btn4 = { x: 80, y: 410, width: 60, height: 60, color: "blue", Tcolor: "yellow", value: "Down", Tvalue: "Down", Tx: 5, Ty: 24, Tscale: 20};
const btn5 = { x: 80, y: 470, width: 60, height: 60, color: "red", Tcolor: "yellow", value: "Gravity", Tvalue: "Gravity", Tx: 1, Ty: 24, Tscale: 18};
const btn6 = { x: 20, y: 410, width: 60, height: 60, color: "green", Tcolor: "yellow", value: "moveSpeed+100", Tvalue: "+100", Tx: 7, Ty: 22, Tscale: 22};
const btn7 = { x: 140, y: 410, width: 60, height: 60, color: "green", Tcolor: "yellow", value: "moveSpeed+1", Tvalue: "+ 1", Tx: 15, Ty: 22, Tscale: 22};
const btn8 = { x: 20, y: 530, width: 60, height: 60, color: "green", Tcolor: "yellow", value: "moveSpeed0", Tvalue: "0", Tx: 22, Ty: 19, Tscale: 30};
const display1 = { x: 140, y: 530, width: 60, height: 60, color: "yellow", Tcolor: "green", value: "moveSpeed", Tvalue: 10, Tx: 10 , Ty: 21, Tscale: 25};

const btn9 = { x: 220, y: 530, width: 60, height: 60, color: "darkblue", Tcolor: "yellow", value: "toCursor", Tvalue: "To cursor", Tx: 1, Ty: 24, Tscale: 14 };

const btn10 = { x: 20, y: 300, width: 60, height: 60, color: "blue", Tcolor: "yellow", value: "tolvl-", Tvalue: "-", Tx: 22, Ty: 17, Tscale: 50};
const display2 = { x: 80, y: 300, width: 60, height: 60, color: "yellow", Tcolor: "green", value: "tolvl", Tvalue: "to lvl 1", Tx: 2, Ty: 23, Tscale: 19};
const btn11 = { x: 140, y: 300, width: 60, height: 60, color: "blue", Tcolor: "yellow", value: "tolvl+", Tvalue: "+", Tx: 19, Ty: 16, Tscale: 40};

const btn12 ={
    x: 20, y: 230, width: 120, height: 60, color: "darkblue", Tcolor: "yellow", value: "SstorageClear",
    Tvalue: "clear", Tx: 3, Ty: 31, Tscale: 20, type: "duble", Tvalue2: "storage", Tx2: 47, Ty2: 18, Tscale2: 20
};

const btn13 = { x: 20, y: 20, width: 60, height: 60, color: "red", Tcolor: "yellow", value: "plID", Tvalue: "ID", Tx: 11, Ty: 16, Tscale: 40 };
const btn14 = { x: 90, y: 20, width: 60, height: 60, color: "red", Tcolor: "yellow", value: "screens", Tvalue: "Scr", Tx: 4, Ty: 16, Tscale: 35 };
const btn15 = { x: 260, y: 7, width: 34, height: 30, color: "lightblue", Tcolor: "yellow", value: "fps", Tvalue: "", Tx: 4, Ty: 16, Tscale: 35, counter: 0 };

const btns = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, display1, btn9, btn10, display2, btn11, btn12, btn13, btn14, btn15]

//===============
ctx2.translate(0, canva.height);
ctx2.scale(1, -1);

DEVredrawAll();
//===============

function DEVredrawAll()
{
    ctx2.fillStyle = "lightgreen";
    ctx2.fillRect(0, 0, canva2.width, canva2.height);

    for (let i = 0; i < btns.length; i++)
    {
        DEVdrawButton(btns[i])
    }
}

function DEVdrawButton(btn)
{
    ctx2.save();
    ctx2.translate(btn.x, btn.y);

    ctx2.fillStyle = btn.color;
    ctx2.fillRect(0, 0, btn.width, btn.height);

    switch (btn.type)
    {
        case "duble":

            ctx2.save();
            ctx2.translate(btn.Tx, btn.Ty);
            ctx2.scale(1, -1);
            ctx2.fillStyle = btn.Tcolor;
            ctx2.font = btn.Tscale + "px Arial";
            ctx2.fillText(btn.Tvalue, 0, 0);
            ctx2.restore();

            ctx2.save();
            ctx2.translate(btn.Tx2, btn.Ty2);
            ctx2.scale(1, -1);
            ctx2.fillStyle = btn.Tcolor;
            ctx2.font = btn.Tscale2 + "px Arial";
            ctx2.fillText(btn.Tvalue2, 0, 0);
            ctx2.restore();
            break;

        default:
            ctx2.save();
            ctx2.translate(btn.Tx, btn.Ty);
            ctx2.scale(1, -1);
            ctx2.fillStyle = btn.Tcolor;
            ctx2.font = btn.Tscale + "px Arial";
            ctx2.fillText(btn.Tvalue, 0, 0);
            ctx2.restore();
            break;
    }
    ctx2.restore();
}

canva2.addEventListener('click', function (event) { DEVclick(event) })
canva.addEventListener('click', function (event) { DEVclick2(event) })
function DEVclick(event)
{
    let x = event.pageX;
    let y = event.pageY;
    x -= canva2.offsetLeft;
    y = Math.abs(y - canva2.offsetTop - canva2.height);
    let clickButton = null;
    for (let i = 0; i < btns.length; i++)
    {
        if (
            y > btns[i].y &&
            y < btns[i].y + btns[i].height &&
            x > btns[i].x &&
            x < btns[i].x + btns[i].width)
        {
            clickButton = btns[i];
        }
    }
    switch (clickButton.value) {
        case "Up":
            jumper.y += DEVmoveSpeed;
            break;

        case "Right":
            jumper.x += DEVmoveSpeed;
            break;

        case "Left":
            jumper.x -= DEVmoveSpeed;
            break;

        case "Down":
            jumper.y -= DEVmoveSpeed;
            break;

        case "Gravity":
            if (DEVparametrs.gravity)
            {
                DEVparametrs.gravity = false;
                clickButton.color = "rgb(141, 0, 207)";
            }
            else
            {
                DEVparametrs.gravity = true;
                clickButton.color = "red";
            }
            DEVredrawAll();
            break;

        case "moveSpeed+100":
            DEVmoveSpeed += 100;
            display1.Tvalue += 100
            DEVredrawAll();
            break;

        case "moveSpeed+1":
            DEVmoveSpeed += 1;
            display1.Tvalue += 1
            DEVredrawAll();
            break;

        case "moveSpeed0":
            DEVmoveSpeed = 0;
            display1.Tvalue = 0
            DEVredrawAll();
            break;

        case "moveSpeed":
            alert("DEVmoveSpeed = " + DEVmoveSpeed)
            break;

        case "toCursor":
            toCursor = true;
            clickButton.color = "rgb(141, 0, 207)";
            DEVredrawAll();
            break;

        case "tolvl-":
            tolvl -= 1;
            display2.Tvalue = "to lvl " + tolvl;
            DEVredrawAll();
            break;

        case "tolvl":
            // sessionStorage.setItem("level", tolvl);
            // window.location.reload();
            VlevelChange(tolvl);
            break;

        case "tolvl+":
            tolvl += 1;
            display2.Tvalue = "to lvl " + tolvl;
            DEVredrawAll();
            break;

         case "SstorageClear":
            sessionStorage.clear();
            break;

        case "plID":
            if (DEVparametrs.id)
            {
                DEVparametrs.id = false;
                clickButton.color = "red";
            }
            else
            {
                DEVparametrs.id = true;
                clickButton.color = "rgb(141, 0, 207)";
            }
            DEVredrawAll();
            break;

        case "screens":
            if (DEVparametrs.screens)
            {
                DEVparametrs.screens = false;
                clickButton.color = "red";
            }
            else
            {
                DEVparametrs.screens = true;
                clickButton.color = "rgb(141, 0, 207)";
            }
            DEVredrawAll();
            break;

        case "fps":
            if (clickButton.active)
            {
                clickButton.active = false;
                clickButton.color = "lightblue";
            }
            else
            {
                clickButton.active = true;
                clickButton.color = "rgba(141, 0, 207, 0.6)";
            }
            DEVinterFrame();
            DEVredrawAll();
            break;

        default:
            break;
    }
}

function DEVclick2(event)
{
    if (toCursor == true)
    {
        btn9.color = "darkblue";
        toCursor = false;
        jumper.x = event.pageX - canva.offsetLeft - 15 - WorldAnchor.x;
        jumper.y = Math.abs(event.pageY - canva.offsetTop - canva.height) - 25 - WorldAnchor.y;
        DEVredrawAll();
    }
}

function DEVinterFrame()
{
    if (btn15.counter >= 10)
    {
        DEVdrawButton(btn15);
        ctx2.save();
        ctx2.translate(260, 10);
        ctx2.scale(1, -1)
        ctx2.fillStyle = "black";
        ctx2.font = "30px Arial";
        ctx2.fillText(parseInt(1000 / parseInt(TheCounter.interFrame)), 0, 0);
        ctx2.restore();
        btn15.counter = 0;
    }
    btn15.counter += 1;
    if (btn15.active)
    {
        requestAnimationFrame(DEVinterFrame);
    }
    else
    {
        DEVredrawAll();
    }
}
