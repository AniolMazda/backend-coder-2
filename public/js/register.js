document.querySelector("#register").addEventListener("click", async()=>{
    try{
        const data = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            city: document.querySelector("#city").value,
            date: document.querySelector("#date").value,
            avatar: document.querySelector("#avatar").value
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        const url = "api/auth/register"
        let response = await fetch(url, opts)
        response = await response.json()
        console.log(opts)
    }
    catch(err){
        console.error(err.message)
    }
})