import { rectIntersect } from "./Functions.js";

const Vlife = { x: 685, y: 5, width: 90, height: 90, count: 4};
export function get_Vlife()
{
    return {x: Vlife.x, y: Vlife.y, width: Vlife.width, height: Vlife.height, count: Vlife.count}
}

export function lifeSystem(chr, enemys)
{
    if (!chr.immortal.active)
    {
        const newChr = { x: chr.x - 1, y: chr.y - 1, width: chr.width + 2, height: chr.height + 2 };
        for (let i = 0; i < enemys.length; i++)
        {
            const el = enemys[i];
            if (rectIntersect(newChr, el))
            {
                Vlife.count = Math.max(Vlife.count - 1, 0);
                chr.immortal.active = true;
                chr.immortal.activTime = 0;
            }
        }
    }
    else
    {
        if (chr.immortal.activTime >= 0)
        {
            chr.immortal.activTime += 1;
            if (chr.immortal.activTime > 180)
            {
                chr.immortal.active = false;
            }
        }
    }
}