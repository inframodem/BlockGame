var checkboxes = new Array();
var xmlhttp = new XMLHttpRequest();
var tbinfo;
xmlhttp.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
  tbinfo = JSON.parse(this.responseText);
    for(var i = 1; i <= tbinfo.TowerBattles.towers.length - 1;i++){
      checkboxes.push(document.getElementById("formCheck-" + i));
    }
    var getCookie = JSON.parse(Cookies.get('tbtowers'));
    for(var i = 0; i < checkboxes.length; i++){
      checkboxes[i].checked = getCookie[i];
    }
  }


};
xmlhttp.open('GET','TowerInformation.json', true);
xmlhttp.send();

function SaveTowers(){
  var selectedBoxes = new Array();
  for(var i = 0; i < tbinfo.TowerBattles.towers.length - 1;i++){
    selectedBoxes.push(checkboxes[i].checked);
  }
  Cookies.set('tbtowers', JSON.stringify(selectedBoxes), {sameSite: 'strict', expires: 10000});
}

function GenerateTowers(){
  var selectedBoxes = new Array();
  for(var i = 0; i < tbinfo.TowerBattles.towers.length - 1;i++){
    if(checkboxes[i].checked == true){
      selectedBoxes.push(i);
    }
  }

  var selectvalue = parseInt(document.getElementById("numSelect").value);
  if(selectvalue > 5){
    selectvalue = Math.floor(Math.random() * (5 - 1) + 1);
  }
  for(var i = 1; i <= 5; i++){
    if(selectvalue > 0){
      var currRandom = Math.floor(Math.random() * (selectedBoxes.length - 0) + 0);
      var currstrong = document.getElementById("strong-" + i);
      currstrong.innerHTML = tbinfo.TowerBattles.towers[selectedBoxes[currRandom] + 1].name;
      var currem = document.getElementById("em-" + i);
      currem.innerHTML = tbinfo.TowerBattles.towers[selectedBoxes[currRandom] + 1].desc;
      var currimg = document.getElementById("image-" + i);
      currimg.src = tbinfo.TowerBattles.towers[selectedBoxes[currRandom] + 1].image;
      selectedBoxes.splice(currRandom,1);
    }
    else{
      var currstrong = document.getElementById("strong-" + i);
      currstrong.innerHTML = tbinfo.TowerBattles.towers[0].name;
      var currem = document.getElementById("em-" + i);
      currem.innerHTML = tbinfo.TowerBattles.towers[0].desc;
      var currimg = document.getElementById("image-" + i);
      currimg.src = tbinfo.TowerBattles.towers[0].image;
    }
    selectvalue--;
  }
}
