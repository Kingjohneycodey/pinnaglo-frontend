
// alert("Connected")


const submitPayment = document.getElementById("payment-button")

const urlParams = new URLSearchParams(location.search)
let plan = urlParams.get("plan") ;
let percentage;
const transactionHash = document.getElementById("hash")

if(plan === "3-months"){
    percentage = 0.9
}else if(urlParams.get("plan") === "6-months"){
    percentage = 0.18
}else if(urlParams.get("plan") === "1-year"){
    percentage = 0.36
}

let blogImageUrl = ""

const blogImage = document.getElementById('payment-proof-image')


let fr = new FileReader();


blogImage.addEventListener("change", ()=>{

    fr.readAsDataURL(blogImage.files[0])

    
    fr.addEventListener("load", ()=>{


        blogImageUrl = fr.result;

       console.log(blogImageUrl)


        
           // selectedimage.src = imageurl;
    })

})

submitPayment.addEventListener("click", async () => {

    if(!blogImageUrl){

        alert("Please Choose Payment Proof")
        return
    }
    
    const response = await fetch(url+"/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify({
            accountSize: amount.value,
            duration:plan,
            attachments:[blogImageUrl],
            transaction_hash:transactionHash.value
        })
    })

    const data = await response.json()




      var payment = document.getElementById('payment-method')
    var goodContainer =document.getElementById('good-container')
    var goodWrapper = document.getElementById('good-wrapper')


    if(data.status === "Created"){

 goodContainer.style.display='block'
        goodWrapper.style.transform='scale(1)'
   
    // document.getElementById("network-test").style.display = "none"

    document.getElementById("copy-text").innerHTML = "Subscription Submited"

    setTimeout(() => {

        location.href = `./addAccount.html?subscription=${data.doc.id}`
        
    }, 1000);


    }else{
        alert(data.error.message)
    }

    

    console.log(data)

})
