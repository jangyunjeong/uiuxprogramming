const serviceName = "나의 UI/UX 훈련"; 
let isSubscibed = false;
let isSubmitCount = 0;


function makeSubscibeMessage(email, isSubscibed){
    if(isSubscibed == true){
        return email + "로 신청이 완료되었습니다.";
        
    }
    return "이메일을 입력한뒤 신청해주세요";
}

const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");

const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

console.log(subscribeForm);
console.log(emailInput);
console.log(subscribeButton);
console.log(subscribeMessage);

function handlerSubscribe(event){
    event.preventDefault(); 

    const subscriberEmail = emailInput.value.trim();

    if(subscriberEmail == ""){
        subscribeMessage.textContent = "이메일 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    isSubscibed = true;
    isSubmitCount += 1;

    subscribeMessage.textContent = makeSubscibeMessage(subscriberEmail,isSubscibed); 

    subscribeMessage.classList.add("is-success");
    subscribeButton.textContent = "신청완료";
    subscribeButton.disabled = true; 
}

subscribeForm.addEventListener("submit",handlerSubscribe)


const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickName");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handlerThemeClick(){
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트모드" : "다크모드";
}

themeButton.addEventListener("click",handlerThemeClick);

function handlerNicknameInput(){
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);
    nicknameCount.textContent = currentLength + "/ " + maxLength;
}

nicknameInput.addEventListener("input",handlerNicknameInput);

function handlerAgreeChange(){
    const  agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed ? "훈련을 시작할수 있습니다." : "동의 후 훈련을 시작할 수 있습니다.";

    if(agreed){
        agreeMessage.classList.add("is-ready");
    }else{
        agreeMessage.classList.remove("is-ready");
    }
}

agreeCheck.addEventListener("change",handlerAgreeChange); 

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTebsAndPanel(){
    tabs.forEach(function(tab){
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected","false");

    });

    panels.forEach(function(panel){
        panel.classList.remove("is-active");
        panel.hidden = true;

    });
}

function activeTab(clickTab){

    const targetSelector = clickTab.dataset.target;
    const targetPanel = document.querySelector("#"+targetSelector);

    clickTab.classList.add("is-active");
    clickTab.setAttribute("aria-selected","true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handlerTabClick(event){
    resetTebsAndPanel();
    activeTab(event.currentTarget);
}

tabs.forEach(function (tab){
    tab.addEventListener("click",handlerTabClick);
});
