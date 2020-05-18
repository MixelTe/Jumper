import { fileLoaded } from "./loading.js";
import { switchMovie, WorldAnchor, switchMoveScreen, gameWindowStatic, Screen_edge_right } from "./base.js";
import { random_num, rectIntersect } from "./Functions.js";
import { Particle, drawParticles } from "./particles.js";
import { get_Vlife } from "./lifeSystem.js";
import { moveScreenTo } from "./movement.js";

const movie = { done: true, toSavePoint: { boolean: false, counter: 0, changed: false, chr: {}, savePoint: {} } };
window.movie = movie;
const pVlife = { particles: [], chr: {}, time: 0, done: true, ending: false };
const images = {All: 1, Loaded: 0};
let Vlife = {}
const comands = [];
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
    Vlife = get_Vlife();
    Vlife.y = Math.abs(Vlife.y - 600) - Vlife.height/2;
    Vlife.x += Vlife.width/2;
}



export function movies()
{
    for (let i = 0; i < comands.length; i++) {
        const el = comands[i];
        if (!el.done)
        {
            switch (el.type) {
                case "moveObj":
                    movementTo(el.obj, el.fx, el.fy, el.sx, el.sy, el.speedX, el.speedY, el);
                    break;

                case "particles":
                    particles_command(el);
                    break;

                case "work":
                    work_command(el);
                    break;

                default:
                    break;
            }
            if (el.way == "toEnding")
            {
                i = comands.length;
            }
            else if (el.way == "continue")
            {

            }
            else
            {
                console.error("el.way not correct. fuction: ", movies)
            }
        }
        else
        {
            comands.splice(i, 1);
            i -= 1;
        }
    }
    if (movie.toSavePoint.boolean && !movie.toSavePoint.changed && movie.toSavePoint.counter == 2)
    {
        const rect2 = { x: gameWindowStatic.x + -WorldAnchor.x, y: gameWindowStatic.y, width: gameWindowStatic.width, height: gameWindowStatic.height }
        if (rectIntersect(movie.toSavePoint.chr, rect2))
        {
            switchMoveScreen(true);
            movie.toSavePoint.changed = true;
        }
        if (movie.toSavePoint.chr.x < movie.toSavePoint.savePoint.x)
        {
            moveScreenTo(movie.toSavePoint.chr.x - Vlife.x);
        }
    }
    if (!pVlife.done)
    {
        particles_to_Vlife();
    }
    checkMoviesDone();
    if (movie.done)
    {
        Misha.noControlDown = false;
        switchMovie(false);
        switchMoveScreen(true);
    }
    else
    {
        Misha.noControlDown = true;
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

function particles_command(command)
{
    if (command.action == "start")
    {
        pVlife.chr = command.chr;
        pVlife.time = command.time;
        pVlife.done = false;
        pVlife.ending = false;

        command.done = true;
    }
    else if (command.action == "stop")
    {
        pVlife.ending = true;

        command.done = true;
    }
    else
    {
        console.log("action don't correct. fuction: ", particles_command);
    }
}
function particles_to_Vlife()
{
    if (!pVlife.ending)
    {
        const red = random_num(0, 100);
        const green = random_num(190, 255);
        const blue = random_num(0, 100);
        const newColor = `rgb(${red}, ${green}, ${blue})`;
        const width = random_num(6, 10);
        const p = new Particle(pVlife.chr.x + pVlife.chr.width / 2, pVlife.chr.y + pVlife.chr.height / 2, width, width, "ghost", newColor, false);
        p.ex = Vlife.x - WorldAnchor.x;
        p.ey = Vlife.y - WorldAnchor.y;
        p.speedX = (p.ex - p.x) / pVlife.time;
        p.speedY = (p.ey - p.y) / pVlife.time;
        p.time = pVlife.time;
        pVlife.particles.push(p);
    }
    for (let i = 0; i < pVlife.particles.length; i++)
    {
        const el = pVlife.particles[i];
        el.time = Math.max(el.time - 1, 1);
        el.ex = Vlife.x - WorldAnchor.x;
        el.ey = Vlife.y - WorldAnchor.y;
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
        done: false,
        type: "moveObj",
        way: "toEnding",
    };
    comands.push(a);
}

function ptoVlife(action, chr, time)
{
    if (action == "start")
    {
        const a = {
            action: action,
            time: time,
            chr: chr,
            done: false,
            type: "particles",
            way: "continue",
        };
        comands.push(a);

        // pVlife.chr = chr;
        // pVlife.time = time;
        // pVlife.done = false;
        // pVlife.ending = false;
    }
    else if (action == "stop")
    {
        const a = {
            action: action,
            done: false,
            type: "particles",
            way: "continue",
        };
        comands.push(a);
        // pVlife.ending = true;
    }
    else
    {
        console.log("action don't correct. fuction: ", ptoVlife);
    }
}

function checkMoviesDone()
{
    movie.done = true;
    for (let i = 0; i < comands.length; i++) {
        const el = comands[i];
        if (!el.done)
        {
            movie.done = false;
        }
    }
    if (!pVlife.done)
    {
        movie.done = false;
    }
}

function work_command(command)
{
    switch (command.typeC) {
        case "changeCounter":
            if (command.clear)
            {
                command.ObjWithcounter.counter = 0;
            }
            else
            {
                command.ObjWithcounter.counter += 1;
            }
            command.done = true;
            console.log(command.ObjWithcounter.counter);
            break;

        case "changeBoolean":
            command.ObjWithBoolean.boolean = command.toState;
            command.done = true;
            break;

        default:
            break;
    }
}
function stepCounter(ObjWithcounter, clear)
{
    const a = {
        ObjWithcounter: ObjWithcounter,
        clear: clear,
        done: false,
        typeC: "changeCounter",
        type: "work",
        way: "continue",
    };
    comands.push(a);
}
function changeBoolean(ObjWithBoolean, toState)
{
    const a = {
        ObjWithBoolean: ObjWithBoolean,
        toState: toState,
        done: false,
        typeC: "changeBoolean",
        type: "work",
        way: "continue",
    };
    comands.push(a);
}

export function movie_toSavePoint(chr, savePoint)
{
    const x = Vlife.x - WorldAnchor.x
    const y = Vlife.y - WorldAnchor.y
    movie.toSavePoint.changed = false;
    movie.toSavePoint.chr = chr;
    movie.toSavePoint.savePoint = savePoint;
    switchMovie(true);
    switchMoveScreen(false);

    changeBoolean(movie.toSavePoint, true)
    stepCounter(movie.toSavePoint)

    ptoVlife("start", chr, 50);
    moveTo(chr.x, chr.y, x, y, chr, 50);
    ptoVlife("stop");

    stepCounter(movie.toSavePoint)

    moveTo(x, y, savePoint.x, savePoint.y, chr, 50);
    stepCounter(movie.toSavePoint, true)
    changeBoolean(movie.toSavePoint, false)


}
