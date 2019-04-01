/*  Range of Movement   */
Player.prototype.setRange = function(p) {
  $("div#map > div").removeClass('range');
  
  rX=[];
  rY=[]; 
  
  var up=p-10, down=p+10, left=p-1, right=p+1, blocked = false;
  var xmin = p-p%10;
  var xmax = xmin+9;
  
  while(up >=0 && up >= p-30){
    blocked = false;
    var classList = $("div#"+up).attr('class').split(/\s+/);
    
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#"+up).addClass('range');
      rY.push(up);
    }
    up = up-10;
  }
  
  while(down <= 99 && down <= p+30){
    blocked = false;
    var classList = $("div#"+down).attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#"+down).addClass('range');
      rY.push(down);
    }
    down = down+10;
  }

  while(left >= xmin && left >= p-3){
    blocked = false;
    var classList = $("div#"+left).attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#"+left).addClass('range');
      rX.push(left);
    }
    left=left-1;
  }
  
  while(right <= xmax && right <= p+3){
    blocked = false;
    var classList = $("div#"+right).attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
      if (item === 'block' || item === 'player2' || item === 'player1') {
          blocked = true;
      }
    });
    if(blocked === true){
      break;
    }else{
      $("div#"+right).addClass('range');
      rX.push(right);
    }
    right=right+1;
  }

  return [rX,rY];
};

/*  Change active player   */
Player.prototype.activatePlayer = function() {
  if(this.name === 'player1'){
    activePlayer = player1;
    passivePlayer = player2;
  }else{
    activePlayer = player2;
    passivePlayer = player1;
  }
  if (fight === false) {
    activePlayer.setRange(this.position);
  }
}

/* Move and check if the fight begins */
Player.prototype.move = function(target) {

  target = parseInt(target);
  //arr change
  arr.splice(this.position, 1); 
  arr[target] = this.name;

  // class change
  var oldbox = document.getElementById(this.position);
  oldbox.classList.remove(this.name);
  var newbox = document.getElementById(target);
  newbox.classList.add(this.name);

  //check for weapon
  var searchFrom = this.position;
  var searchTo = target;
  checkWeapon(searchFrom, searchTo, target);   

  this.position = target;
  adjacents= [target-1,target+1,target-10,target+10];

  switch(this.name) {
    case 'player1':
      newbox.innerHTML = '<img src="../images/'+this.image+'" height="58"></img>';
      break;
    case 'player2':
      newbox.innerHTML = '<img src="../images/'+this.image+'" height="58"></img>';
      break;
  }
  oldbox.innerHTML = "";
  

  $.each(adjacents, function(index, adjacent) {
    if ($("#"+adjacent).find('img').length) {
      fight = true;
    }
  });

  if(fight === false ){
    passivePlayer.activatePlayer();  //player change
    
  }else{
    //fight  
    rX=[]; rY=[];
    $("div#map > div").removeClass('range');
    fightButtonEnabling();

    $('#fightModal').modal('show');
     var timeleft = 3;
        var downloadTimer = setInterval(function(){
        timeleft--;
        document.getElementById("countdown3").textContent = timeleft;
        if(timeleft <= 0)
            clearInterval(downloadTimer);
        },1000);

    setTimeout(function() {
        $('#fightModal').modal('hide');
    }, 3000);

  } 

};

player1.activatePlayer();  //starting player


/*  Movements   */

box.hover(function(){
    if (jQuery.inArray(parseInt(this.id), rX) >= 0 || jQuery.inArray(parseInt(this.id), rY) >= 0) { 
      $(this).addClass(window.activePlayer.name+'Moving') ;
    }
  }, function(){
    $(this).removeClass(window.activePlayer.name+'Moving');
});

box.on("click", function() {
  var target = parseInt(this.id); 
  if (jQuery.inArray(target, rX) >= 0 || jQuery.inArray(target, rY) >= 0) { 
    box.removeClass(window.activePlayer.name+'Moving');
    activePlayer.move(target);
  }
});



/*  Change weapon  */
function checkWeapon(searchFrom, searchTo, target) {
  var diff=searchTo-searchFrom;
  var movedArr = [];
  if (diff > 0){
    if (diff <= 3){
      for(var i = searchFrom; i <= searchTo; i++){
        if (jQuery.inArray(i, rX) >= 0) { 
          movedArr.push(i);
        }
      }
    }else{
      for(var i = searchFrom; i <= searchTo; i+=10){
        if (jQuery.inArray(i, rY) >= 0) { 
          movedArr.push(i);
        }
      }
    }
  }else{
    if (diff >= -3){
      for(var i = searchFrom; i >= searchTo; i--){
        if (jQuery.inArray(i, rX) >= 0) { 
          movedArr.push(i);
        }
      }
    }else{
      for(var i = searchFrom; i >= searchTo; i-=10){
        if (jQuery.inArray(i, rY) >= 0) { 
          movedArr.push(i);
        }
      }
    }
  }
  for(var j = 0; j <= movedArr.length; j++){
    var passedBox=$( "div#"+movedArr[j] );
    
    oldWeapon = activePlayer.weapon;

    if (passedBox.hasClass("knife")){
      newWeapon = 'knife';
      activePlayer.damage = 12;
    }else if (passedBox.hasClass("axe")){
      newWeapon = 'axe';
      activePlayer.damage = 14;
    }else if (passedBox.hasClass("arrow")){
      newWeapon = 'arrow';
      activePlayer.damage = 16;
    }else if (passedBox.hasClass("gun")){
      newWeapon = 'gun';
      activePlayer.damage = 18;
    }else{
      newWeapon='';
    }

    if (newWeapon!=''){
      passedBox.removeClass(newWeapon);
      passedBox.addClass(oldWeapon);
      activePlayer.weapon = newWeapon;
      $("#"+activePlayer.name+"knife").addClass('transparent');
      $("#"+activePlayer.name+"axe").addClass('transparent');
      $("#"+activePlayer.name+"arrow").addClass('transparent');
      $("#"+activePlayer.name+"gun").addClass('transparent');
      $("#"+activePlayer.name+"knife").removeClass('range');
      $("#"+activePlayer.name+"axe").removeClass('range');
      $("#"+activePlayer.name+"arrow").removeClass('range');
      $("#"+activePlayer.name+"gun").removeClass('range');
      $("#"+activePlayer.name+newWeapon).removeClass('range');
      $("#"+activePlayer.name+newWeapon).addClass('range');
      $("#"+activePlayer.name+"damage").text(activePlayer.damage);
    }
  }
}


