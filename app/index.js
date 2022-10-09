import document from "document";
import { vibration } from "haptics";
import * as messaging from "fitbit-file-messaging";
import * as fs from "fs";
import { me } from "appbit";

console.log("App Started");

// trying to get user settings if saved before
let userSettings;
try {
  userSettings = fs.readFileSync("user_settings.json", "json");
} catch (e) {
  userSettings = {backgroundColor: "black", numberColor:"white", tileColor: "red", lightRecord: null, mediumRecord: null, heavyRecord: null}
}

// on app exit collect settings 
me.onunload = () => {
  fs.writeFileSync("user_settings.json", userSettings, "json");
}

setBackgroundColor(userSettings.backgroundColor);
setTileColor(userSettings.tileColor);
setNumberColor(userSettings.numberColor);



let cells = [[],[],[],[]];
let num = 1;

for (let j=0; j<=3; j++) {
  for (let i=0; i<=3; i++) {
     let currentTile = document.getElementById(j + "_" + i);

     currentTile.addEventListener("mousedown", function(){moveTile(this)});
     currentTile.j = j;
     currentTile.i = i;
     currentTile.number = num;
    
     cells[j][i] = {
       number: num,
       x: currentTile.x,
       y: currentTile.y,
     }
    
     num++;
  }
}

function setTileColor(tileColor) {
  for (let j=0; j<=3; j++) {
    for (let i=0; i<=3; i++) {
       let currentTile = document.getElementById(j + "_" + i);
          currentTile.getElementById("image").style.fill = tileColor;
    }
  }  
}

function setNumberColor(numberColor) {
  for (let j=0; j<=3; j++) {
    for (let i=0; i<=3; i++) {
       let currentTile = document.getElementById(j + "_" + i);
          currentTile.getElementById("number").style.fill = numberColor;
    }
  }  
}


function setBackgroundColor(backgroundColor) {
  document.getElementById("background").style.fill = backgroundColor;
}


function isSolved() {
  for (let j=0; j<=3; j++) {
    for (let i=0; i<=3; i++) {
       if (cells[j][i].number != i + j*4 + 1) return false;
    }
  }
  
  return true
  
}


function shuffle(iteration) {

  let cnt = 1; 
  
  let tile1 = document.getElementById(Math.floor(Math.random()*3) + "_" + Math.floor(Math.random()*3));
  
  let myint = setInterval(function() {
    
      let tile2 = document.getElementById(Math.floor(Math.random()*4) + "_" + Math.floor(Math.random()*4));
    
      if (tile2.number == 16 || (tile1.i == tile2.i && tile1.j == tile2.j)) return;

      tile1.x = cells[tile2.j][tile2.i].x;
      tile1.y = cells[tile2.j][tile2.i].y;
      cells[tile2.j][tile2.i].number = tile1.number;
    
      tile2.x = cells[tile1.j][tile1.i].x;
      tile2.y = cells[tile1.j][tile1.i].y;
      cells[tile1.j][tile1.i].number = tile2.number;
    
      let temp = tile1.j; tile1.j = tile2.j; tile2.j = temp;
      temp = tile1.i; tile1.i = tile2.i; tile2.i = temp;
    
      cnt++;
      if (cnt > iteration) {
        clearInterval(myint);
        vibration.start("nudge");
      }
  
  }, 50);
    

}



function moveTile(elem) {
  
  moveCount++;
  
  if (elem.i < 3 && cells[elem.j][elem.i+1].number === 16) {
      elem.x = cells[elem.j][elem.i+1].x;
      cells[elem.j][elem.i+1].number = elem.number;
      cells[elem.j][elem.i].number = 16;
      elem.i = elem.i + 1;
  } else if (elem.i > 0 && cells[elem.j][elem.i-1].number === 16) {
      elem.x = cells[elem.j][elem.i-1].x;
      cells[elem.j][elem.i-1].number = elem.number;
      cells[elem.j][elem.i].number = 16;
      elem.i = elem.i - 1;
  } else if (elem.j < 3 && cells[elem.j+1][elem.i].number === 16) {
      elem.y = cells[elem.j+1][elem.i].y;
      cells[elem.j+1][elem.i].number = elem.number;
      cells[elem.j][elem.i].number = 16;
      elem.j = elem.j + 1;
  } else if (elem.j > 0 && cells[elem.j-1][elem.i].number === 16) {
      elem.y = cells[elem.j-1][elem.i].y;
      cells[elem.j-1][elem.i].number = elem.number;
      cells[elem.j][elem.i].number = 16;
      elem.j = elem.j - 1;
  }
  
  if (isSolved()) { 
    console.log("Solved!")
    solvedMessage.getElementById("title").text = `SOLVED! (${gameMode == "medium"? "med": gameMode})`;
    solvedMessage.getElementById("line1").text = `Moves: ${moveCount}`;
    
    let record = userSettings[gameMode + "Record"];
    if (record == null || moveCount < record) {
      solvedMessage.getElementById("line2").style.fill = "red";
      solvedMessage.getElementById("line2").text = "NEW RECORD!";
      userSettings[gameMode + "Record"] = moveCount;
    } else {
      solvedMessage.getElementById("line2").text = `Best: ${record}`;
    }
    
    solvedMessage.style.display = "inline";
    vibration.start("confirmation-max");
  }
  
}

let titleMessage = document.getElementById("titleMessage");
titleMessage.getElementById("line1").addEventListener("mousedown", titleSelection);
titleMessage.getElementById("line2").addEventListener("mousedown", titleSelection);
titleMessage.getElementById("line3").addEventListener("mousedown", titleSelection);

let gameMode;
let moveCount;

function titleSelection(){
  this.style.fill = "darkgoldenrod";
  moveCount = 0;
  setTimeout(() => {
     this.style.fill = "black";
     titleMessage.style.display = "none";
     switch (this.id) {
       case "line1": shuffle(8); gameMode="light"; break;
       case "line2": shuffle(16); gameMode="medium"; break;  
       case "line3": shuffle(32);  gameMode="heavy"; break;    
     }
  }, 100)
}

let solvedMessage = document.getElementById("solvedMessage");
solvedMessage.addEventListener("mousedown", endSelection);

solvedMessage.getElementById("line1").addEventListener("mousedown", endSelection);
solvedMessage.getElementById("line2").addEventListener("mousedown", endSelection);
solvedMessage.getElementById("line3").addEventListener("mousedown", endSelection);

function endSelection() {
   solvedMessage.style.display = "none";
   solvedMessage.getElementById("line2").style.fill = "black";
   setTimeout(() => {titleMessage.style.display = "inline" }, 200);
}



// Message is received
messaging.peerSocket.onmessage = evt => {
  
  switch (evt.data.key) {
    case "backgroundColor": 
          userSettings.backgroundColor = evt.data.newValue.replace(/["']/g, "");
          setBackgroundColor(userSettings.backgroundColor)
          break;
    case "tileColor":
          userSettings.tileColor = evt.data.newValue.replace(/["']/g, "");
          setTileColor(userSettings.tileColor)
          break;
    case "numberColor":
          userSettings.numberColor = evt.data.newValue.replace(/["']/g, "");
          setNumberColor(userSettings.numberColor)
          break; 
  };
 
      
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

