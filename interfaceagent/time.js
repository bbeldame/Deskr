var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);

window.onload = function()
{
var showText = function (target, msg, index, interval) {
        if (index < msg.length) {
            $(target).append(msg[index++]);
            setTimeout(function () { showText(target, msg, index, interval); }, interval);
        }
    }

    $(function () {
        setTimeout(function(){
            showText("#notes_list","- Paris", 0, 100);
        }, 12100);
        setTimeout(function(){
            document.getElementById("notes_list").innerHTML += "<br/>"
            showText("#notes_list","- 4 pièces", 0, 100);
        }, 14500);
        setTimeout(function(){
            document.getElementById("notes_list").innerHTML += "<br/>"
            showText("#notes_list","- Budget 860 000€", 0, 100);
        }, 16700);
        setTimeout(function(){
            document.getElementById("notes_list").innerHTML += "<br/>"
            showText("#notes_list","- 1 salle de bain", 0, 100);
        }, 18900);
        setTimeout(function(){
            document.getElementById("notes_list").innerHTML += "<br/>"
            showText("#notes_list","- Grand salon", 0, 100);
        }, 22100);
        setTimeout(function(){
            document.getElementById("notes_list").innerHTML += "<br/>"
            showText("#notes_list","- Avec ascenseur", 0, 100);
        }, 24300);
        setTimeout(function(){
            document.getElementById("notes_list").innerHTML += "<br/>"
            showText("#notes_list","- Parking", 0, 100);
        }, 26500);
    })
}