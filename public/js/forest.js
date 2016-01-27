var subtleness = 20; // The higher this number the more subtle the effect will be
var max_width = 700; // Your max width without px
var piece1 = $(".p1"); // Elem
var piece2 = $(".p2"); // Elem
var piece3 = $(".p3"); // Elem
var piece4 = $(".p4"); // Elem
var piece5 = $(".p5"); // Elem
var piece6 = $(".p6"); // Elem

function reset(){
  piece.attr("style", "transform: rotate(0deg)")
}

$(document).on("mousemove",function(e) {
  if($(window).width() > max_width){ // Do the check
    var ax = -($(window).innerWidth()/2- e.pageX)/subtleness;
    var ay = ($(window).innerHeight()/2- e.pageY)/subtleness;
    piece1.attr("style", "transform:translateX(" + -(ax/16) + "px)");
    piece2.attr("style", "transform:translateX(" + ax/16 + "px)");
    piece3.attr("style", "transform:translateX(" + -(ax/15) + "px)");
    piece4.attr("style", "transform:translateX(" + ax/15 + "px)");
    piece5.attr("style", "transform:translateX(" + -(ax/14) + "px)");
    piece6.attr("style", "transform:translateX(" + ax/13 + "px)");
  } else {
    reset();
  }
});
