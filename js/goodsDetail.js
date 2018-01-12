function autoWidth() {//按屏幕变动自动改变宽高
    var $height = window.screen.height / 3;
    $(".carousel-inner img").css("height", $height);
    $(".carousel-inner img").css("width", $height);
    if(window.screen.width < 320){//如果屏幕宽度小于320px
        var $width = window.screen.width/2-30;
        $(".shop").css("width",$width);
        $(".shop-name").css("width",$width);
        $(".shop-place").css("width",$width);
    }else if (window.screen.width >= 320){//如果屏幕宽度大于等于320px
        var $width = window.screen.width/2;
        $(".shop").css("width",$width);
        $(".shop-name").css("width",$width);
        $(".shop-place").css("width",$width);
    }
}
autoWidth();
window.onresize = autoWidth;//当屏幕大小变化时运行
function showChose() {//显示选项卡
    $(".show_modal").css("display", "block");
    $("#body").css("background-color", "#ffffff");
    $("#body").css("opacity", "0.5");

    console.log("显示选项卡")
}
function close_modal() {//关闭选项卡
    $(".show_modal").css("display", "none");
    console.log("关闭选项卡")
}