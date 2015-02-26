var width_el = document.getElementById("widthEl");
var height_el = document.getElementById("heightEl");

var updateValues = function () {
    var width = viewportSize.getWidth();
    var height = viewportSize.getHeight();

    width_el.innerHTML = width;
    height_el.innerHTML = height;
};

if (window.addEventListener) {
    window.addEventListener("resize", updateValues, false);
    window.addEventListener("DOMContentLoaded", updateValues, false);
    window.addEventListener("load", updateValues, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", updateValues);
}