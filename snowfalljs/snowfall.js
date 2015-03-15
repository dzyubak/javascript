/**
 * Copyright (C) 2013, 2015 Dmytro Dzyubak
 * 
 * This file is part of SnowfallJS.
 * 
 * SnowfallJS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * SnowfallJS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with SnowfallJS. If not, see <http://www.gnu.org/licenses/>.
 */

var width  = getWidth();		// viewport width
var height = getHeight();		// viewport height
var snowflakes = new Array();	// array of snowflakes
var speedY;
var speedMinX;
var speedMaxX;

// browser viewport width without toolbars and scrollbars
function getWidth() {
    var w = window.innerWidth || // Internet Explorer, Chrome, Firefox, Opera, Safari
        document.documentElement.clientWidth || // Internet Explorer 8, 7, 6, 5
        document.body.clientWidth ||
        alert("Your browser is not supported!");
    return w;
}

// browser viewport height without toolbars and scrollbars
function getHeight() {
    var h = window.innerHeight || // Internet Explorer, Chrome, Firefox, Opera, Safari
        document.documentElement.clientHeight || // Internet Explorer 8, 7, 6, 5
        document.body.clientHeight ||
        alert("Your browser is not supported!");
    return h;
}

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function generateSnowflakes(intensity) {
    var actingArea = document.all["acting_area"];
    for (var i = 0; i < intensity; i++) {
        var snowflake = document.createElement("img");
        snowflake.src = "snowflake.png";
        snowflake.className = 'snowflake'; // OR snowflake.style = "position: absolute;";
        var snowflakeSize = generateRandom(20, 30);
        snowflake.style.height = snowflakeSize + "px";
        snowflake.style.width  = snowflakeSize + "px";
        snowflake.style.left = generateRandom(snowflakeSize, width)  - snowflakeSize + "px";
        snowflake.style.top  = generateRandom(snowflakeSize, height) - snowflakeSize + "px";
        snowflakes.push(snowflake);
        actingArea.appendChild(snowflake);
    }
}

function precipitate() {
    for (var i = 0; i < snowflakes.length; i++) {
        var snowflakeSize = parseInt(snowflakes[i].style.width);
        var left = parseFloat(snowflakes[i].style.left); // current x coordinate
        var top  = parseInt(snowflakes[i].style.top);    // current y coordinate
        // new y coordinate
        top++;
        if ( (top + snowflakeSize) < height ) {
            snowflakes[i].style.top = top + "px";
        } else { // we reached the bottom
            snowflakes[i].style.left = generateRandom(snowflakeSize, width) - snowflakeSize + "px";
            snowflakes[i].style.top  = "0px";
            continue;
        }
        // new x coordinate
        //left++; //left--;
        left += generateRandomFloat(speedMinX, speedMaxX);
        if ( (0 < left) && (left + snowflakeSize) < width ) {
            snowflakes[i].style.left = left + "px";
        } else if ( left < 1 ) { // we reached the left
            snowflakes[i].style.left = width - snowflakeSize - 1 + "px"; // start from right
            snowflakes[i].style.top = generateRandom(snowflakeSize, height) - snowflakeSize + "px";
            continue;
        } else {                 // we reached the right
            snowflakes[i].style.left = "2px"; // start from left
            snowflakes[i].style.top = generateRandom(snowflakeSize, height) - snowflakeSize + "px";
            continue;
        }
    }
}

function snowfall(intensity, speedY, speedX) {
    if ( !(3 <= intensity && intensity <= 50) || !(7 <= speedY && speedY <= 100) ||
            !(-5 <= speedX && speedX != 0 && speedX <= 5) ) {
        if ( !(3 <= intensity && intensity <= 50) ) {
            alert("Please, correct snowfall intensity level.");
            return;
        } else if ( !(7 <= speedY && speedY <= 100) ) {
            alert("Please, correct snowfall speedY parameter.");
            return;
        } else if ( !(-5 <= speedX && speedX != 0 && speedX <= 5) ) {
            alert("Please, correct snowfall speedX parameter.");
            return;
        }
    }
    width  = getWidth();
    height = getHeight();
    generateSnowflakes(intensity);
    //speedY;
    if (0 < speedX) {
        speedMinX = 0;
        speedMaxX = speedX;
    } else { // 0 > speedX
        speedMinX = speedX;
        speedMaxX = 0;
    }
    window.onresize = function() { // update width and height on window resize
        width  = getWidth();
        height = getHeight();
    }
    var intervalID = setInterval(precipitate, speedY);
}