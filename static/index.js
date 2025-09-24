function hide(name){
    const el = document.querySelector(name);
    el.textContent = "";
    el.style.display = "none";
}

function showError(msg){
    const sentence = document.querySelector(".error-message");
    if (sentence){
        hide(".error-message");
    }
    sentence.textContent = msg;
    sentence.style.display = "block";
    setTimeout(function(){
        hide(".error-message");
    }, 3000);
}

function showSuccess(msg){
    const sentence = document.querySelector(".success-message");
    if (sentence){
        hide(".success-message");
    }
    sentence.textContent = msg;
    sentence.style.display = "block";
    setTimeout(function(){
        hide(".success-message");
    }, 3000);
}
document.getElementById("check-btn").addEventListener("click",function(){
    const code=document.getElementById("codeEditor").value;
    if (code==null || code.length<=5){
        showError("please enter your code or the code must be bigger")
        return 
    };
    
    async function send(code) {
        try{
            const res=await fetch("/check",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({code})
            })
            const bug=document.getElementById("bugCount");
            const data=await res.json();
            if (data['valid']==false){
                showError(data['msg'])
                if (data['line_number']!=null){
                    error=data['line_number']
                    issue=data['line_number'].length
                    bug.textContent=`${issue} issue found in this lines ${error}`
                }
            }
            else{
                showSuccess(data['msg'])
                bug.textContent='no issue found'
            }
        }
        catch(error){
            console.log(error);
        }
        
    }
    send(code);

})