import './style.scss';

function toggleDrawer() {
    var drawer = document.getElementById("drawerMenu");
    var drawerWidth = window.getComputedStyle(drawer).width; // Get the computed style
    
    if (drawerWidth !== "0px") { // Check if the drawer is not closed
        drawer.style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    } else {
        drawer.style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
}
window.toggleDrawer = toggleDrawer;
