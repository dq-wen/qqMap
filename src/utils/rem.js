let resize = function(){

    let designSize = 11520; //默认设计图尺寸 11520*2160
    let html = document.documentElement;
    // let wW = html.clientWidth; //窗口宽度
    let wW = 5970; //窗口宽度
    let rem = (wW*1000)/designSize;
    html.style.fontSize = 500 + 'px';
};
resize();//初始化
window.addEventListener('resize', resize, false); //绑定到窗口事件中