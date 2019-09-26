
$(function () {
    more();
});
function more() {
    let list = document.getElementById('content-list-more');
    list.onclick= function (event) {
        let target = event.target;
        if(target.innerText === "▶" ){
            target.innerText = "▼";
            target.nextElementSibling.style.display = 'block';
        }
        else if(target.nextElementSibling.style.display === 'block'){
            target.innerText = "▶";
            target.nextElementSibling.style.display ='none';
        }
    };

}