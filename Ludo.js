Total_player = 4;

player_details = [];

thenumber = 1;

next_move = true;
player_box = [];
player_box[0] = ["player-Red", 41, 25, "R", 2];
player_box[1] = ["player-Green", 401, 25, "G", 15];
player_box[2] = ["player-Blue", 41, 390, "B", 41];
player_box[3] = ["player-Yellow", 401, 390, "Y", 28];
safe_zone = [2, 15, 28, 41];

function move_object(object) {
  if (next_move) {
    object.style.transition = "top .5s ease-in-out, left .5s ease-in-out, transform 0.1s ease-in-out";
    object.style.transform = "scale(1)";
    theobject_id = object.id;
    next_move = false;
    newobject = document.querySelectorAll("#box");
    if (player_details[theobject_id]["Status"] == 1) {
      if (player_details[theobject_id]["Current_Location"] == 0) {
        player_details[theobject_id]["Current_Location"] = num =
          player_details[theobject_id]["Initial_Position"];
        for (i = 0; i < newobject.length; i++) {
          if (newobject[i].innerHTML == num) {
            movement(object, newobject[i], num);
            rearrage(newobject[i]);
            setTimeout(()=>{
                next_move = true;
            },500)
            
            break;
          }
        }
        player_details[theobject_id]["Moved"] = 1;
      } else {
        for (i = 0; i < newobject.length; i++) {
          if (newobject[i].innerHTML ==player_details[theobject_id]["Current_Location"]) {
            old_position = newobject[i];
            break;
          }
        }
        object.style.transition = "top .3s ease-in-out, left .3s ease-in-out, transform 0.1s ease-in-out";
        num =
          parseInt(String(player_details[theobject_id]["Current_Location"]).replace(/\D/g,"")) + thenumber;
        o = 0;
        delay = 0;
        start =parseInt(String(player_details[theobject_id]["Current_Location"]).replace(/\D/g,""));
        for (let k = start; k <= num; k++) {
          if (player_details[theobject_id]["Moved"] > 51) {
            current =
              player_details[theobject_id]["Player"] +
              (player_details[theobject_id]["Moved"] - 51);
          } else {
            current = k;
            if (k > 52) {
              current = k - 52;
            }
          }
          player_details[theobject_id]["Moved"] += 1;

          for (let i = 0; i < newobject.length; i++) {
            if (newobject[i].innerHTML == current) {
              (function (current, object, target) {
                setTimeout(function () {
                  movement(object, target);
                  rearrage(target);
                  if (current >= player_details[theobject_id]["Player"] + "6") {
                    setTimeout(()=>{
                        next_move = true;
                    },500)
                    player_details[theobject_id]["Status"] = 0;
                  } else {
                    if (player_details[theobject_id]["Current_Location"] ==current) {
                        setTimeout(()=>{
                            next_move = true;
                        },500)
                        check_collision(target,theobject_id);
                    }
                  }
                    
                }, o * delay);
              })(current, object, newobject[i]);
              break;
            }
            if(o<2){
                delay = 170;
            }else{
                delay=280
            }
                
            
          }
          o++;
        }
        player_details[theobject_id]["Moved"] -= 1;
        player_details[theobject_id]["Current_Location"] = current;
      }
    } else {
      next_move = true;
    }
  }
}

function movement(object, position) {
  const parentRect = position.parentElement.getBoundingClientRect();
  const elementRect = position.getBoundingClientRect();
  board=document.body
  if (position.innerHTML == "R6") {

    x = elementRect.left - parentRect.left+240;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+210;

  } else if (position.innerHTML == "G6") {

    x = elementRect.left - parentRect.left+215;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+230;

  } else if (position.innerHTML == "B6") {

    x = elementRect.left - parentRect.left+215;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+180;

  } else if (position.innerHTML == "Y6") {

    x = elementRect.left - parentRect.left+192;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+210;

  } else {
    inger = 4;
    x = elementRect.left - parentRect.left;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    leftof = board.getBoundingClientRect().left+6;
    topof = board.getBoundingClientRect().top + inger - 12;
  }

  object.style.top = y + topof + "px";
  object.style.left = x + leftof + "px";
}

window.onresize = function () {
  object = document.querySelectorAll(".player");
  newobject = document.querySelectorAll("#box");
  for (i = 0; i < object.length; i++) {
    object[i].style.transition = "all 0s ease-in-out";

    board = document.getElementById("board");
    if (player_details[object[i].id]["Current_Location"] == 0) {
      playersbox = document.querySelectorAll("#player-red");
      const parentRect = playersbox[i].parentElement.getBoundingClientRect();
      const elementRect = playersbox[i].getBoundingClientRect();
      x = elementRect.left - parentRect.left;
      y = elementRect.top - parentRect.top;
      leftof = board.getBoundingClientRect().left + 40;
      topof = board.getBoundingClientRect().top + 40;
    } else {
      for (k = 0; k < newobject.length; k++) {
        if (
          newobject[k].innerHTML ==
          player_details[object[i].id]["Current_Location"]
        ) {
          position = newobject[k];
        }
      }
      const parentRect = position.parentElement.getBoundingClientRect();
      const elementRect = position.getBoundingClientRect();
      x = elementRect.left - parentRect.left;
      y = elementRect.top - parentRect.top;
      leftof = board.getBoundingClientRect().left + 4;
      topof = board.getBoundingClientRect().top + 4;
    }

    object[i].style.top = y + topof + "px";
    object[i].style.left = x + leftof + "px";
  }
};

function player_create() {
  players = document.querySelectorAll(".player");
  theplayer = 0;
  for (box = 0; box < Total_player; box++) {
    playersbox = document.querySelectorAll("#" + player_box[box][0]);
    for (i = 0; i < playersbox.length; i++) {
      const parentRect = playersbox[i].parentElement.getBoundingClientRect();
      const elementRect = playersbox[i].getBoundingClientRect();

      const x = elementRect.left - parentRect.left;
      const y = elementRect.top - parentRect.top;

      const Player = document.createElement("div");
      Player.className = "player";
      Player.setAttribute("onclick", "move_object(this)");
      Player.setAttribute("id", "P" + theplayer);

      color = player_box[box][0].split("-");
      const Player_image = document.createElement("img");
      Player_image.className = "player_image";
      Player_image.src = "Images/" + color[1] + ".png";

      Player.appendChild(Player_image);
      document.body.appendChild(Player);
      board = document.getElementById("board");
      leftof = board.getBoundingClientRect().left + player_box[box][1];
      topof = board.getBoundingClientRect().top + player_box[box][2];
      Player.style.top = y + topof + "px";
      Player.style.left = x + leftof + "px";
      Player.style.transition = "top .3s ease-in-out, left .3s ease-in-out, transform 0s ease-in-out";
      id = "P" + theplayer;
      player_details[id] = {
        ID: id,
        Player: player_box[box][3],
        Initial_Position: player_box[box][4],
        Current_Location: 0,
        Y_Axis: y + topof,
        X_Axis: x + leftof,
        Moved: 0,
        Status: 1,
      };
      theplayer++;
    }
  }
}

function check_collision(object,ActivePlayer) {
  num_players = Object.keys(player_details).length;
  object_Collied = [];
  for (i = 0; i < num_players; i++) {
    id = "P" + i;
    if (player_details[id]["Current_Location"] == object.innerHTML) {
      flag = 1;
      object_Collied.push(id);
    }
  }
  if (object_Collied.length == 1) {
    return false;
  } else {
    console.log("Collision Deteced: " + object_Collied);
    flag = 0;
    for (k = 0; k < safe_zone.length; k++) {
      if (safe_zone[k] == object.innerHTML) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      console.log("Position not safe")
      for(k=0;k<object_Collied.length;k++){
        if(player_details[ActivePlayer]["Player"]!=player_details[object_Collied[k]]["Player"]){
            backtohome(player_details[object_Collied[k]]["ID"])
            const parentRect = object.parentElement.getBoundingClientRect();
            const elementRect = object.getBoundingClientRect();
            x = elementRect.left - parentRect.left;
            y = elementRect.top - parentRect.top;
            board = document.getElementById("board");
            leftof = board.getBoundingClientRect().left+6;
            topof = board.getBoundingClientRect().top + 4 - 12;
            play=document.getElementById(player_details[ActivePlayer]["ID"]);
            play.style.top = y + topof + "px";
            play.style.left = x + leftof + "px";
            play.style.transform = "scale(1)"
        }
      }
      
    }
    return true
  }
}

function backtohome(Player_id){
    delay=110
    console.log(Player_id)
    object=document.getElementById(Player_id)
    object.style.transition = "top 0.1s liner, left 0.1s liner";
    start=player_details[Player_id]["Current_Location"];
    end=player_details[Player_id]["Initial_Position"]
    for (let k = start; k >= end; k--) {
        current=k
        player_details[Player_id]["Moved"] -= 1;
        for (let i = 0; i < newobject.length; i++) {
          if (newobject[i].innerHTML == current) {
            (function (current, object, target) {
              setTimeout(function () {
                object.style.transform = "scale(1)";
                movement(object, target);
                  if (player_details[Player_id]["Initial_Position"] ==current) {
                    object.style.transition = "top 0.5s ease-in-out, left 0.5s ease-in-out";
                    player_details[Player_id]["Current_Location"]=0
                    player_details[Player_id]["Moved"]=0
                      setTimeout(()=>{
                          next_move = true;
                          
                            object.style.top = player_details[Player_id]["Y_Axis"]+ "px";
                            object.style.left= player_details[Player_id]["X_Axis"] + "px";
                      },500);
                }
              }, o * delay);
            })(current, object, newobject[i]);
            break;
          }          
        }
        o++;
      }
}



function rearrage(object) {
  num_players = Object.keys(player_details).length;
  players = [];
  for (i = 0; i < num_players; i++) {
    id = "P" + i;
    if (player_details[id]["Current_Location"] == object.innerHTML) {
         players.push(id);
    }
  }

  parentRect = object.parentElement.getBoundingClientRect();
  elementRect = object.getBoundingClientRect();
  board = document.getElementById("board");
  leftof = board.getBoundingClientRect().left + 4;
  dist = 0;
  if (players.length == 1) {
    scale = 1;
    hie = 0;
    space = 0;
    toleft = -3;
  } else if (players.length > 5) {
    scale = 0.5;
    hie = -8;
    space = 3;
    toleft = 3;
  } else {
    scale = .8;
    hie = players.length + 2;
    space = 6;
    toleft = players.length-1;
  }
  for (i = 0; i < players.length; i++) {
    thepr = document.getElementById(players[i]);
    thepr.style.transition = "top 0.4s ease-in-out, left 0.4s ease-in-out, transform 0.5s ease-in-out";
    left_value = x + leftof - (players.length + toleft);
    thepr.style.transform = "scale(" + scale + ")";
    thepr.style.left = left_value + dist + "px";
    dist += space;
  }
}

