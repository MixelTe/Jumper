"use strict";
import {platforms, SPL_lvl_write, SPL_lvl_read, WorldAnchor, jumper, drawPlatform, coins, lvlend} from "./base.js"
import {SPL_direction_write, SPL_direction_read} from "./grafics.js"
import {ost_write} from "./music.js"
import {rectIntersect} from "./Functions.js"
import { level, VlevelChange } from "../start.js";
export function writeInMemory(lvl)
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
        SPL_direction_write();
    }
}

export function readMemory(lvl)
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
    if (sessionStorage.getItem("coins") != null)
    {
        coins.value = parseInt(sessionStorage.getItem("coins"));
    }

    SPL_lvl_read(lvl);

    if (Misha.grafics)
    {
        SPL_direction_read();
    }

}

export function lvl_end()
{
    let nowlvl = parseInt(sessionStorage.getItem("level"))
    if (rectIntersect(lvlend, jumper))
    {
        if (level == nowlvl)
        {
            VlevelChange(-1)
            sessionStorage.setItem("Unlocklevel", nowlvl + 1);
        }
        sessionStorage.removeItem("Anc.x" + nowlvl);
        sessionStorage.removeItem("Anc.y" + nowlvl);
        sessionStorage.removeItem("jmp.x" + nowlvl);
        sessionStorage.removeItem("jmp.y" + nowlvl);
        sessionStorage.setItem("GRC_jumperDirection", "right");
        for (let i = 0; i < platforms.length; i++)
        {
            if (platforms[i].type == "breakable")
            {
                sessionStorage.removeItem("breakable" + platforms[i].id);
            }
        }
    }
}
