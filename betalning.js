//kollar efter klick på knappen och startar validering
if (window.location.pathname == "/bokningsuppgifter.html"){
    document.getElementById("to-payment-btn").addEventListener("click", () => {
        validateInfoForm()
    })

    document.getElementById("coupon-btn").addEventListener("click", () => {
        document.getElementById("coupon").value = ""
        window.alert("Ange en giltig kampanjkod")
    })
}

function validateInfoForm(){    
    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("last-name")
    const phoneNumber = document.getElementById("phone-number")
    const email = document.getElementById("email")

    if (firstName.value == "" || lastName.value == "" || phoneNumber.value == "" || email.value == ""){
        window.alert("Var vänlig fyll i alla fälten")
        return
    }
    //kollar så för och efternamnet endast innehåller bokstäver
    if (/[^a-zA-Z ]/.test(firstName.value)){
        window.alert("Fyll i ett giltigt förnamn")
        return
    }
    if (/[^a-zA-Z ]/.test(lastName.value)){
        window.alert("Fyll i ett giltigt efternamn")
        return
    }
    //kollar så telefon nummret endast innehåller siffror
    if (!/[0-9 ]/.test(phoneNumber.value)){
        window.alert("Fyll i ett giltigt telefonnummer")
        return
    }
    //kollar så numret inte är för kort
    if (phoneNumber.value.length < 10){
        window.alert("Fyll i ett giltigt telefonnummer")
        return
    }
    //kollar så emailen är korrekt
    if (!/^\S+@\S+\.\S+$/.test(email.value)){
        window.alert("Fyll i en giltig epost")
        return
    }
    
    window.location.href = "betalningsuppgifter.html"
}



if (window.location.pathname == "/betalningsuppgifter.html") {
    const payButton = document.getElementById("payment-info-button")
    payButton.addEventListener("click", () => {
        validatePayForm()
    })
}

function validatePayForm(){
    const nameField = document.getElementById("card-name")
    const cardNumberField = document.getElementById("card-number")
    const dateField = document.getElementById("expiration")
    const cvcField = document.getElementById("cvc-info")

    //kolla så inget fält är tomt
    if (nameField.value == "" || cardNumberField.value == "" || dateField.value == "" || cvcField.value == ""){
        window.alert("Fyll i alla fälten")
        return
    }
    //kollar om namnet bara innehåller bokstäver
    if (/[^a-zA-Z ]/.test(nameField.value)){
        window.alert("Fyll i ett giltigt namn")
        return
    }
    //kollar så kort numret bara innehåller siffror
    if (!/[0-9 ]/.test(cardNumberField.value)){
        window.alert("Fyll i ett giltigt kortnummer")
        return
    }
    //kollar längden på kort numret
    if (cardNumberField.value.length != 16){
        window.alert("Fyll i ett giltigt kortnummer")
        return
        
    }
    //kollar så cvc numret bara innehåller siffror
    if (!/[0-9]/.test(cvcField.value)){
         window.alert("Fyll i ett giltigt cvc nummer")
        return
    }

    window.location.href = "betalningsKvitto.html"
    
}

