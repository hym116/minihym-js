$(document).ready(function(){
    jQuery(".scroll-box").slide({
        autoPlay:true,
        mainCell:".scroll ul",
        nextCell:".right-arrow",
        prevCell:".left-arrow",
        autoPage:true,
        effect:"left",
        vis:4,
        trigger:"click"
    });
})