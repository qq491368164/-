console.log('加载成功');

require.config({
    paths: {
        'jquery': 'jquery-1.11.3',
        'jquery-cookie': 'jquery.cookie',
        'nav': 'nav',
        'slide': 'slide'
    },
    shim:{
        'jquery-cookie': ['jquery']
    }
})

require(['nav','slide'],function(nav,slide){
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    slide.download();
})

























