Total_player = 2;

player_details = [];

thenumber = 5;

Won=0;

heigth_value=700;
width_value=620;


Selected_Player=0;
default_move_pattern=['B','R','G','Y'];
move_pattern=[];

player_names=[]

bgcolorin=10;
bgcolorout=600

const colors = {"Blue":"rgb(200, 220, 270)","Red":"rgb(270, 200, 200)","Green":"rgb(200, 270, 238)","Yellow":"rgb(230, 242, 200)"}
player_color=["Blue","Red","Green","Yellow"]

next_move = false;
dice_throw=false

var result=[];
var added_player=[]

Player_values=[];

player_box = [];
player_box[0] = ["player-Red", 54, 38, "R", 2, 36, 26];
player_box[1] = ["player-Blue", 54, 400, "B", 41, 36, 224];
player_box[2] = ["player-Green", 414, 38, "G", 15, 234, 26];
player_box[3] = ["player-Yellow", 414, 400, "Y", 28, 234, 224];
safe_zone = [2,10, 15,23, 28,36, 41,49];

function move_object(object) {
  if (next_move) {
    theobject_id = object.id;
    next_move = false;
    if (player_details[theobject_id]["Status"] == 1) {
      object.style.transition = "top .5s ease-in-out, left .5s ease-in-out, transform 0.1s ease-in-out";
      object.style.transform = "scale(1)";
      available_moves(0,1)
      if (player_details[theobject_id]["Current_Location"] == 0) {
        if(thenumber==6){
            player_details[theobject_id]["Current_Location"] = num =
            player_details[theobject_id]["Initial_Position"];
            newobject=document.getElementById('box-'+num)
            movement(object, num);
            setTimeout(()=>{
              undice(0);
              rearrage(num);
            },500)
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
    if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
      x = elementRect.left - parentRect.left+142;
      y = elementRect.top - parentRect.top+127;
    }else{
      x = elementRect.left - parentRect.left+245;
      y = elementRect.top - parentRect.top+215;
    }
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top;

  } else if (position_id == "G6") {

    if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
      x = elementRect.left - parentRect.left+131;
      y = elementRect.top - parentRect.top+139;
    }else{
      x = elementRect.left - parentRect.left+225;
      y = elementRect.top - parentRect.top+250;
    }
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top;

  } else if (position_id == "B6") {
    if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
      x = elementRect.left - parentRect.left+132;
      y = elementRect.top - parentRect.top+112;

    }else{
      x = elementRect.left - parentRect.left+225;
      y = elementRect.top - parentRect.top+190;
    }
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top;

  } else if (position_id == "Y6") {
    if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
      x = elementRect.left - parentRect.left+115;
      y = elementRect.top - parentRect.top+127;
    }else{
      x = elementRect.left - parentRect.left+203;
      y = elementRect.top - parentRect.top+215;
    }
    board = document.getElementById("board");
    topof = board.getBoundingClientRect().top;

  } else {
    inger = 4;
    x = elementRect.left - parentRect.left;
    y = elementRect.top - parentRect.top;
    board = document.getElementById("board");
    if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
      leftof = board.getBoundingClientRect().left+2;
      topof = board.getBoundingClientRect().top + inger - 9;
    }else{
      leftof = board.getBoundingClientRect().left+6;
      topof = board.getBoundingClientRect().top + inger - 12;
    }
  }

  object.style.top = y + topof + "px";
  object.style.left = x + leftof + "px";
  
}



window.onresize=thescreensize; 
function thescreensize() {
  home_t=document.getElementById("home-Red")
  width_y=home_t.offsetWidth
  base=document.querySelectorAll(".win-image")
  for(jk=0;jk<base.length;jk++){
  base[jk].style.width=width_y+"px"
  base[jk].style.height=width_y+"px"
  }

  num_players = Object.keys(player_details).length;
  for(ty=0;ty<num_players;ty++){
    id="P"+ty;
    object=document.getElementById(id);
    object.style.transition = "all 0s";
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
      if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
        leftof = board.getBoundingClientRect().left + Player_values[box][5];
        topof = board.getBoundingClientRect().top + Player_values[box][6];
        
      }else{
        leftof = board.getBoundingClientRect().left + Player_values[box][1];
        topof = board.getBoundingClientRect().top + Player_values[box][2];
      }

      player_details[id]['Y_Axis']=y+topof;
      player_details[id]['X_Axis']=x+leftof;
      

    if(player_details[id]['Current_Location']!=0){
      Position=player_details[id]['Current_Location'];
      movement(object,Position)
      object.style.transition = "all 0s";
      rearrage(player_details[id]['Current_Location'])
    }else{
      object.style.top = player_details[id]['Y_Axis'] + "px";
      object.style.left = player_details[id]['X_Axis'] + "px";

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
    play_value=document.getElementById("player-"+color[1]+"-Title").innerHTML=player_names[box];
    added_player.push(player_names[box])
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
        Player_Name:player_names[box],
        Initial_Position: Player_values[box][4],
        Current_Location: 0,
        Y_Axis: y + topof,
        X_Axis: x + leftof,
        Moved: 0,
        Status: 1,
        Color:color[1],
        Collision:1
      };
      theplayer++;
      temp_num++;
      object=document.getElementById(id)
    }
  }
  Player_selection()
  thescreensize()
  dice_throw=true
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
    toleft = players.length-2;
  }
  if(window.innerWidth<=width_value || window.innerHeight<=heigth_value){
    leftof = board.getBoundingClientRect().left;
    space=space-1;
    toleft = players.length-5;
  }else{
    leftof = board.getBoundingClientRect().left + 4;
  }
  for (i = 0; i < players.length; i++) {
    thepr = document.getElementById(players[i]);
    player_details[players[i]]["Collision"]=scale
    thepr.style.transition = "transform 0.2s ease-in-out";
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
    Won++;
    winner_box=document.getElementById(winner+"-Win")
    winner_box.style.backgroundImage="url(Images/Other/Winner"+Won+".png)";
    winner_box.style.display="grid";
    console.log(player_details[Player_id]["Player_Name"]+"  "+player_details[Player_id]["Color"]+" Player Won")
  }
}



function Player_selection(){
  num_players = Object.keys(player_details).length;
  flag=0
  if(move_pattern.length<=1){
    setTimeout(()=>{
      result_show()
    },800)
    
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
  dice_throw=true
  if(Mode==1 && thenumber!=6){
    Selected_Player++;
    if(Selected_Player>=move_pattern.length){
      Selected_Player=0
    }
  }
  document.getElementsByClassName("dice-throw")[0].style.backgroundColor="red"
  Player_selection()
}

h=-1;
diceY=[6,1]
function dice(){
  num_players = Object.keys(player_details).length;
  if(dice_throw){
    dice_throw = false;
    // thenumber=Math.random() < 0.5 ? 1 : 6;
    thenumber=Math.floor(Math.random() * 6) + 1;

    // h++
    // if(h>=diceY.length){
    //   h=0
    // }
    // thenumber=diceY[h]

    temp_id=[]
    diceset(thenumber);
    setTimeout(()=>{
      document.getElementById("dice").src="Images/Dice/D"+thenumber+".png"
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
                temp_id.push(id)
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
                temp_id.push(id)
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
        dice_throw=true
        Selected_Player++;
        if(Selected_Player>=move_pattern.length){
          Selected_Player=0
        }
        document.getElementsByClassName("dice-throw")[0].style.backgroundColor="red"
        Player_selection()
      }else{
        if(count==1){
          move_object(obj)
        }else{
          if(count!=0){
            available_moves(temp_id,0)
          }
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
          next_move=true
        }
      },k*70)
      
    })(dice_spin,dice_image,k,settr)
  };
}

function result_show(){
  result.push(added_player[0])
  document.getElementById("results-out").style.display="grid";
  num_players = Object.keys(player_details).length;
  for(i=0;i<result.length;i++){

    for(ka=0;ka<num_players;ka++){
      id="P"+ka
      if(player_details[id]['Player_Name']==result[i]){
        color=player_details[id]['Color']
        break
      }
    }
    
    const Result_tr = document.createElement("tr");

    const Result_td1 = document.createElement("td");
    const Result_tdimgcr = document.createElement("img");
      Result_tdimgcr.src="Images/Other/Winner"+(i+1)+".png"
      Result_tdimgcr.style.transform="scale(2.4)"
      Result_td1.appendChild(Result_tdimgcr)


    const Result_td2 = document.createElement("td");
    const text = document.createTextNode(result[i].slice(0, 10));
    const Result_tdimg = document.createElement("img");
    Result_tdimg.src="Images/Player/"+color+".png"
    Result_tdimg.loading="lazy"
    Result_td2.appendChild(Result_tdimg)
    Result_td2.appendChild(text)

    const Result_td3 = document.createElement("td");
    if(i<result.length-1){
      Result_td3.innerHTML="Winner";
    }else{
      Result_td3.innerHTML="Loser";
    }
    

    Result_tr.appendChild(Result_td1)
    Result_tr.appendChild(Result_td2)
    Result_tr.appendChild(Result_td3)

    document.getElementById('result_out').appendChild(Result_tr)
  }
}


var previous=2;
function player_control(Num) {
  const container = document.getElementById('players-alr');
  count = document.querySelectorAll(".players-image").length;
  Player_in=[]
  for(i=0;i<count;i++){
    Player_in.push(document.getElementById("Player"+(i+1)+"-in-value").value)
  }
  if(previous==4){
    container.innerHTML="";
    count=0
  }
  if(Num==4){
    container.innerHTML="";
    for(i=0;i<4;i++){
      const playerSelectorHTML = `
        <div id="player${i+1}-selector">
            <div class="players-image" id="player${i+1}-images">
                <img class="select-image" id="Yellow" src="Images/Player/${player_color[i]}.png" alt="Player Yellow" srcset="">
            </div>
            <input type="text" id="Player${i+1}-in-value" value="Player${i+1}">
        </div>`;
        container.innerHTML += playerSelectorHTML;
    }
    for(i=0;i<count;i++){
      document.getElementById("Player"+(i+1)+"-in-value").value=Player_in[i]
    }
  }else{
    if (Num > count) {
        for (let i = count; i < Num; i++) {
            const playerSelectorHTML = `
            <div id="player${i+1}-selector">
                <div class="players-image" id="player${i+1}-images">
                    <img class="select-image" loading="lazy" onclick="color_selector(this,${i+1})" id="Blue" src="Images/Player/Blue.png" alt="Player Blue" srcset="">
                    <img class="select-image" loading="lazy" onclick="color_selector(this,${i+1})" id="Red" src="Images/Player/Red.png" alt="Player Red" srcset="">
                    <img class="select-image" loading="lazy" onclick="color_selector(this,${i+1})" id="Green" src="Images/Player/Green.png" alt="Player Green" srcset="">
                    <img class="select-image" loading="lazy" onclick="color_selector(this,${i+1})" id="Yellow" src="Images/Player/Yellow.png" alt="Player Yellow" srcset="">
                </div>
                <input type="text" id="Player${i+1}-in-value" value="Player${i+1}">
            </div>`;
            container.innerHTML += playerSelectorHTML;
            parent=document.getElementById("player"+(i+1)+"-images");
            newcolor=color_chooser((i+1),0)
          parent.querySelector("#"+newcolor).classList.add('Select')
        }
        if(previous==4){
          count = document.querySelectorAll(".players-image").length;
        }
        for(i=0;i<count;i++){
          document.getElementById("Player"+(i+1)+"-in-value").value=Player_in[i]
        }
    } else if (Num < count) {
        for (let i = count; i > Num; i--) {
            const playerElement = document.getElementById(`player${i}-selector`);
            if (playerElement) {
                playerElement.remove();
            }
        }
    }
  }
  previous=Num
}


function color_selector(object,num){
  parent=document.getElementById("player"+(num)+"-images");
  images=parent.querySelectorAll(".select-image");
  for(i=0;i<images.length;i++){
    images[i].classList.remove("Select")
  }
  object.classList.add("Select")
  color=object.id
  imgs=document.querySelectorAll(".players-image").length;
  for(i=0;i<imgs;i++){
    if(i+1!=num){
      parent=document.getElementById("player"+(i+1)+"-images");
      old=parent.querySelector("#"+color)
      if (old.classList.contains('Select')) {
        old.classList.remove('Select')
        newcolor=color_chooser((i+1),0)
        parent.querySelector("#"+newcolor).classList.add('Select')
        break;
      }
    }
  }
}

function color_chooser(num,index){
  imgs=document.querySelectorAll(".players-image").length;
  newcolor=player_color[index];
  for(j=0;j<imgs;j++){
    if(j+1!=num){
      newparent=document.getElementById("player"+(j+1)+"-images");
      old1=newparent.querySelector("#"+player_color[index])
      if (old1.classList.contains('Select')) {
        newcolor=color_chooser(num,(index+1))
        break;
      }
    }
  }
  return newcolor;
}


function play_game(){
  count = document.querySelectorAll(".players-image").length;
  for(i=0;i<count;i++){
    value_data=document.getElementById("Player"+(i+1)+"-in-value").value
    if(value_data==''){
      value_data="Player"+(i+1)
    }
    value_data=value_data.slice(0, 15)
    player_names.push(value_data)
  }
  if(count==4){
    move_pattern=default_move_pattern
  }else{
    for(i=0;i<count;i++){
      parent=document.getElementById("player"+(i+1)+"-images")
      images=parent.querySelectorAll(".select-image")
      for(j=0;j<images.length;j++){
        if (images[j].classList.contains('Select')) {
          color=images[j].id
          move_pattern.push(color[0])
        }
      }
    }
  }
  
  document.querySelector(".Player-Create").style.display="none";
  player_numbers()
  thescreensize()
}


function available_moves(Pr_id_ar,Mode){
  if(Mode==0){
    value=(document.getElementById('board').offsetWidth)-40
    for(tr1=0;tr1<Pr_id_ar.length;tr1++){
      const object = document.getElementById(Pr_id_ar[tr1]);
      const rect = object.getBoundingClientRect();
      select=document.createElement('div')
      select.className = "selected-player";
      if(value>350){
        br=2
        topoffset=((rect.top)+35);
        leftoffset=((rect.left)+9.43);
        if(player_details[Pr_id_ar[tr1]]["Collision"]!=1){
          topoffset=topoffset-9;
          leftoffset=leftoffset-2.5
          // select.style.transform="scale("+(player_details[Pr_id_ar[tr1]]["Collision"]-.2)+")"
        } 
        // select.style.transform="scale(20)"
      }else{
        br=1.5
        topoffset=((rect.top)+18);
        leftoffset=((rect.left)+3.5);
        // select.style.transform="scale("+player_details[Pr_id_ar[tr1]]["Collision"]+")"
        if(player_details[Pr_id_ar[tr1]]["Collision"]!=1){
          topoffset=topoffset-5;
          leftoffset=leftoffset-1.5
          // select.style.transform="scale("+(player_details[Pr_id_ar[tr1]]["Collision"]-.2)+")"
        } 
      }
      
      

      select.style.top=topoffset+"px";
      select.style.left=leftoffset+"px";

      if(player_details[Pr_id_ar[tr1]]['Moved']==0 || 
        player_details[Pr_id_ar[tr1]]['Initial_Position']==player_details[Pr_id_ar[tr1]]['Current_Location'] ||
        player_details[Pr_id_ar[tr1]]['Moved']>51){
        select.style.border=br+"px solid white"
      }else{
        select.style.border=br+"px solid rgb(0, 0, 0)"
      }
      document.body.appendChild(select)
    }
  }else{
    spins=document.querySelectorAll(".selected-player")
    for(re=0;re<spins.length;re++){
      spins[re].remove()
    }
  }
  
}
