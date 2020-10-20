define(['jquery'], function($) {
    function download(){
        $.ajax({
            type: 'get',
            url: '../data/nav.json',
            success: function(result) {
                //console.log(result);
                var bannerArry = result.banner;
               // console.log(bannerArry);
                for(var i=0; i<bannerArry.length; i++){
                    $(`<a href="${bannerArry[i].url}">
                        <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArry[i].img}' alt=""/>
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");

                    var node =$(`<a href="#" class = 'swiper-pagination-bullet swiper-pagination-bullet-active'></a>`)
                    if(i==0){
                        node.addClass('swiper-pagination-bullet-active')
                    }
                    node.appendTo('#J_homeSwiper .swiper-pagination')
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }  

    function banner(){
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;

        var timer =setInterval(function(){
            iNow++;
            tab();
        },2500);

        function tab(){
            if(!aImgs){
                aImgs = $('#J_homeSwiper .swiper-slide').find('a');
            }
            if(!aBtns){
                console.log($('#J_homeSwiper .swiper-pagination'))
                aBtns = $('#J_homeSwiper .swiper-pagination').find('a')
            }
            if(iNow==5){
                iNow=0;
            }
            aImgs.hide().css('opacity',0.2).eq(iNow).show().animate({opacity:1},500);

            aBtns.removeClass('swiper-pagination-bullet-active').eq(iNow).addClass('swiper-pagination-bullet-active')

        }
        $('#J_homeSwiper,.swiper-button-next,.swiper-button-prev').mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer =setInterval(function(){
                iNow++;
                tab();
            },2500);
        })

        $('#J_homeSwiper .swiper-pagination').on('click','a',function(){
            iNow = $(this).index();
            tab();
            return false;
        })

        $('.swiper-button-next,.swiper-button-prev').click(function(){
            if (this.className == 'swiper-button-prev') {
                iNow--;
                if(iNow==-1){
                    iNow=4;
                }
            } else {
                iNow++;
            }
            tab();
        })
    }

    return{
        download : download,
        banner: banner
    }
});
