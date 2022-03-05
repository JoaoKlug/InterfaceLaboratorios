var estado_fechadura = false
console.log(estado_fechadura);
var element = document.getElementById("estadofechadura");

if (estado_fechadura == false){
    element.style.backgroundColor = "#FF0000";
}else{
    element.style.backgroundColor = "#00ff00";
}