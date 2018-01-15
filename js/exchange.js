var my_swiper2 = new Swiper('#topNav2', {
    freeMode: true,
    freeModeMomentumRatio: 0.5,
    slidesPerView: 'auto',

});

swiperWidth = my_swiper2.container[0].clientWidth;
maxTranslate = my_swiper2.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2;

$(".swiper-container").on('touchstart', function(e) {
    e.preventDefault()
})
//导航条居中
my_swiper2.on('tap', function(swiper, e) {

    slide = swiper.slides[swiper.clickedIndex]
    slideLeft = slide.offsetLeft
    slideWidth = slide.clientWidth
    slideCenter = slideLeft + slideWidth / 2
    // 被点击slide的中心点

    my_swiper2.setWrapperTransition(300)

    if (slideCenter < swiperWidth / 2) {

        my_swiper2.setWrapperTranslate(0)

    } else if (slideCenter > maxWidth) {

        my_swiper2.setWrapperTranslate(maxTranslate)

    } else {

        nowTlanslate = slideCenter - swiperWidth / 2

        my_swiper2.setWrapperTranslate(-nowTlanslate)

    }

    $("#topNav2  .active").removeClass('active');

    $("#topNav2 .swiper-slide").eq(swiper.clickedIndex).addClass('active');

    // console.log(swiper.clickedIndex);
    //切换实物or票券界面
    if(swiper.clickedIndex == 0){
        $(".matter-ul").css("display", 'block');
        $(".ticket-ul").css("display", 'none');
    } else if(swiper.clickedIndex == 1){
        $(".ticket-ul").css("display", 'block');
        $(".matter-ul").css("display", 'none');
    }
})

