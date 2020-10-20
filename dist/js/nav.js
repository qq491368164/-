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
        leftNavDownload();
        topNavDownload();
    }  
    
    //------------------------------------------------------------
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
                //console.log($('#J_homeSwiper .swiper-pagination'))
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

    //------------------------------------------------------------
    function leftNavDownload(){
        $.ajax({
            url: '../data/nav.json',
            success: function(result){
                var sideArr = result.sideNav
                for(var i=0;i<sideArr.length;i++){
                    var node =$(`<li class = 'category-item'>
                            <a href="/index.html" class = 'title'>
                                ${sideArr[i].title}
                                <em class = 'iconfont-arrow-right-big'></em>
                            </a>
                            <div class="children clearfix">
                               
                            </div>
                        </li>`);
                        node.appendTo('#J_categoryList');

                        var childArr = sideArr[i].child;
                        var col = Math.ceil(childArr.length/6);
                        node.find('div.children').addClass('children-col-'+col);

                        for(var j=0; j<childArr.length; j++){
                            if(j%6==0){
                               var newUl = $(`
                               <ul class="children-list children-list-col children-list-col-1">
                                </ul>`); 
                                newUl.appendTo(node.find('div.children'));
                            }
                            $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
                        }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function leftNavTab(){
        $('#J_categoryList').on('mouseenter','.category-item',function(){
            $(this).addClass('category-item-active');
        })
        $('#J_categoryList').on('mouseleave','.category-item',function(){
            $(this).removeClass('category-item-active');
        })

    }

    //------------------------------------------------------------
    function topNavDownload(){
        $.ajax({
            url : '../data/nav.json',
            success: function(result){
                var topNavArr = result.topNav;
                topNavArr.push({title:'服务'},{title:'社区'});
                for(var i=0; i<topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                        <span class="text">${topNavArr[i].title}</span>
                    </a> 
                </li>`).appendTo('.site-header .header-nav .nav-list');

                var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                </ul>`);
                node.appendTo("#J_navMenu .container")
                    if(topNavArr[i].childs){
                        var childsArr = topNavArr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error : function(msd){
                console.log(msd);
            }
        })
    }

    function topNavTab(){
        $('.header-nav .nav-list').on('mouseenter','.nav-item',function(){
            $(this).addClass('nav-item-active');
            var index = $(this).index() -1;
            if(index >=0 && index <= 6){
                $('#J_navMenu').css('display','block').removeClass('slide-up').addClass('slide-down');
                $('#J_navMenu .container').find('ul').eq(index).css('display','block').siblings('ul').css('display','none')
            }
        })
        $('.header-nav .nav-list').on('mouseleave','.nav-item',function(){
            $(this).removeClass('nav-item-active');
        })
        $('.site-header').mouseleave(function(){
            $('#J_navMenu').css('display','block').removeClass('slide-down').addClass('slide-up');
        })
    }

    function searchTab(){
        $('#search').focus(function(){
            $('#J_keywordList').removeClass('hide').addClass('show');
        }).blur(function(){
            $('#J_keywordList').removeClass('show').addClass('hide');
        })
    }



    return{
        download : download,
        banner: banner,
        leftNavTab : leftNavTab,
        topNavTab : topNavTab,
        searchTab: searchTab
    }
});








































