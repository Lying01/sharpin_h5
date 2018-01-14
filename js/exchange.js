var my_swiper = new Swiper('#topNav', {
    freeMode: true,
    freeModeMomentumRatio: 0.5,
    slidesPerView: 'auto',

});

swiperWidth = my_swiper.container[0].clientWidth;
maxTranslate = my_swiper.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2;

$(".swiper-container").on('touchstart', function(e) {
    e.preventDefault()
})
//导航条居中
my_swiper.on('tap', function(swiper, e) {

    slide = swiper.slides[swiper.clickedIndex]
    slideLeft = slide.offsetLeft
    slideWidth = slide.clientWidth
    slideCenter = slideLeft + slideWidth / 2
    // 被点击slide的中心点

    my_swiper.setWrapperTransition(300)

    if (slideCenter < swiperWidth / 2) {

        my_swiper.setWrapperTranslate(0)

    } else if (slideCenter > maxWidth) {

        my_swiper.setWrapperTranslate(maxTranslate)

    } else {

        nowTlanslate = slideCenter - swiperWidth / 2

        my_swiper.setWrapperTranslate(-nowTlanslate)

    }

    $("#topNav  .active").removeClass('active')

    $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')

})

