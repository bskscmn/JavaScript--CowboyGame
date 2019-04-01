/*  Generate the map   */
var map = document.getElementById("map");

function createMap(numberGrids) {
    for (var i = 0; i < numberGrids; i++) {
      var gridDiv = document.createElement("div");
      gridDiv.id = i;
      gridDiv.classList.add("grid");
      map.appendChild(gridDiv)
    }
}
createMap(100);

$('#startModal').modal('show');
 var timeleft = 5;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdown5").textContent = timeleft;
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    },1000);

setTimeout(function() {
    $('#startModal').modal('hide');
}, 5000);