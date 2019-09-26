window.onload = ()=>{
    let svg = document.getElementById('btn-hide');
    //点击图标
    svg.onclick = click_cat;
    //滚动监听
    window.onscroll = cat_scroll;
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

