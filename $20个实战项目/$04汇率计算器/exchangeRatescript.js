(function () {
    const btn=document.getElementById("swap");
    const currency_one=document.getElementById("currency-one");
    const currency_two=document.getElementById("currency-two");
    const amount_one=document.getElementById("amount-one");
    const amount_two=document.getElementById("amount-two");
    const swap=document.getElementById("swap");
    const rateOutput=document.getElementById("rate");

    //获取汇率并实现dom更新
    function calculate(){
        let currOne=currency_one.value;
        let currTwo=currency_two.value;

/*
        fetch(`https://api.exchangerate-api.com/v4/latest/${currOne}?time=${new Date().toTimeString()}`)
            .then(res=>res.json()
                .then(data=>{
                    const rate=data.rates[currTwo];
                    rateOutput.innerText=`1${currOne} = ${rate +" "+ currTwo}`;
                    amount_two.value=(+amount_one.value)* rate.toFixed(2);
                }))
*/


    let url=`https://api.exchangerate-api.com/v4/latest/${currOne}?time=${new Date().toTimeString()}`;
    let method="GET";
    //创建XMLHttpRequest实例
    let request=new XMLHttpRequest();
    request.open(method,url);
    request.send(null);
    request.onreadystatechange=function () {
        console.log(url)
        if (request.readyState==4){
            if (request.status==200 || request.status==304){
                let result=request.responseText;
                let obj=eval("("+result+")");
                let rate=obj.rates[currTwo];
                rateOutput.innerText=`1${currOne} = ${rate +" "+ currTwo}`;
                amount_two.value=(+amount_one.value)* rate.toFixed(2);
            }
        }
    }













    }
    calculate();

    /*事件监听，分别监听两个下拉列表框和两个表单元素
    * 监听汇率币种或者金额数是否发生改变，然后回调计算函数*/
    currency_one.addEventListener("change",calculate);
    currency_two.addEventListener("change",calculate);
    amount_one.addEventListener("input",calculate);
    amount_two.addEventListener("input",calculate);

    //点击按钮，货币转换
    swap.addEventListener("click",function () {
        const tmp=currency_two.value;
        currency_two.value=currency_one.value;
        currency_one.value=tmp;
        calculate();
    })







})();