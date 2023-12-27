// alert("Hello World")

// alert("Connected")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"


const token = localStorage.getItem("token")
const logOutBtn = document.getElementById("logout")
const referalInput = document.getElementById("ref-link")


if(!token){

    location.href = "./Login Page/login.html"
}

function refreshToken() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // If token doesn't exist in local storage, consider it expired
      return true;
    }
  
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decoding the payload of the token
  
      // Check if the token has an 'exp' (expiration) claim
      if (tokenPayload && tokenPayload.exp) {
        const expirationTime = tokenPayload.exp * 1000; // Convert expiration time to milliseconds
        
        const currentTime = Math.floor(Date.now() / 1000);

        // Compare the expiration time with the current time
        if(Date.now() >= expirationTime){
          alert('token expired')
          localStorage.clear()
          location.href = './Login Page/login.html'
        }

        


      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }

  };

  refreshToken()
  
 

const loggedUsername1 = document.getElementById("user-name3")
const username2 = document.getElementById("user-name")
const loggedInUserballance = document.getElementById("account-balance")
const loggedInUserprofit = document.getElementById("total-profit")
const loggedInUserwithdrawals = document.getElementById("Withdrawals-total")
const totalReferralsUser = document.getElementById("total-bonus")

const loggedInUser = async () => {
    
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

const logOut = ()=>{

    localStorage.clear()
    location.href = "/index.html"

}