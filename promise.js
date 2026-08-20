const MyPromise = new Promise((resolve, reject)=>{
    let age =17 ;
    if(age>=18){
        resolve('Eligible for vote');
    }
    else{
        reject("not eligible");
    }
})

const checkEligibility = () =>{
   try{
    const msg = await MyPromise;
    console.log(msg);
   } 
   catch(error){
    console.log(error);
   }
}
checkEligibility();



/*console.log(MyPromise);
MyPromise
        .then((msg) => console.log(msg))
        .catch((error) => console.log(error));*/










//call-back is denoted by '=>'