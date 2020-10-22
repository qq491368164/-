define(['jquery'],function($){
    function download(){
        $.ajax({
            url: '../data/slide.json',
            success: function(result){
                //console.log(result);
                var slideArr = result.data.list.list;
                //console.log(slideArr);
                for(var i=0; i<slideArr.length; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                            </div>
                            <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                            <p class = 'desc'>${slideArr[i].desc}</p>
                            <p class = 'price'>
                                <span>${slideArr[i].seckill_Price}元</span>
                                <del>${slideArr[i].goods_price}元</del>
                            </p>
                        </div>
                    </a>
                </li>`).appendTo('#J_flashSaleList ul');
                }
            },
            error: function(msd){
                console.log(msd);
            }
        })
    }
    return{
        download : download
    }
})