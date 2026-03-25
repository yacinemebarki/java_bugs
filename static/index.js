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

async function send(code,des,apiProvider,apiUrl,apiKey){
    try{
        console.log("enter")

        const res=await fetch(des,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({code:code,apiProvider:apiProvider,apiKey:apiKey,apiUrl:apiUrl})
        }

        )
        console.log("datasent")
        const bug=document.getElementById("bugCount");
        const data=await res.json();
        
        if (data['valid']==false){
            showError(data['msg']);
            if (data['line_number']!=null){
                error=data['line_number']
                issue=data['line_number'].length
                bug.textContent=`${issue} issue found in this lines ${error}`
            }
        }
        else {
            showSuccess(data['msg'])
            bug.textContent=`no issue found`
        }
        
    }
    catch(error){
        console.log(error)
    }
}



document.getElementById("check-btn").addEventListener("click",function(){
    const code=document.getElementById("codeEditor").value;
    const model=document.getElementById("modelType").value;
    const provider=document.getElementById("apiProvider").value;
    const apiUrl=document.getElementById("apiUrl").value;
    const apiKey=document.getElementById("apiKey").value;
    
    if(!code || code.length<=15){
        showError("you need to enter real code ")
    }

    if (model=="local" || !model){
        send(code,"/check_local",provider,apiUrl,apiKey);

    }
    else {
        
        if (!provider || !apiUrl || !apiKey){
            showError("you must fill all fields")
            return;
        }

        send(code,"/check_provide",provider,apiUrl,apiKey);
        



    }


})