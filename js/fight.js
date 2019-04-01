
function attack() {
	if(passivePlayer.protected===true){
    passivePlayer.lifePoint -= activePlayer.damage/2;
    passivePlayer.protected = false;
  }else{
  	passivePlayer.lifePoint -= activePlayer.damage;
  }
  
  if(passivePlayer.lifePoint<0){ passivePlayer.lifePoint=0; }
  $("#"+passivePlayer.name+"LP").text(passivePlayer.lifePoint);

  if(passivePlayer.lifePoint===0){
  	if(activePlayer.name==="player1"){
  		activePlayer.name = "Player 1";
  	}else{
  		activePlayer.name = "Player 2";
  	}	
  	$("#winnerModal .modal-body p:nth-child(3)").text(activePlayer.name);
  	$("#winner").attr("src","../images/"+activePlayer.image);

    $("#winnerModal").modal();

    $(".fightBtn > input").attr('disabled', 'disabled');
    $("div#map > div").removeClass('range');
  }else{
    passivePlayer.activatePlayer();
    fightButtonEnabling();
  }    
};

function defend(){
    activePlayer.protected = true;
    passivePlayer.activatePlayer();
    fightButtonEnabling();
}

function fightButtonEnabling(){
  if (activePlayer === player1){
    buttonP1A.removeAttr('disabled');
    buttonP1D.removeAttr('disabled');
    buttonP2A.attr('disabled', 'disabled');
    buttonP2D.attr('disabled', 'disabled');
  }else{
    buttonP2A.removeAttr('disabled');
    buttonP2D.removeAttr('disabled');
    buttonP1A.attr('disabled', 'disabled');
    buttonP1D.attr('disabled', 'disabled');
  }
}