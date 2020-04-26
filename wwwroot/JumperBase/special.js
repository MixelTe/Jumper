"use strict";
let UnDfun = 0;
let UnDfunb = 0;


function SPL_UnD()
{
    if (UnDfunb % 2 == 1)
    {
        switch (UnDfun % 100)
        {
            case 10:
                ctx.translate(0, canva.height - 20);
                ctx.scale(1, -1);
                break;

            case 60:
                ctx.translate(0, canva.height - 20);
                ctx.scale(1, -1);
                break;

            default:
                break;
        }
        UnDfun += 1;
    }
}

function SPL_cord_write(lvl)
{
    sessionStorage.setItem("Anc.x" + lvl, WorldAnchor.x);
    sessionStorage.setItem("Anc.y" + lvl, WorldAnchor.y);

    sessionStorage.setItem("jmp.x" + lvl, jumper.x);
    sessionStorage.setItem("jmp.y" + lvl, jumper.y);

    sessionStorage.setItem("coins", coins.value);

    for (let i = 0; i < platforms.length; i++)
    {
        if (platforms[i].type == "breakable")
        {
            sessionStorage.setItem("breakable" + platforms[i].id, platforms[i].visible);
        }
    }

    SPL_lvl_write(lvl);

    if (Misha.grafics)
    {
        GRC_SPL_direction_write();
    }

    if (Misha.musics)
    {
        MUS_ost_write();
    }
}

function SPL_cord_read(lvl)
{
    if (
        sessionStorage.getItem("Anc.x" + lvl) != null &&
        sessionStorage.getItem("Anc.y" + lvl) != null &&
        sessionStorage.getItem("jmp.x" + lvl) != null &&
        sessionStorage.getItem("jmp.y" + lvl) != null)
    {
        WorldAnchor.x = parseInt(sessionStorage.getItem("Anc.x" + lvl));
        WorldAnchor.y = parseInt(sessionStorage.getItem("Anc.y" + lvl));

        jumper.x = parseInt(sessionStorage.getItem("jmp.x" + lvl));
        jumper.y = parseInt(sessionStorage.getItem("jmp.y" + lvl));
    }
    for (let i = 0; i < platforms.length; i++)
    {
        if (
            platforms[i].type == "breakable" &&
            sessionStorage.getItem("breakable" + platforms[i].id) != null)
        {
            platforms[i].visible = sessionStorage.getItem("breakable" + platforms[i].id);
        }
    }

    SPL_lvl_read(lvl);

    if (Misha.grafics)
    {
        GRC_SPL_direction_read();
    }
}

function SPL_lvl_end()
{
    drawPlatform(lvlend);
    let nowlvl = parseInt(sessionStorage.getItem("level"))
    if (rectIntersect(lvlend, jumper) && level == nowlvl)
    {
        sessionStorage.setItem("level", -1);
        sessionStorage.setItem("Unlocklevel", nowlvl + 1);

        window.location.reload();
    }
    if (rectIntersect(lvlend, jumper))
    {
        sessionStorage.removeItem("Anc.x" + level);
        sessionStorage.removeItem("Anc.y" + level);
        sessionStorage.removeItem("jmp.x" + level);
        sessionStorage.removeItem("jmp.y" + level);
        if (Misha.grafics)
        {
            sessionStorage.setItem("GRC_jumperDirection", "right");
        }
    }
}
