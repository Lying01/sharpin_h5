function autoWidth() {//按屏幕变动自动改变宽高
    var $height = window.screen.height / 3;
    $(".carousel-inner img").css("height", $height);
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
    // console.log("显示选项卡");
    //计算modal的高度
    var $a = parseInt($(".goods-info").css("height"));//头部信息高度
    var $b = parseInt($(".option").css("height")) * 2;//选项部分高度
    var $c = parseInt($(".numberSelector").css("height"));//购买数量高度
    var $modal_height = $a + $b +$c + 50;//所需modal高度
    var $img_bottom = $modal_height - 70;//商品图距离底部高度
    // console.log($modal_height);
    $(".modal_all").css("height", $modal_height);
    $(".goods-info img").css("bottom", $img_bottom);
    window.onresize = showChose;//当屏幕大小变化时运行
    chose_option();//判断选项卡状态
    buy_num();//判断购买数量
}
function close_modal() {//关闭选项卡
    $(".show_modal").css("display", "none");
    // console.log("关闭选项卡")
}

//判断选项卡状态
function chose_option() {
    // var $colors_span = document.getElementById('colors').getElementsByTagName('span');//颜色
// var $spec_span = document.getElementById('spec').getElementsByTagName('span');//规格
// $colors_span[0].className = 'on';//默认选中
// $spec_span[0].className = 'on';//默认选中

    var $all_span = document.getElementsByTagName('span');//所有选项卡

    for(var i = 0; i<$all_span.length; i++)
    {
        $all_span[i].onclick = function () {//选项点击事件
            var siblings = this.parentNode.children;//与该选项同项的所有节点
            // console.log(siblings);
            for (var j=0;j<siblings.length;j++ )
            {
                siblings[j].className = '';
            }
            this.className = 'on';
        }
    }
}

//判断购买数量
function buy_num() {
    var $num = document.getElementById('number').innerText;
    var $num_down = document.getElementById('num_down');
    var $num_up = document.getElementById('num_up');
    $num_down.onclick = function(){
        // console.log($num);
        if ($num > 0)  {
           $num--;
           document.getElementById('number').innerHTML = $num;
        }
        // console.log($num);
    }
    $num_up.onclick = function(){
        // console.log($num);
        $num++;
        document.getElementById('number').innerHTML = $num;

        // console.log($num);
    }
}