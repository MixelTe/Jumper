"use strict";


function drawEnemy(enemy)
{
    ctx.save();
    ctx.translate(enemy.x, enemy.y);

    // ctx.strokeStyle = "white";
    // ctx.strokeRect(0, 0, jumper.width, jumper.height);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(jumper.width / 2, jumper.height / 2, 16, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.lineWidth = 1;

    ctx.restore();
}
