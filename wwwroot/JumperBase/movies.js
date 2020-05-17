import { fileLoaded } from "./loading.js";
import { switchMovie, WorldAnchor } from "./base.js";
import { random_num } from "./Functions.js";
import { Particle, drawParticles } from "./particles.js";
import { get_Vlife } from "./lifeSystem.js";

const movie = { done: true };
const moveObj = { comands: [], done: true};
const pVlife = { particles: [], chr: {}, Vlife: {}, time: 0, done: true };
const images = {All: 1, Loaded: 0};

export function loadFiles()
{
    images.leaf = new Image();
    images.leaf.src = "pictures/leaf.png";
    images.leaf.onload = function ()
    {
        images.Loaded += 1;
        fileLoaded();
    }
}
export function onlvlload()
{
    pVlife.Vlife = get_Vlife();
    pVlife.Vlife.y = Math.abs(pVlife.Vlife.y - 600) - pVlife.Vlife.height/2;
    pVlife.Vlife.x += pVlife.Vlife.width/2;
}
export function movies()
{
    if (!moveObj.done)
    {
        Misha.noControlDown = true;
        for (let i = 0; i < moveObj.comands.length; i++) {
            const el = moveObj.comands[i];
            if (!el.done)
            {
                movementTo(el.obj, el.fx, el.fy, el.sx, el.sy, el.speedX, el.speedY, el);
                i = moveObj.comands.length;
            }
            else
            {
                moveObj.comands.splice(i, 1);
                i -= 1;
            }
        }
    }
    if (!pVlife.done)
    {
        // Misha.noControlDown = true;
        particles_to_Vlife();
    }
    checkMoviesDone();
    if (movie.done)
    {
        Misha.noControlDown = false;
        switchMovie();
    }
}
export function moviesDraw()
{
    if (!pVlife.done)
    {
        drawParticles(pVlife.particles, true);
    }
}


function movementTo(obj, fx, fy, sx, sy, speedX, speedY, el)
{
    if (sx > fx)
    {
        obj.x = Math.min(obj.x + speedX, sx);
    }
    else
    {
        obj.x = Math.max(obj.x + speedX, sx);
    }

    if (sy > fy)
    {
        obj.y = Math.min(obj.y + speedY, sy);
    }
    else
    {
        obj.y = Math.max(obj.y + speedY, sy);
    }
    if (obj.x == sx && obj.y == sy && el != null)
    {
        el.done = true;
    }
}

function particles_to_Vlife()
{
    // if (!moveObj.done)
    // {
        const red = random_num(0, 100);
        const green = random_num(190, 255);
        const blue = random_num(0, 100);
        const newColor = `rgb(${red}, ${green}, ${blue})`;
        const width = random_num(6, 10);
        const p = new Particle(pVlife.chr.x + pVlife.chr.width / 2, pVlife.chr.y + pVlife.chr.height / 2, width, width, "ghost", newColor, false);
        p.ex = pVlife.Vlife.x - WorldAnchor.x;
        p.ey = pVlife.Vlife.y - WorldAnchor.y;
        p.speedX = (p.ex - p.x) / pVlife.time;
        p.speedY = (p.ey - p.y) / pVlife.time;
        p.time = pVlife.time;
        pVlife.particles.push(p);
    // }
    for (let i = 0; i < pVlife.particles.length; i++)
    {
        const el = pVlife.particles[i];
        el.time = Math.max(el.time - 1, 1);
        el.ex = pVlife.Vlife.x - WorldAnchor.x;
        el.ey = pVlife.Vlife.y - WorldAnchor.y;
        el.speedX = (el.ex - el.x) / el.time;
        el.speedY = (el.ey - el.y) / el.time;
        movementTo(el, el.x, el.y, el.ex, el.ey, el.speedX, el.speedY, el);
        if (el.done)
        {
            pVlife.particles.splice(i, 1);
            i -= 1;
        }
    }
    if (pVlife.particles.length == 0)
    {
        pVlife.done = true;
    }
}


function moveTo(fx, fy, x, y, chr, time)
{
    const a = {
        fx: fx,
        fy: fy,
        sx: x,
        sy: y,
        speedX: (x - fx) / time,
        speedY: (y - fy) / time,
        obj: chr,
        done: false
    };
    moveObj.done = false;
    moveObj.comands.push(a);
}

function ptoVlife(chr, time)
{
    pVlife.chr = chr;
    pVlife.time = time;
    pVlife.done = false;
}


function checkMoviesDone()
{
    moveObj.done = true;
    for (let i = 0; i < moveObj.comands.length; i++) {
        const el = moveObj.comands[i];
        if (!el.done)
        {
            moveObj.done = false;
        }
    }
    if (moveObj.done && pVlife.done)
    {
        movie.done = true;
    }
    else
    {
        movie.done = false;
    }
}

export function movie_toSavePoint(chr, savePoint)
{
    switchMovie();
    ptoVlife(chr, 100);
    // moveTo(chr.x, chr.y, savePoint.x, savePoint.y, chr, 50);
    // moveTo(savePoint.x, savePoint.y, 400, 300, chr, 50);
    // moveTo(400, 300, 0, 50, chr, 50);
    // moveTo(0, 50, 800, 200, chr, 100);
    // moveTo(800, 200, 400, 300, chr, 200);
    // moveTo(400, 300, 1050, 400, chr, 200);
    // moveTo(1050, 400, 100, 200, chr, 100);

}