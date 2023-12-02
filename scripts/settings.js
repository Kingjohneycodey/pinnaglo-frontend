// alert("Connected")

const changeNameButton = document.getElementById("update-profile-button")

const countryInput = document.getElementById("set-address")
const changeWalletButton = document.getElementById("withdraw-set-button")
const bitcoinInput = document.getElementById("bitcoin-address")
const changePasswordButton = document.getElementById("update-password-button")
const oldPasswordInput = document.getElementById("old-password")
const newPassword = document.getElementById("new-password")
const confirmPassword = document.getElementById("confirm-password")


if (changeNameButton) {
    
    changeNameButton.addEventListener("click", async () => {

        await navigator.clipboard.writeText(referalInput.value)
        .then(()=>{
            changeNameButton.innerText = "URL Copied!!!"
        })

        setTimeout(() => {
            changeNameButton.innerText = "Copy URL"
        }, 3000);
        

    })
}


if (changeWalletButton) {
    
    changeWalletButton.addEventListener("click", async () => {
        
        const response = await fetch(url+"/users/wallet?user="+token, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
            },
            body: JSON.stringify({
            bitcoin:bitcoinInput.value
        })
    })


    const data = await response.json()

        alert(data.message)
        
        if (data.status) {
            
            location.href = "./dashboard.html"
        }

        

    })
}

if (changePasswordButton) {
    
    changePasswordButton.addEventListener("click", async () => {

        if (newPassword.value !== confirmPassword.value) {
            
            alert("New Passwords Do not Match")
            return
        }

        const response = await fetch(url+"/users/update-password", {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword:oldPasswordInput.value,
                newPassword:newPassword.value,
                newConfirmPassword:confirmPassword.value
            })
        })


        const data = await response.json()

        if(data.status === "error" || data.status === "fail"){
            alert(data.message)
        }

        if(data.status === "success"){
            localStorage.setItem("token", data.accessToken)
            location.href = "/dashboard.html"
        }

       console.log(data)

        
    })
}