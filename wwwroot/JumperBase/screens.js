"use strict";
window.Misha = window.Misha || Object.create(null);
Misha.screens = true;


function SCR_backscreen2(elements)
{
    elements.forEach(el =>
    {
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.scale(0.7, 0.7);
        ctx.fillStyle = "rgb(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, el.width, el.height);
        if (Misha.grafics)
        {
            drawTexture(el);
            if (el.texture == "grass")
            {
                ctx.translate(0, el.height - 1);
                GRC_grass(el);
            }
        }
        ctx.restore();
    });
}

function SCR_frontscreen(elements)
{
    elements.forEach(el =>
    {
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.scale(1.4, 1.4);
        const obj = {x: el.x, y: el.y, width: el.width * 1.4, height: el.height * 1.4}
        if (rectIntersect(obj, jumper))
        {
            ctx.globalAlpha = 0.5;
        }

        ctx.fillStyle = "rgb(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, el.width, el.height);
        if (Misha.grafics)
        {
            drawTexture(el);
            if (el.texture == "grass")
            {
                ctx.translate(0, el.height - 1);
                GRC_grass(el);
            }
        }
        ctx.restore();
    });
}