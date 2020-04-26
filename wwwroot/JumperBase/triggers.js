"use strict";
function TRG_lever_door(leverID, doorID)
{
    const lever1 = findWhithId(platforms, leverID);
    const door1 = findWhithId(platforms, doorID);
    switch (platforms[lever1].leverState) {
        case "on":
            platforms[door1].doorState = "opening"
            break;

        case "off":
            platforms[door1].doorState = "closing"
            break;

        default:
            break;
    }
}