window.onload = ()=>{
    let svg = document.getElementById('btn-hide');
    //点击图标
    svg.onclick = click_cat;
    //滚动监听
    window.onscroll = cat_scroll;
    every();
};

//点击图标显示/隐藏图标
function click_cat() {
    let cat_description = document.getElementById("cat-description");
    if( cat_description.style.opacity !== '0'){
       cat_hidden();
    }
    else{
       cat_show();
    }
}
//鼠标滚动监控图标
function cat_scroll() {
    let top = document.documentElement.scrollTop;
    if(top > 150){
        cat_hidden();
    }
    else{
        cat_show();
    }

}
//隐藏
function cat_hidden() {
    let cat_img = document.getElementById("cat-img");
    let cat_description = document.getElementById("cat-description");
    cat_img.style.transform = 'translate(calc(-100% - 40px)) rotate(-45deg)';
    cat_description.style.transform = 'translate(-100%)';
    cat_description.style.opacity= '0';
    cat_img.style.animation = 'cat .5s ease-in-out';
    cat_description.style.animation = 'cat-desc .5s ease-in-out'
}
//显示
function cat_show() {
    let cat_img = document.getElementById("cat-img");
    let cat_description = document.getElementById("cat-description");
    cat_img.style.transform = '';
    cat_description.style.transform = '';
    cat_description.style.opacity= '1';
    cat_img.style.animation = 'cat-res .5s ease-in-out';
    cat_description.style.animation = 'cat-desc-res .5s ease-in-out'
}

//每日一句
function every() {
    let sentence = document.getElementsByClassName('sentence')[0];
    let arr = [
        '生活像一把钝刀，一刀刀割不伤却会疼。',
        '只要尽头是你,哪怕在黑暗里匍行,我也知道,终将会迎来白昼。 ',
        '既然生活留给我们太多太多的枷锁 ,那就在这个囚笼里活的自在洒脱。',
        '三里清风三里路，步步清风再无你。',
        '别人已经一房两人三餐四季,而我还在一杯两壶三扎四打, 也许这条路开始就是不归路。',
        '世间纷繁百态,总有一天我们会明白,孤独本是人生的常态。',
        '想来最悲哀的还是时隔多年，你都未曾因为错过我，而感到半点可惜过。',
        '有一天我问一个小男孩爱是什么？小男孩回答爱是狗狗会舔你的手。我听了之后笑了。他接着说：就算你已经不要它了。',
        '就当花未开过 ,你没来过 ,等你杳无音信 ,我再去爱世间万物。',
        '东野圭吾说：曾经拥有的东西失去了，并不代表就会回到原来没有那种东西的时候。',
        '你想要的 ,我却不能够给你我全部, 我能给的, 却又不是你想要拥有的。',
        '做到大致的善良, 恰到好处的冷漠, 和适可而止的关心, 你的生活会轻松很多。'
    ];
    setInterval(function () {
        let num = Math.floor(Math.random()*arr.length);
        sentence.innerText = arr[num];
    },7000);

}