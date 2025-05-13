document.querySelector("#open-update").addEventListener("click", ()=>{
    const form = document.querySelector("#form-update")
    form.style.display = "flex"
})
document.querySelector("#update-user").addEventListener("click", async()=>{
    try{
        const data = {
            name: document.querySelector("#name").value,
            city: document.querySelector("#city").value,
            date: document.querySelector("#date").value,
            avatar: document.querySelector("#avatar").value
        }
        const newData = {}
        data.name && (newData.name = data.name)
        data.city && (newData.city = data.city)
        data.date && (newData.date = data.date)
        data.avatar && (newData.avatar = data.avatar)
        if(Object.keys(newData).length === 0){
            const alert = document.querySelector("#warning-message")            
            alert.classList.remove('opacity-0')
            setTimeout(()=>{
                alert.classList.add('opacity-0')
            },8000)
        }else{
            const opts = {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newData)
            }
            const url = "api/users"
            let response = await fetch(url, opts)
            response = await response.json()
            const alert = document.querySelector("#success-message")
            alert.classList.remove('opacity-0')
            setTimeout(()=>{
                alert.classList.add('opacity-0')
                location.replace("/profile")
            },3000)
        }
    }
    catch(err){
        console.error(err.message)
    }
})