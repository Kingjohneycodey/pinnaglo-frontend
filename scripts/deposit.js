 
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


const blogImage = document.getElementById('payment-proof-image')


// let fr = new FileReader();


// blogImage.addEventListener("change", ()=>{

//     fr.readAsDataURL(blogImage.files[0])

    
//     fr.addEventListener("load", ()=>{


//         blogImageUrl = fr.result;

//        console.log(blogImageUrl)

 
        
//            // selectedimage.src = imageurl;
//     })

// })


submitPayment.addEventListener("click", async () => {

    const formData = new FormData();


formData.append('accountSize', amount.value);
formData.append('duration', plan);
formData.append('transaction_hash', transactionHash.value);
formData.append('attachments', blogImage.files[0]); 

    if(!transactionHash.value){
        alert("Please Input Transaction Hash")
        return
    }


    if(!blogImage.files[0]){

        alert("Please Upload Payment Proof")
        return
    }

    const headers = {
        'authorization': `Bearer ${token}`,
        
    };
    
    
    const response = await fetch(url+"/subscriptions", {
        method: "POST",
        headers: headers,
        body: formData,
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
