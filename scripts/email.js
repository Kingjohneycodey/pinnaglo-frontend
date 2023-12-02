const urlparams = new URLSearchParams(location.search)
const email = urlparams.get("email")

// alert(email)

const url = "https://nexuscrypto.onrender.com"

const checkAdmin = localStorage.getItem("himbeadmin")

if (!checkAdmin) {
    
    location.href = "./index.html"
}



const messageTitle = document.getElementById("message-title")
const messageBody = document.getElementById("message-body")



const sendEmail = async ()=>{

    const response = await fetch(url + "/admin/send/email", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email,
            title: messageTitle.value,
            message:messageBody.value
        })
    })

    const data = await response.json()
    
    alert(data.message)

    if (data.status) {
        
        history.back()
    }

}