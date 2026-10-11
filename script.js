const serviceName = "나의 UI/UX 훈련"; 
let isSubscibed = false;
let isSubmitCount = 0;


function makeSubscibeMessage(email, isSubscibed){
    if(isSubscibed == true){
        return email + "로 신청이 완료되었습니다!!!!";
        
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