class SliderUnlock {
    static imagSrc = "./images/";

    constructor(width,height,sliderwidth,radius){
        this.width = width; //宽
        this.height=height; //高
        this.sliderwidth=sliderwidth;  //滑块长度
        this.radius=radius;  //半径
       
    }

    //初始化控件
    Init(el) {
        let body = document.getElementsByName('body')[0];  
        //创建容器，用于布局坏块解锁   
        let container  =document.createElement("div");
        container.className = 'container';
        body.appendChild(container);


        let canvas =  createCanvans(this.width,this.height); //创建画布      
        container.appendChild(container);
        let block = canvas.cloneNode(true); //创建滑块
        //滚动条
        let sliderContainer = createElement('div', 'sliderContainer'); 
        let refreshIcon = createElement('div', 'refreshIcon'); //刷新按钮
        let sliderMask = createElement('div', 'sliderMask'); //滚动条标记
        var slider = createElement('div', 'slider'); //滚动条
        let sliderIcon = createElement('span', 'sliderIcon'); //滚动条的拖动图标
        let text = createElement('span', 'sliderText'); //滚动条的文字

        block.className = 'block';
        text.innerHTML = '向右滑动填充拼图';

        var el = this.el;
        el.appendChild(canvas);
        el.appendChild(refreshIcon);
        el.appendChild(block);
        slider.appendChild(sliderIcon);
        sliderMask.appendChild(slider);
        sliderContainer.appendChild(sliderMask);
        sliderContainer.appendChild(text);
        el.appendChild(sliderContainer);
        
    }

    //获取图片的随机路径
    getRandomImgSrc(start,end){
        let imagNumber =Math.round(Math.random()*(end-start)+start);
        return SliderUnlock.imagSrc+imagNumber.toString() +'jpg';
    }

    draw(){
        this.x = getRandomNumberByRange(L + 10, w - (L + 10));
        this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10));
        _draw(this.canvasCtx, this.x, this.y, 'fill');
        _draw(this.blockCtx, this.x, this.y, 'clip');
    }

    clean(){

    }

}

//创建元素
function createElement(tagName, className) {
    var elment = document.createElement(tagName);
    elment.className = className;
    return elment;
}

//创建画板
function  createCanvans(width, height) { 
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.className=classname;
    return canvas;
}


//绘制滑块
function drawSliderBlock(ctx, x, y, operation) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx[operation]();
    ctx.globalCompositeOperation = 'overlay';
}