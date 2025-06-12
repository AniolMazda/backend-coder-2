document.querySelector("#verifyButton").addEventListener("click", async()=>{
    try{
        const data = {
            email: document.querySelector("#verificationEmail").innerText,
            code: document.querySelector("#verificationCode").value,
        }
        const url = `http://localhost:8080/api/auth/verify/${data.email}/${data.code}`
        let response = await fetch(url)
        response = await response.json()
        if(response.error){
            alert(response.error)
        }else{
            location.replace("/")
        }
    }
    catch(err){
        console.error(err.message)
    }
})