
$(function () {
    more();
});
function more() {
    let list = document.getElementById('content-list-more');
    let ul_more = document.getElementsByClassName("ul-more");
    list.onclick= function (event) {
        let target = event.target;
        if(target.innerText ===  ul_more[2].innerText ){
            target.innerText = "▼";
            target.nextElementSibling.style.transform= 'translateX(200px)';
            target.nextElementSibling.style.transition= 'transform 2s ease-in-out';
            target.nextElementSibling.style.display = 'block';

        }
        else if(target.nextElementSibling.style.display === 'block'){
            target.innerText = "▶";
            target.nextElementSibling.style.display ='none';
        }
    };

}