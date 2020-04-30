"use strict";
Misha.enemy = true;


function EMY_drawEnemy(enemy)
{
    ctx.save();
    ctx.translate(enemy.x, enemy.y);

    // ctx.strokeStyle = "white";
    // ctx.strokeRect(0, 0, jumper.width, jumper.height);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "darkorange";
    ctx.beginPath();
    ctx.arc(jumper.width / 2, jumper.height / 2, 16, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.lineWidth = 1;

    ctx.restore();
}

function EMY_startset()
{
    for (let i = 0; i < enemys.length; i++)
    {
        const el = enemys[i];
        platforms.push(el);
    }
}

function EMY_gravity()
{
    for (let i = 0; i < enemys.length; i++)
    {
        const el = enemys[i];
        if (el.alive)
        {
            Cgravity(el);
            Cmovement(el);
            EMY_enemyAI(el);
            el.plinks();
        }
    }
}

function EMY_drawEnemys()
{
    for (let i = 0; i < enemys.length; i++)
    {
        const el = enemys[i];
        EMY_drawEnemy(el);
    }
}

function EMY_enemyAI(chr)
{
    if (chr.x == chr.pastX && chr.pastCounter > 60)
    {
        if (chr.direction == "left")
        {
            // CharacterControl(chr, "left", "up");
            CharacterControl(chr, "right", "down");
            chr.pastCounter = 0;
        }
        else if (chr.direction == "right")
        {
            // CharacterControl(chr, "right", "up");
            CharacterControl(chr, "left", "down");
            chr.pastCounter = 0;
        }
        else
        {
            alert("function EMY_enemyAI: charter direction is wrong")
        }
    }
    chr.writePast();
    chr.pastCounter += 1;
}