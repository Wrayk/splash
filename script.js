// function that builds a grid in the "container"
var z = 1;
var y = 16;
var interval = "";
var morfd = [];

function createGrid(x) {
    z = 1;
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'  style='background-color:white;' id='" + z + "'></div>");
            z++;
        };
    };

    $(".grid").width(960/x);
    $(".grid").height(960/x);
};


// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
    y = prompt("How many boxes per side?");
    clearGrid();
    createGrid(y);
    cullur(y);
};

// create a 16x16 grid when the page loads
// creates a hover effect that changes the color of a square to black when the mouse passes over it, leaving a (pixel) trail through the grid
// allows the click of a button to prompt the user to create a new grid
$(document).ready(function() {
    createGrid(16);



    $(".newGrid").click(function() {
        refreshGrid();

    });


});

function expand(y){
    var o = 1;
    interval = setInterval(function() {
        for (var a = 1; a <= (y*y); a++){
            spread(a,y);
        }
        morfd = [];
        console.log("Changes");
    }, 750);
}

function cullur(){
    var starter = (Math.floor(Math.random() * (y*y)) + 1);
    console.log("Max:" + y*y);
    console.log("Start:" + starter);
    $("#" + starter).css("background-color", getRandomColor());
    spread(starter,y);
    expand(y);

}

function spread(x,d){
    var funk = [
        rC,
        dC,
        lC,
        uC
    ];
    if (morfd.includes(x) === false) {
        if ((document.getElementById(x).style.backgroundColor) !== "white") {

            for (var e = 0; e < 4; e++) {
                var luckyNum = Math.floor(Math.random() * funk.length);
                funk[0](x,d);
                if (luckyNum > -1) {
                    funk.splice(luckyNum, 1);
                }
            }

                // //Right Check
                //
                // if ((isPart(x, d) === false)) {
                //     if ((document.getElementById(x + 1).style.backgroundColor) === "white") {
                //         $("#" + (x + 1)).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
                //         morfd += (x + 1);
                //     }
                // }
                // //Down Check
                // if (x <= (d * (d - 1))) {
                //
                //     if ((document.getElementById(x + parseInt(d)).style.backgroundColor) === "white") {
                //         $("#" + (x + parseInt(d))).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
                //         morfd += (x + parseInt(d));
                //     }
                // }
                // //Left Check
                // if (isPart(x - 1, d) === false) {
                //     if (x === 1) {
                //         x = 2;
                //     }
                //     if ((document.getElementById(x - 1).style.backgroundColor) === "white") {
                //         $("#" + (x - 1)).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
                //         morfd += (x - 1);
                //     }
                // }
                // //Up Check
                // if (x > d) {
                //     if ((document.getElementById(x - parseInt(d)).style.backgroundColor) === "white") {
                //         $("#" + (x - parseInt(d))).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
                //         morfd += (x - parseInt(d))
                //     }
                // }

        }
    }
}

function rC(x,d){
    if ((isPart(x, d) === false)) {
        if ((document.getElementById(x + 1).style.backgroundColor) === "white") {
            $("#" + (x + 1)).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
            morfd += (x + 1);
        }
    }
}

function dC(x,d){
    if (x <= (d * (d - 1))) {
        if ((document.getElementById(x + parseInt(d)).style.backgroundColor) === "white") {
            $("#" + (x + parseInt(d))).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
            morfd += (x + parseInt(d));
        }
    }
}
function lC(x,d){
    if (isPart(x - 1, d) === false) {
        if (x === 1) {
            x = 2;
        }
        if ((document.getElementById(x - 1).style.backgroundColor) === "white") {
            $("#" + (x - 1)).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
            morfd += (x - 1);
        }
    }
}
function uC(x,d){
    if (x > d) {
        if ((document.getElementById(x - parseInt(d)).style.backgroundColor) === "white") {
            $("#" + (x - parseInt(d))).css("background-color", modColor(document.getElementById(x).style.backgroundColor));
            morfd += (x - parseInt(d))
        }
    }
}

function isPart(x,d){
    for (var r = 1; r <= d; r++){
        if (x === (d*r)){
            return true;
        }
    }
    return false;
}

//Note: Hex is actually the rgb, but idk how to fetch the individual colors.

function modColor(hex){

    rgb = hex.substring(4, hex.length-1)
        .replace(/ /g, '')
        .split(',');

    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);

    r += (getRandomInt(21)-11);
    g += (getRandomInt(21)-11);
    b += (getRandomInt(21)-11);
    return(rgbToHex(r, g, b));
}

//Turns  rgb to hex.
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//Turns hex to rgb
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// function that clears the grid
function clearGrid(){
    $(".grid").remove();
    clearInterval(interval);
};