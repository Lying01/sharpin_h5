var mySwiper = new Swiper('#topNav', {
    freeMode: true,
    freeModeMomentumRatio: 0.5,
    slidesPerView: 'auto',

});

swiperWidth = mySwiper.container[0].clientWidth
maxTranslate = mySwiper.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2

$(".swiper-container").on('touchstart', function(e) {
    e.preventDefault()
})

mySwiper.on('tap', function(swiper, e) {

//	e.preventDefault()

    slide = swiper.slides[swiper.clickedIndex]
    slideLeft = slide.offsetLeft
    slideWidth = slide.clientWidth
    slideCenter = slideLeft + slideWidth / 2
    // 被点击slide的中心点

    mySwiper.setWrapperTransition(300)

    if (slideCenter < swiperWidth / 2) {

        mySwiper.setWrapperTranslate(0)

    } else if (slideCenter > maxWidth) {

        mySwiper.setWrapperTranslate(maxTranslate)

    } else {

        nowTlanslate = slideCenter - swiperWidth / 2

        mySwiper.setWrapperTranslate(-nowTlanslate)

    }

    $("#topNav  .active").removeClass('active')

    $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')

})

//票券展示start

//设置数据块宽度
function autoWidth(){
    var $width =  parseInt(window.screen.width/3);
    $("#flow-box li").css("width", $width);
    console.log($width);
}
autoWidth();
window.onresize = autoWidth;

function flow(mh, mv) {//参数mh和mv是定义数据块之间的间距，mh是水平距离，mv是垂直距离
    var w = window.screen.width;//计算页面宽度
    var ul = document.getElementById("flow-box");
    var li = ul.getElementsByTagName("li");
    var iw = li[0].offsetWidth + mh;//计算数据块的宽度
    var c = Math.floor(w / iw);//计算列数
    ul.style.width = iw * c - mh + "px";//设置ul的宽度至适合便可以利用css定义的margin把所有内容居中

    var liLen = li.length;
    var lenArr = [];
    for (var i = 0; i < liLen; i++) {//遍历每一个数据块将高度记入数组
        lenArr.push(li[i].offsetHeight);
    }

    var oArr = [];
    for (var i = 0; i < c; i++) {//把第一行排放好，并将每一列的高度记入数据oArr
        li[i].style.top = "0";
        li[i].style.left = iw * i + "px";
        li[i].style.opacity = "1";
        li[i].style["-moz-opacity"] = "1";
        li[i].style["filter"] = "alpha(opacity=100)";
        oArr.push(lenArr[i]);
    }

    for (var i = c; i < liLen; i++) {//将其他数据块定位到最短的一列后面，然后再更新该列的高度
        var x = _getMinKey(oArr);//获取最短的一列的索引值
        li[i].style.top = oArr[x] + mv + "px";
        li[i].style.left = iw * x + "px";
        li[i].style.opacity = "1";
        li[i].style["-moz-opacity"] = "1";
        li[i].style["filter"] = "alpha(opacity=100)";
        oArr[x] = lenArr[i] + oArr[x] + mv;//更新该列的高度
    }

    function scroll() {//滚动加载数据
        var st = oArr[_getMinKey(oArr)];
        var scrollTop = document.documentElement.scrollTop > document.body.scrollTop? document.documentElement.scrollTop : document.body.scrollTop;
        if (scrollTop >= st - document.documentElement.clientHeight) {
            window.onscroll = null;//为防止重复执行，先清除事件
            _request(null, "GetList.php", function(data) {//当滚动到达最短的一列的距离时便发送ajax请求新的数据，然后执行回调函数
                _addItem(data.d, function() {//追加数据
                    var liLenNew = li.length;
                    for(var i = liLen; i < liLenNew; i++) {
                        lenArr.push(li[i].offsetHeight);
                    }
                    for(var i = liLen; i < liLenNew; i++) {
                        var x = _getMinKey(oArr);
                        li[i].style.top = oArr[x] + 10 + "px";
                        li[i].style.left = iw * x + "px";
                        li[i].style.opacity = "1";
                        li[i].style["-moz-opacity"] = "1";
                        li[i].style["filter"] = "alpha(opacity=100)";
                        oArr[x] = lenArr[i] + oArr[x] + 10;
                    }
                    document.getElementById("loadimg").style.top = _getMaxValue(oArr) + 50 + "px";//loading向下移位
                    liLen = liLenNew;
                    window.onscroll = scroll;//执行完成，恢愎onscroll事件
                });
            })
        }
    }
    window.onscroll =scroll;
}

var $dist = parseInt(window.screen.width/8);//数据块之间的距离
console.log($dist);
// 图片加载完成后执行
window.onload = function() {flow($dist, $dist/2)};
// todo:改变窗口大小时重新布局
var re;
window.onresize = function() {
    clearTimeout(re);
    re = setTimeout(function() {flow($dist, $dist/2);}, 200);
}
//追加项
function _addItem(arr, callback) {
    var _html = "";
    var a = 0;
    var l = arr.length;
    (function loadimg() {
        var img = new Image();
        img.onload = function() {
            a += 1;
            if (a == l) {
                for (var k in arr) {
                    var img = new Image();
                    img.src = arr[k].img;
                    _html += '<li><img src="' + arr[k].img + '" /><a href="#">' + arr[k].title + '</a></li>';
                }
                _appendhtml(document.getElementById("flow-box"), _html);
                callback();
            }
            else {
                loadimg();
            }
        }
        img.src = arr[a].img;
    })()
}
//ajax请求
function _request(reqdata, url, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = eval("(" + xmlhttp.responseText + ")");
            callback(data);
        }
    }
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xmlhttp.send(reqdata);
}
//追加html
function _appendhtml(parent, child) {
    if (typeof (child) == "string") {
        var div = document.createElement("div");
        div.innerHTML = child;
        var frag = document.createDocumentFragment();
        (function() {
            if (div.firstChild) {
                frag.appendChild(div.firstChild);
                arguments.callee();
            }
            else {
                parent.appendChild(frag);
            }
        })();
    }
    else {
        parent.appendChild(child);
    }
}
//获取数字数组的最大值
function _getMaxValue(arr) {
    var a = arr[0];
    for (var k in arr) {
        if (arr[k] > a) {
            a = arr[k];
        }
    }
    return a;
}
//获取数字数组最小值的索引
function _getMinKey(arr) {
    var a = arr[0];
    var b = 0;
    for (var k in arr) {
        if (arr[k] < a) {
            a = arr[k];
            b = k;
        }
    }
    return b;
}
//票券展示end