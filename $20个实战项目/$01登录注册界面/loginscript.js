// 获取元素
const form=document.getElementById("form");
const name=document.getElementById("name");
const password=document.getElementById("password");
//输入项的正则表达式
const regName=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
const regEmail=/^\w{3,}(\.\w+)*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,5}){1,2}$/;
// 事件监听
form.addEventListener("submit",function (e) {
    //阻止表单的默认行为
    //表单一点击提交按钮(submit)必然跳转页面，如果表单的action为空也会跳转到自己的页面，即效果为刷新当前页。
    e.preventDefault();
    /*





    与后端进行接洽 确定登录用户在服务器注册用户中







    */



});

