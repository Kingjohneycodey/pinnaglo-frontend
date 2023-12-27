const changePasswordButton = document.getElementById("update-password-button")
const oldPasswordInput = document.getElementById("old-password")
const newPassword = document.getElementById("new-password")
const confirmPassword = document.getElementById("confirm-password")


const url = "https://pinn-algo-capitals.vercel.app/api/v1"

function refreshToken() {
    const token = localStorage.getItem('admin');
  
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
          location.href = './Login Page/adminsect.html'
        }

        


      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }

  };

  refreshToken()


const token = localStorage.getItem("admin")
if (changePasswordButton) {
    
    changePasswordButton.addEventListener("click", async () => {
        if (newPassword.value == " " || confirmPassword.value == " " || oldPasswordInput.value == " " ) {
            
            alert("New Passwords Do not Match")
            return
        }

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