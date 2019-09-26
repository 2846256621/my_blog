let music = [];
let audio = document.getElementById("audio");
music = ["DAOKO,米津玄師 - 打上花火","Jam - 七月上","不才 - 化身孤岛的鲸","简弘亦 - 你就不要想起我 "];//歌单
let num = 0;
let name = document.getElementById("name");


<!--上一首-->
let btn3 = document.getElementById("btn-pre");
btn3.onclick = function(){
    num = (num +2)%4;
    audio.src =  "../public/music/"+music[num]+".mp3";
    name.innerHTML = ` <svg class="icon-music" aria-hidden="true">
                            <use xlink:href="#icon-yinle"></use>
                        </svg>
                        <span>${music[num]}</span>`;
    audio.play();
};

<!--下一首-->
let btn4 = document.getElementById("btn-next");
btn4.onclick = function(){
    num = (num +1)%4;
    audio.src =  "../public/music/"+music[num]+".mp3";
    name.innerHTML = ` <svg class="icon-music" aria-hidden="true">
                            <use xlink:href="#icon-yinle"></use>
                        </svg>
                        <span>${music[num]}</span>`;
    audio.play();
};
<!--自动播放下一首-->
audio.addEventListener('ended', function () {
    btn4.onclick();
}, false);

