(function () {
    const container=document.getElementsByClassName("container")[0];
    const seats=document.querySelectorAll(".row .seat:not(.occupied)");
    const movie=document.getElementById("movie");
    const count=document.getElementById("count");
    const total=document.getElementById("total");

    // 获取存储在本地浏览器中的数据
    let selectedMovieIndex=localStorage.getItem("selectedMovieIndex");
    let selectedSeats=localStorage.getItem("selectedSeats");

    //下拉列表框绑定change事件
    movie.addEventListener("change",function (e) {
        alert(`您要观看的影片是 ${movie[movie.selectedIndex].innerText}`);
        unit_price=+e.target.value;
        //保存选择影片的片名
        localStorage.setItem("selectedMovieIndex",e.target.selectedIndex);

        updateSelectedCount();
    });

    //利用事件委托，将触发事件绑定在父元素上
    //父元素不会直接处理事件，而是根据`:event.target`得到发生事件的子元素，并通过这个子元素调用事件回调函数
    container.addEventListener("click",(e)=>{

        /*        classList下的方法
        增加 class — node.classList.add()
        删除 class — node.classList.remove()
        切换 class — node.classist.toggle()
        判断 class — node.classist.contains()*/

        if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
            e.target.classList.toggle("selected");
            updateSelectedCount();
        }
    });
    //更新座位与总票价
    function updateSelectedCount(){
        let unit_price=+movie[movie.selectedIndex].value;
        const selectedSeats=document.querySelectorAll(".row .seat.selected");
        count.innerText=selectedSeats.length;
        total.innerText=selectedSeats.length * unit_price;

        // ...展开语法，可以在函数调用/数组构造时，将数组表达式或者string在语法层面展开
        //还可以在构造字面量对象时，将对象表达式按key-value的方式展开
        const seatIndex=[...selectedSeats].map( (seat)=> {
            //返回被选中的座位在总座位（除去已被选择的）中的索引
            return [...seats].indexOf(seat);
        });
        // localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
        //保存数据语法：localStorage.setItem("key", "value");
        localStorage.setItem("selectedSeats",JSON.stringify(seatIndex));
    }
    //浏览器中本地存储的数据渲染
    function rendering(movieIndex,seatIndex){
        let seatIndexArr=JSON.parse(seatIndex);
        for(let i of seatIndexArr){
            seats[i].classList.add("selected");
        }
        movie.selectedIndex=movieIndex;
        count.innerText=seatIndexArr.length;
        total.innerText=(movie[movieIndex].value)*(seatIndexArr.length);
    }

    if(selectedSeats!==null){
        rendering(selectedMovieIndex,selectedSeats);
    }

})();