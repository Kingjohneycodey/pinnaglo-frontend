const loggedInAdmin = async () => {
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



        const username1 = document.getElementById('username1')
        if(username1){

            username1.innerHTML = user.firstName + ' ' + user.lastName

        }

    }
    console.log(data)

}

loggedInAdmin()