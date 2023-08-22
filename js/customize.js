// 自行加入的JS請寫在這裡
$(function() {
    // 首頁輪播
    // $('.mpSlider').slick({
    //     mobileFirst: true,
    //     dots: true,
    //     arrow: true,
    //     infinite: true,
    //     speed: 500,
    //     autoplay: true,
    //     fade: true,
    //     lazyLoaded: true,
    //     lazyLoad: 'ondemand',
    //     ease: 'ease'
    // });
    // 廣告輪播
    // $('.adSlider').slick({
    //     mobileFirst: true,
    //     dots: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     arrow: true,
    //     lazyLoaded: true,
    //     lazyLoad: 'ondemand',
    //     ease: 'ease',
    //     responsive: [{
    //         breakpoint: 1200,
    //         settings: {
    //             slidesToShow: 5,
    //             slidesToScroll: 1,
    //             arrows: true
    //         }
    //     },{
    //         breakpoint: 768,
    //         settings: {
    //             slidesToShow: 4,
    //             slidesToScroll: 1,
    //             arrows: true
    //         }
    //     },{
    //         breakpoint: 575,
    //         settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 1,
    //             arrows: true
    //         }
    //     }]
    // });
    //燈箱slick+lightBox組合
    $('.cp_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: true,
        lazyLoad: 'ondemand',
        ease: 'ease',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 545,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });
    $('.cp_slider').slickLightbox({
        caption: 'caption',
        lazyLoad: 'ondemand',
        useHistoryApi: 'true',
        ease: 'ease',
        lazy: true
    });
    // cp_photo
    $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.controls').html(i + '/' + slick.slideCount);
    });
    $('.Slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        swipe: false,
        swipeToSlide: false,
        lazyLoad: 'ondemand',
        asNavFor: '.Slider-nav',
        infinite: true
    });
    $('.Slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.Slider-for',
        dots: true,
        arrows: true,
        lazyLoad: 'ondemand',
        focusOnSelect: true,
        infinite: true
    });

    // tab 裡面的開合表單
    // 預設全展開、不然 tab 高度撐不開
    // $('.fill_in').on('click','h3.title',function(){
    //     if($(this).hasClass('closed')){
    //         $(this).removeClass('closed');
    //         $(this).next('section').stop(true, false).slideDown(600);
    //     }else{
    //         $(this).addClass('closed');
    //         $(this).next('section').stop(true, false).slideUp(600);
    //     }
    //     //alert("check!");
    //     //$('h2.active > a').click();
    // });

    //開合表單點選後點選頁籤重算高度
    //$('h3.title').click(function () {
        //$('h2.active > a').click();
    //})
    //$('.fill_in').on('click','h3.title',function(){
        //$('h2.active > a').click();
    //});

    // 案件資格審查
    // 預設打開某個物件的內容
    $('.filter_box > h3.title').next('section').css("display","none");
    $('.filter_box > h3.title.opened').next('section').css("display","block");
    $('.filter_box > h3.title').click(function(){
        if($(this).hasClass('opened')){
            $(this).removeClass('opened');
            $(this).next('section').stop(true, false).slideUp(600);
        }else{
            $(this).addClass('opened');
            $(this).next('section').stop(true, false).slideDown(600);
        }
    });

    // tag 點選
    $('.tag a').click(function(){
        if($(this).hasClass('checked')){
            $(this).removeClass('checked');
        }else{
            $(this).addClass('checked');
        }
    });
    $(".tag a").click(function(){
        $('.tag a.checked').not(this).removeClass('checked');
     })

    // sort
    // $('.scroltable th.sort').click(function(){
    //     if($(this).hasClass('active')){
    //         $(this).removeClass('active');
    //     }else{
    //         $(this).addClass('active');
    //     }
    // })

});