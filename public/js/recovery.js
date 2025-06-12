document.querySelector("#recoveryButton").addEventListener("click", async()=>{
    try{
        const email = document.querySelector("#recoveryEmail").value
        
        const url = `/api/users/recoveryPassword/${email}`
        let response = await fetch(url)
        response = await response.json()
        if(response.error){
            alert(response.error)
        }else{
            alert("Email Enviado")
        }
    }
    catch(err){
        console.error(err.message)
    }
})