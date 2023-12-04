

const createReportTicket = async ()=>{

    const message = document.getElementById("textarea").value;
    
    const response = await fetch(url+"/tickets", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${token}`
        },
        body:JSON.stringify({
            complaint:message
        })
    })

    const data = await response.json()

    if(data.status === "error"){
        alert(data.message)
    }

    if(data.status === "Created"){
        alert("Ticket Submited")
        location.href = "./dashboard.html"
    }

    console.log(data)
}