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
    agreeMessage.textContent = agreed ? "문자 또는 이메일 설정 할수있습니다." : "동의 후 문자 또는 이메일 설정 할수있습니다.";

    if(agreed){
        agreeMessage.classList.add("is-ready");
    }else{
        agreeMessage.classList.remove("is-ready");
    }

    if(!agreed){
        emailArea.hidden = true;
        trainingFlow.hidden = true;
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

const trainingFlow = document.querySelector("#training-flow");
const flowSteps = document.querySelectorAll(".step");
const progressItems = document.querySelectorAll(".progress_item");
const titleInput = document.querySelector("#presentation-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
//const durationRange = document.querySelector("#duration-range");
//const durationValue = document.querySelector("#duration-value");
//const qnaOption = document.querySelector("#qna-option");
//const qnsOptions = document.querySelector("#qna-options");
const optionPre = document.querySelector("#option-pre");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryQna = document.querySelector("#summary-qna");
//const durationValues = ["3","5","10"];
const sendEmailButton = document.querySelector("recording-confirm");
const emailArea = document.querySelector("#subscribe");


const formData = {
    title:"",duration:"5", qna:false, qnaCount:"2"
}

function showStep(index){
    flowSteps.forEach((step,i) => {step.hidden = i !== index;});
    progressItems.forEach((item,i) => {
        item.classList.toggle("is-active", i == index);
        console.log("i"+i+ "/"+index);

    });    
}

const recordingDialog = document.querySelector("#recording-dialog");
const recordingCancel = document.querySelector("#recording-cancel");/** 이메일로 받기 */
const recordingConfirm2 = document.querySelector("#recording-confirm2");/* 문자로 받기 */
const recordingConfirm = document.querySelector("#recording-confirm")/** 이메일로 받기 */

function revokeRecordingAgreement(){
    agreeCheck.checked=false;
    trainingFlow.hidden=true;
    handlerAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    recordingDialog.showModal();
});

recordingCancel.addEventListener("click", () => {
    recordingDialog.close();
    revokeRecordingAgreement();
});

recordingDialog.addEventListener("cancel",revokeRecordingAgreement);
recordingConfirm2.addEventListener("click" ,() => {
    if(!agreeCheck.checked) return;
    recordingDialog.close();
    trainingFlow.hidden = false;
    emailArea.hidden = true;
    showStep(0);
    trainingFlow.scrollIntoView({behavior : "smooth"});
    titleInput.focus();
});

recordingConfirm.addEventListener("click" ,() => {
    if(!agreeCheck.checked) return;
    recordingDialog.close();
    emailArea.hidden = false;
    trainingFlow.hidden = true;
    emailArea.scrollIntoView({behavior : "smooth"});
    emailInput.focus();

});

function validateTitle(){
    const value = titleInput.value.trim();
    if(!value){
        titleError.textContent="발표제목을 입력햐주세요";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    titleError.textContent="";
    titleInput.classList.remove("has-error");
    console.log("value", value);
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if(!validateTitle()) return;
    showStep(1);
    summaryTitle.textContent = formData.title;
});

// durationRange.addEventListener("input", () => {
//     durationValue.value = durationValues[durationRange.value] + "분";
// });

// qnaOption.addEventListener("change", () => {
//     qnsOptions.hidden = !qnaOption.checked;
// })

// optionPre.addEventListener("click" , () =>{showStep(0);});
// optionNext.addEventListener("click" , () => {
//     formData.durationValue = durationValues[durationRange.value];
//     formData.qna = qnaOption.checked;
//     const count = document.querySelector('input[name="qna-count"]:checked');
//     formData.qnaCount = count.value;
//     summaryTitle.textContent = formData.title;
//     summaryDuration.textContent = formData.duration + "분";
//     summaryQna.textContent = formData.qna ? formData.qnaCount  + "개 포함 " : "미포함";
//     showStep(2);
// })

summaryPrev.addEventListener("click", () => {showStep(0);});
finishButton.addEventListener("click", () => {
    console.log("2222");
    showStep(2);
});
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.duration = "";
    formData.qna = false;
    formData.qnaCount = "2";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    //durationRange.value = "1";
    //durationValue.value = "5분";
    //qnaOption.checked = false;
    //qnaOption.hidden = true;
    //document.querySelector('input[name="qna-count"][value="2"]').checked = true;
    summaryTitle.textContent = "";
    //summaryDuration.textContent = "";
    //summaryQna.textContent = "";
    showStep(0);

});