
   
     function converter(currency){
       return new Intl.NumberFormat(`en-${currency.substr(0,2)}`,{
            style:'currency',
            currency:currency,
            signDisplay:'always',
            useGrouping:false,
            notation:'standard'
        })
    } 

    export default converter

