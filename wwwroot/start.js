"use strict";

if (sessionStorage.getItem("level") == null)
{
    sessionStorage.setItem("level", -1);
}

if (sessionStorage.getItem("Unlocklevel") == null)
{
    sessionStorage.setItem("Unlocklevel", 0);
}

const level = parseInt(sessionStorage.getItem("level"));
if (level == -1)
{
    loadScript("jumper_lvls/menu/menu.js");
}
else if (level == -2)
{
    loadScript("jumper_lvls/levelBase.js");
}
else
{
    loadScript(`jumper_lvls/lvl${level}/level${level}.js`);
}

if (sessionStorage.getItem("coins") != null)
{
    coins.value = parseInt(sessionStorage.getItem("coins"));
}
