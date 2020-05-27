// 获取元素
const form=document.getElementById("form");
const name=document.getElementById("name");
const email=document.getElementById("email");
const password=document.getElementById("password");
const password2=document.getElementById("password2");
//输入项的正则表达式
const regName=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
const regEmail=/^\w{3,}(\.\w+)*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,5}){1,2}$/;
// 事件监听
form.addEventListener("submit",function (e) {
    //阻止表单的默认行为
    //表单一点击提交按钮(submit)必然跳转页面，如果表单的action为空也会跳转到自己的页面，即效果为刷新当前页。
    e.preventDefault();
    const isFull=checkRequired([name,email,password,password2]);
    const isNameTure=checkName(name);
    const isEmailTrue=checkEmail(email);
    const isPassTrue=checkPassword(password,password2);

    if(isFull && isNameTure && isEmailTrue && isPassTrue){
        setTimeout(function(){
            alert("注册成功,欢迎您  "+name.value);
            location.href="./login.html";
        },20)
    }

});

function showError(element,message) {
    const formControl=element.parentElement;
    formControl.className="form-control error";
    const small=formControl.querySelector("small");
    small.innerText=message;
}
function showSuccess(element){
    const formControl=element.parentElement;
    formControl.className="form-control success";
}
function isValid(value,reg){
    return reg.test(value);
}
//将函数封装
function checkRequired(eleArr){
    let flag=true;
    eleArr.forEach(function(item){
        if(item.value.trim()===""){
            showError(item,`${item.placeholder.substring(3)}为必填项`);
            flag=false;
        }else{
            showSuccess(item);
        }
    });
    return flag;
}
function checkName(name){
    if(isValid(name.value,regName)){
        showSuccess(name);
        return true;
    }else {
        showError(name,"用户名格式不规范");
        return false;
    }
}
function checkEmail(email){
    if(isValid(email.value,regEmail)){
        showSuccess(email);
        return true;
    }else {
        showError(email,"邮箱格式不规范");
        return false;
    }
}
function checkPassword(password,password2){
    if(password2.value!=password.value){
        showError(password2,"前后密码不匹配");
        return false;
    }
    else if(password.value.length>10){
        showError(password,"密码不超过10个字符");
        showError(password2,"");
        password2.value="";
        return false;
    }else if(password.value.length<5){
        showError(password,"密码强度不够,至少六位");
        showError(password2,"");
        password2.value="";
        return false;
    }
    else{
        showSuccess(password);
        showSuccess(password2);
        return true;
    }
}
