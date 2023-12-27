const loggedInUser = async () => {
    const token = localStorage.getItem("admin")
    
    const response = await fetch(url+"/users/me", {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        }
    })


    const data = await response.json()

    if(data.status === "success"){
        const user = data.doc.user
        username2.innerHTML = user.firstName



        if(loggedUsername1){

        loggedUsername1.innerHTML = user.firstName
        loggedInUserballance.innerHTML = (()=>{

        
            if(user.subscription){
                const duration = user.subscription.duration
                const expiration = new Date(user.subscription.expiration).toLocaleDateString()
                const bonus = user.wallet

                return `<p> ${duration}, Expires: ${expiration}</p>`
            }

            return `No Active Subscription`
        })()
        loggedInUserprofit.innerHTML = `$${user.wallet}`
        totalReferralsUser.innerHTML = `${user.totalReferrals}`
        }
    
        if(referalInput){
            referalInput.value = location.host+"/Signup/signup.html?ref="+user.referralLink
        }
    
    }

    // loggedUsername1.innerHTML = data.user.firstName
    // loggedInUserballance.innerHTML = `$${data.user.ballance}`
    // loggedInUserprofit.innerHTML = `$${data.user.profit}`
    // loggedInUserwithdrawals.innerHtml = `${data.user.profit}`

    console.log(data)



}

loggedInUser()