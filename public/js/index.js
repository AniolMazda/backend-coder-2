const descriptionResume = (delimit) => {
    let descriptions = document.querySelectorAll(".description-resume")
    descriptions.forEach((d,i)=>{
        if(d.innerText.length >= delimit){
            descriptions[i].innerText = d.innerText.substring(0,delimit) + "..."
        }
    })
}
descriptionResume(150)