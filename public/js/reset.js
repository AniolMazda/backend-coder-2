document.querySelector("#resetButton").addEventListener("click", async()=>{
    try{
        const email = document.querySelector("#resetEmail").innerText
        const password = document.querySelector("#resetPassword").value
        const verifyPassword = document.querySelector("#repeatPassword").value

        if(password !== verifyPassword){
            return alert("Password not the same")
        }

        const opts = {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({password:password})
        }
        const url = `/api/users/resetPassword/${email}`
        let response = await fetch(url,opts)
        response = await response.json()
        if(response.error){
            alert(response.error)
        }else{
            location.replace("/login")
        }
    }
    catch(err){
        console.error(err.message)
    }
})