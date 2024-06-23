Total_player = 2;

player_details = [];

thenumber = 5;


Selected_Player=0;
move_pattern=['B','R'];


bgcolorin=10;
bgcolorout=600

const colors = {"Blue":"rgb(0, 114, 207,.25)","Red":"rgb(207, 0, 0,.2)","Green":"rgb(0, 207, 38,.25)","Yellow":"rgb(230, 242, 0,.25)"}

next_move = false;

var result=[];
var added_player=[]

Player_values=[];

player_box = [];
player_box[0] = ["player-Red", 41, 25, "R", 2];
player_box[1] = ["player-Blue", 41, 390, "B", 41];
player_box[2] = ["player-Green", 401, 25, "G", 15];
player_box[3] = ["player-Yellow", 401, 390, "Y", 28];
safe_zone = [2, 15,18, 28, 41];

function move_object(object) {
  if (next_move) {
    theobject_id = object.id;
    next_move = false;
    if (player_details[theobject_id]["Status"] == 1) {
      object.style.transition = "top .5s ease-in-out, left .5s ease-in-out, transform 0.1s ease-in-out";
      object.style.transform = "scale(1)";
      if (player_details[theobject_id]["Current_Location"] == 0) {
        if(thenumber==6){
            player_details[theobject_id]["Current_Location"] = num =
            player_details[theobject_id]["Initial_Position"];
            newobject=document.getElementById('box-'+num)
            movement(object, num);
            rearrage(num);
            setTimeout(()=>{
              undice(0)
            },200)
          player_details[theobject_id]["Moved"] = 1;
        }else{
          undice(1)
        }
      } else {
        old_position=document.getElementById("box-"+player_details[theobject_id]["Current_Location"])
        
        object.style.transition = "top .3s ease-in-out, left .3s ease-in-out, transform 0.1s ease-in-out";
        num =
          parseInt(String(player_details[theobject_id]["Current_Location"]).replace(/\D/g,"")) + thenumber;
        o = 0;
        delay = 0;
        let current;
        start =parseInt(String(player_details[theobject_id]["Current_Location"]).replace(/\D/g,""));
        for (let k = start; k <= num; k++) {
          
          if (player_details[theobject_id]["Moved"] > 51) {
              current = player_details[theobject_id]["Player"] + (player_details[theobject_id]["Moved"] - 51);
          } else {
              current = k;
              if (k > 52) {
                  current = k - 52;
              }
          }
          player_details[theobject_id]["Moved"] += 1;
          let target = document.getElementById("box-" + current);
          object.style.transition = "transform 0.1s ease-in-out";
          (function (current,target) {
              setTimeout(function () {
                  setTimeout(() => {
                      object.classList.add("jump");
                  }, 10);
      
                  setTimeout(() => {
                      object.classList.remove("jump");
                  }, 100);
                  setTimeout(() => {
                    target.style.backgroundColor=colors[player_details[theobject_id]["Color"]];
                }, bgcolorin);
                  setTimeout(() => {
                    target.style.backgroundColor="white"
                  }, bgcolorout);
      
                  movement(object, current);
                  rearrage(current);
                  if (current >= player_details[theobject_id]["Player"] + 6) {
                    winner_check(theobject_id)
                    undice(0)
                    player_details[theobject_id]["Status"] = 0;
                  }
                  else{
                    if (player_details[theobject_id]["Current_Location"] == current) {
                      if(check_collision(current, theobject_id)){
                        undice(0)
                      }else{
                        undice(1)
                      }
                    }
                  }
              }, o * delay);
          })(current,target);
      
          if (k < 2) {
              delay = 170;
          } else {
              delay = 280;
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

function movement(object, position_id) {
  position=document.getElementById("box-"+position_id)
  const parentRect = position.parentElement.getBoundingClientRect();
  const elementRect = position.getBoundingClientRect();
  board=document.body
  if (position_id == "R6") {

    x = elementRect.left - parentRect.left+240;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+210;

  } else if (position_id == "G6") {

    x = elementRect.left - parentRect.left+215;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+230;

  } else if (position_id == "B6") {

    x = elementRect.left - parentRect.left+215;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top+180;

  } else if (position_id == "Y6") {

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
  num_players = Object.keys(player_details).length;
  for(ty=0;ty<num_players;ty++){
    id="P"+ty;
    object=document.getElementById(id);
    object.style.transition = "all 0s";
    if(player_details[id]['Current_Location']!=0){
      Position=player_details[id]['Current_Location'];
      movement(object,Position)
    }else{
      playersbox = document.querySelectorAll("#player-" + player_details[id]['Color']);
      thheseleced_box=playersbox[player_details[id]['Position_Num']]

      for (let i = 0; i < Player_values.length; i++) {
        if (Player_values[i][0] === "player-" + player_details[id]['Color']) {
          box=i;
          break;
        }
    }

      parentRect = thheseleced_box.parentElement.getBoundingClientRect();
      elementRect = thheseleced_box.getBoundingClientRect();

      x = elementRect.left - parentRect.left;
      y = elementRect.top - parentRect.top;

      board = document.getElementById("board");
      leftof = board.getBoundingClientRect().left + Player_values[box][1];
      topof = board.getBoundingClientRect().top + Player_values[box][2];

      object.style.top = y + topof + "px";
      object.style.left = x + leftof + "px";

    }
  }
};



function player_numbers(){
  for (let j = 0; j < move_pattern.length; j++) {
    for (let i = 0; i < player_box.length; i++) {
        if (player_box[i][3] === move_pattern[j]) {
            Player_values.push(player_box[i]);
        }
    }
  }
  player_create()
}

function player_create() {
  players = document.querySelectorAll(".player");
  theplayer = 0;
  for (box = 0; box < Player_values.length; box++) {
    color = Player_values[box][0].split("-");
    playersbox = document.querySelectorAll("#" + Player_values[box][0]);
    play_value=document.getElementById("player-"+color[1]+"-Title").innerHTML="Player"+(box+1);
    added_player.push("Player"+(box+1))
    temp_num=0
    for (i = 0; i < playersbox.length; i++) {
      const parentRect = playersbox[i].parentElement.getBoundingClientRect();
      const elementRect = playersbox[i].getBoundingClientRect();

      const x = elementRect.left - parentRect.left;
      const y = elementRect.top - parentRect.top;

      const Player = document.createElement("div");
      Player.className = "player";
      Player.setAttribute("onclick", "move_object(this)");
      Player.setAttribute("id", "P" + theplayer);

      const Player_image = document.createElement("img");
      Player_image.className = "player_image";
      Player_image.src = "Images/Player/" + color[1] + ".png";

      Player.appendChild(Player_image);
      document.body.appendChild(Player);

      board = document.getElementById("board");
      leftof = board.getBoundingClientRect().left + Player_values[box][1];
      topof = board.getBoundingClientRect().top + Player_values[box][2];
      Player.style.top = y + topof + "px";
      Player.style.left = x + leftof + "px";
      Player.style.transition = "top .3s ease-in-out, left .3s ease-in-out, transform 0s ease-in-out";
      id = "P" + theplayer;
      player_details[id] = {
        ID: id,
        Position_Num:temp_num,
        Player: Player_values[box][3],
        Player_Name:"Player"+(box+1),
        Initial_Position: Player_values[box][4],
        Current_Location: 0,
        Y_Axis: y + topof,
        X_Axis: x + leftof,
        Moved: 0,
        Status: 1,
        Color:color[1],
      };
      theplayer++;
      temp_num++;
    }
  }
  Player_selection()
}

function pop_array(ThePR,Name){
  let Color = move_pattern.indexOf(ThePR);
  if (Color !== -1) {
      move_pattern.splice(Color, 1);
  }
  let Pla = added_player.indexOf(Name);
  if (Pla !== -1) {
    added_player.splice(Pla, 1);
  }
}

function check_collision(object_id,ActivePlayer) {
  Main_Flag=0;
  num_players = Object.keys(player_details).length;
  object_Collied = [];
  object=document.getElementById("box-"+object_id)
  for (i = 0; i < num_players; i++) {
    id = "P" + i;
    if (player_details[id]["Current_Location"] == object_id) {
      flag = 1;
      object_Collied.push(id);
    }
  }
  if (object_Collied.length == 1) {
    return false;
  } else {
    flag = 0;
    for (k = 0; k < safe_zone.length; k++) {
      if (safe_zone[k] == object_id) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      for(k=0;k<object_Collied.length;k++){
        if(player_details[ActivePlayer]["Player"]!=player_details[object_Collied[k]]["Player"]){
            backtohome(player_details[object_Collied[k]]["ID"])
            rearrage(object_id)
            Main_Flag=1;
        }
      }
      
    }
    if(Main_Flag==1){
      return true;
    }else{
      return false;
    }
    
  }
}

function backtohome(Player_id){
    delay=50
    object=document.getElementById(Player_id)
    start=player_details[Player_id]["Moved"];
    end=1
    for (let k = start; k > end; k--) {
        current=player_details[Player_id]["Current_Location"]=player_details[Player_id]["Current_Location"]-1
        if(current<=0){
          current=player_details[Player_id]["Current_Location"]=52
        }
        target=document.getElementById("box-"+current);
            (function (current, object, target) {
              object.style.transition = "top .05s ease-in-out, left 0.05s linear";
              setTimeout(function () {
                object.style.transform = "scale(1)";
                setTimeout(() => {
                  target.style.backgroundColor=colors[player_details[Player_id]["Color"]];
              }, bgcolorin);
                setTimeout(() => {
                  target.style.backgroundColor="white";
                }, bgcolorout);
                movement(object, current);
                  if (player_details[Player_id]["Initial_Position"] ==current) {
                    player_details[Player_id]["Current_Location"]=0
                    player_details[Player_id]["Moved"]=0
                      setTimeout(()=>{
                        object.style.transition = "top 0.5s ease-in-out, left 0.5s ease-in-out";
                          
                            object.style.top = player_details[Player_id]["Y_Axis"]+ "px";
                            object.style.left= player_details[Player_id]["X_Axis"] + "px";
                      },100);
                }
              }, o * delay);
            })(current, object, target);
            
        o++;
      }
}



function rearrage(objectid) {
  num_players = Object.keys(player_details).length;
  players = [];
  for (i = 0; i < num_players; i++) {
    id = "P" + i;
    if (player_details[id]["Current_Location"] == objectid) {
         players.push(id);
    }
  }
  object=document.getElementById("box-"+objectid);

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
    thepr.style.transition = "top 0.4s ease-in-out, left 0.4s ease-in-out, transform 0.2s ease-in-out";
    left_value = x + leftof - (players.length + toleft);
    thepr.style.transform = "scale(" + scale + ")";
    thepr.style.left = left_value + dist + "px";
    dist += space;
  }
}


function winner_check(Player_id){
  num_players = Object.keys(player_details).length;
  flag=0
  for (i = 0; i < num_players; i++) {
    id = "P" + i;
    if (player_details[Player_id]["Player"] == player_details[id]["Player"]) {
         if(player_details[id]["Current_Location"]!=(player_details[id]["Player"]+"6")){
          flag=1;
        }
    }
  }
  if(flag==0){
    winner=player_details[Player_id]["Color"];
    result.push(player_details[Player_id]["Player_Name"])
    pop_array(winner[0],player_details[Player_id]["Player_Name"])
    console.log(player_details[Player_id]["Player_Name"]+"  "+player_details[Player_id]["Color"]+" Player Won")
  }
}



function Player_selection(){
  num_players = Object.keys(player_details).length;
  flag=0
  if(move_pattern.length<=1){
    result_show()
    return;
  }
  var Color
  for(k=0;k<num_players;k++){
    id="P"+k;
    if(player_details[id]['Player']==move_pattern[Selected_Player]){
      document.getElementById(id).style.pointerEvents= "all";
      Color=player_details[id]['Color']
      flag=1
    }
    else{
      document.getElementById(id).style.pointerEvents= "none";
      document.getElementById("home-"+player_details[id]['Color']).classList.remove("Active")
    }
  }
  if(flag==1){
    document.getElementById("home-"+Color).classList.add("Active")
  }else{
    Selected_Player++;
    if(Selected_Player>=move_pattern.length){
      Selected_Player=0
    }
    Player_selection()
  }
}


function undice(Mode){
  if(Mode==1 && thenumber!=6){
    Selected_Player++;
    if(Selected_Player>=move_pattern.length){
      Selected_Player=0
    }
  }
  document.getElementsByClassName("dice-throw")[0].style.backgroundColor="red"
  Player_selection()
}

function dice(){
  num_players = Object.keys(player_details).length;
  if(!next_move){
    // thenumber=Math.random() < 0.5 ? 1 : 6;
    thenumber=Math.floor(Math.random() * 6) + 1;
    
    diceset(thenumber);
    setTimeout(()=>{
      document.getElementById("dice").src="Images/Dice/D"+thenumber+".png"
      next_move = true;
      flag=0;
      count=0;
      if(thenumber!=6){
        for(k=0;k<num_players;k++){
          id="P"+k;
          if(player_details[id]['Player']==move_pattern[Selected_Player]){
            if(player_details[id]['Moved']!=0 && player_details[id]['Moved']!=57){
              if((player_details[id]['Moved']+thenumber)<=57){
                flag=1;
                document.getElementById(id).style.pointerEvents= "all";
                count++;
                obj=document.getElementById(id)
              }else{
                document.getElementById(id).style.pointerEvents= "none";
              }
            }else{
              document.getElementById(id).style.pointerEvents= "none";
            }
          }
        }
      }else{
        for(k=0;k<num_players;k++){
          id="P"+k;
          if(player_details[id]['Player']==move_pattern[Selected_Player]){
            if(player_details[id]['Moved']!=57){
              if((player_details[id]['Moved']+thenumber)<=57){
                flag=1;
                document.getElementById(id).style.pointerEvents= "all";
                count++;
                obj=document.getElementById(id)
              }else{
                document.getElementById(id).style.pointerEvents= "none";
              }
            }else{
              document.getElementById(id).style.pointerEvents= "none";
            }
          }
        }
      }
      if(flag==0){
        next_move=false
        Selected_Player++;
        if(Selected_Player>=move_pattern.length){
          Selected_Player=0
        }
        document.getElementsByClassName("dice-throw")[0].style.backgroundColor="red"
        Player_selection()
      }else{
        if(count==1){
          move_object(obj)
        }
      }
      
    },1000)
    
  }
}

function diceset(final_num){
  document.getElementsByClassName("dice-throw")[0].style.backgroundColor="rgb(172, 234, 177)"
  dice_spin=document.getElementById("dice-spin")
  dice_image=document.getElementById("dice")
  dice_spin.classList.add("Spin");
  settr=0
  for(k=0;k<=12;k++){
    (function (dice_spin,dice_image,k,settr) {
      setTimeout(()=>{
        do{
          image_t=Math.floor(Math.random() * 6) + 1;
        }while(settr==image_t);
        
        if(k>10){
          image_t=final_num
        }
        dice_image.src="Images/Dice/D"+image_t+".png";
        if(k==12){
          dice_spin.classList.remove("Spin")
        }
      },k*70)
      
    })(dice_spin,dice_image,k,settr)
  };
}

function result_show(){
  console.log("--------------")
  console.log("<---Winners--->")
  for(i=0;i<result.length;i++){
    console.log("--------------")
    console.log("W"+(i+1)+". "+result[i])
  }
  console.log("--------------")
  console.log("L"+(i+1)+". "+added_player[0])
  console.log("--------------")
  console.log("..............")
}

