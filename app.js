// show slides according to sidebar

// get the div inside the container
let container_div = document.querySelector(".container");

// get the ul li inside sidebar
let sidebar_items = document.querySelectorAll(".steps ul li");

sidebar_items.forEach((item)=>{
    item.addEventListener("click",()=>{
        // remove active class from all divs
        Array.from(container_div.children).forEach((div)=>{
            div.classList.remove("active");
        })
        // remove active class from all list items
        sidebar_items.forEach((item)=>{
            item.querySelector(".number").classList.remove("active");
        })
        // add active class to the the p with class = "number" inside the clicked item.
        item.querySelector(".number").classList.add("active")

        // add active class to the div which has the same class
        container_div.querySelector(`.${item.className}`).classList.add("active");

    })
});
// global function
function remove_sidebar_active_class () {
    sidebar_items.forEach((item)=>{
        item.querySelector(".number").classList.remove("active");
    })
} 

function remove_div_active_class() {
    Array.from(container_div.children).forEach((div)=>{
        div.classList.remove("active");
    });
}
//  start form validation
// select the form 
let form = document.querySelector(".info form");

// set the focus event //change the border color during writing
form.addEventListener("focus",(e)=>{
    e.target.style.borderColor = "black";
},true)

// set the blur event
form.addEventListener("blur",(e)=>{
    e.target.style.borderColor = "hsl(229, 24%, 87%)";
},true)

// form vaildation
Array.from(form.children).forEach((input)=>{
    input.addEventListener("focusout",()=>{
        // catch the span inside the label to show the message.
        let span_inside_label = input.previousElementSibling.querySelector("span");
        // check the field is not empty
        if(input.value.length == 0){
            // add the message to the span
            span_inside_label.innerText = "This field is required";
            span_inside_label.style.color = "red";
            input.style.borderColor = "red"
        }
        else{
            // regex for name , email , telephone
            let regex = [/^[a-zA-Z][\w-_\s]{4,}/,/\w+@\w+.\w+/,/\d{1,15}/];
            // Array.from(form.querySelectorAll("input")) =[input#name,input#email,input#phone]
            // check for the regex
            let input_index =Array.from(form.querySelectorAll("input")).indexOf(input);
            
            // check the regex
           if(regex[input_index].test(input.value)){
                    span_inside_label.innerText = "Vaild";
                    span_inside_label.style.color = "green";
                    input.style.borderColor = "green";
                    // check if this is the input name filed
                    if(input.getAttribute("type") == "text"){
                        input.value = input.value[0].toUpperCase() + input.value.slice(1);
                    }
           }
           else{
            span_inside_label.style.color = "red";
            input.style.borderColor = "red";
            if(input.getAttribute("type") == "text"){
                if (input.value.length < 4){
                        span_inside_label.innerText = "Your name must be at least 4 chars";
                }
                else{
                    span_inside_label.innerText = "InVaild, Please follow the user name pattern";
                }
            }
            else{
                span_inside_label.innerText = "Invaild"
            }
           }

        }
    })
    if(input.getAttribute("type") == "tel"){
        // write the phone number in the format pattern
        input.addEventListener("input",()=>{
            // change any non digit with "";
            let cleaned_tel = (""+input.value).replace(/\D/g , "");
            let match_tel = cleaned_tel.match(/^(1)?(\d{0,3})?(\d{0,3})?(\d{0,3})?(\d{0,2})?/);
            input.value =  [
                match_tel[1] ? "+1" :"",
                match_tel[2] ? " " : "",
                match_tel[2],
                match_tel[3] ? " " : "",
                match_tel[3],
                match_tel[4] ? " " : "",
                match_tel[4],
                match_tel[5] ? " " : "",
                match_tel[5]
            ].join(""); 
        })
    }
})

//make the button next step
let next_button_in_form = document.querySelector(".info .confirm");

next_button_in_form.addEventListener("click",()=>{

        //check if all input field is vaild 
        let Vaild_or_not = Array.from(form.querySelectorAll("label span")).every((span)=>{return span.innerText == "Vaild"});
            if (Vaild_or_not){
                    // remove active class from all aside elements
                    remove_sidebar_active_class();
                    // add the active to the side bar li which has the same class name
                    document.querySelector(`aside li.${next_button_in_form.parentElement.parentElement.nextElementSibling.className}`).querySelector("p.number").classList.add("active")
                    
                    remove_div_active_class();
                    // add the active class to the next div
                    next_button_in_form.parentElement.parentElement.nextElementSibling.classList.add("active");     
            }
            else{
                Array.from(form.querySelectorAll("label span")).forEach((span)=>{
                    if (span.innerText == ""){
                        span.innerText = "This field is required";
                        span.style.color = "red";
                        span.parentElement.nextElementSibling.style.borderColor = "red"
                    }
                })
            }

})

// step 3 
// add the cheked items
let bill_summary = document.querySelector(".bill-sumary");
let services = Array.from(document.querySelectorAll(".add-container div.s"));
let services_input = document.querySelectorAll(".add-container label input");

services_input.forEach((item)=>{
    item.addEventListener("change",()=>{
       if(item.checked){
        console.log(`.${item.parentElement.parentElement.classList[0]}`)
        bill_summary.querySelector(`.${item.parentElement.parentElement.classList[0]}`).style.display = "flex";
       }
       else{
        bill_summary.querySelector(`.${item.parentElement.parentElement.classList[0]}`).style.display = "none";
       }
       document.querySelector(".total h4 span").innerText = `${(Number(document.querySelector(".choosen p span").innerText) + add_total(services_input))}`
       console.log(add_total(services_input))
    })
})

// get the addition items total
function add_total(items) {
    let total = 0;
    items.forEach((item)=>{
        if(item.checked){
            total+=Number(item.parentElement.parentElement.lastElementChild.lastElementChild.innerText);
        }
        else{
            total = total
        }
    })
    return total;
}
// start step 2 
let pay_methods = Array.from(document.querySelector(".billing-methods").children);
pay_methods.forEach((div)=>{
    div.addEventListener("click",()=>{
       pay_methods.forEach((div)=>{
        div.classList.remove("choosen")
       });
       div.classList.add("choosen"); 
        //change the h3 content of bill summary
        bill_summary.querySelector("h3").innerText = div.querySelector("h2").innerText;
        // change the price in bill summary
        bill_summary.querySelector(".month-or-year .p").innerHTML = document.querySelector(".choosen p").innerHTML; 
         // change the total price
        //  get the addition items price 
         document.querySelector(".total h4 span").innerText = `${Number(document.querySelector(".choosen p span").innerText) + add_total(services_input)}`
    })
});

// payment (month or year)
let payment_time = document.querySelector(".billing-time");
let radio_button = payment_time.querySelector("button span");

radio_button.addEventListener("click",()=>{
    if (radio_button.style.left == 5 + "px"){
        radio_button.style.left = 33 + "px"
    }
    else{
        radio_button.style.left = 5 + "px"
    }
    Array.from(payment_time.querySelectorAll("p")).forEach((p)=>{
        p.classList.toggle("active");
    })
    // check if yearly payment is active
    if(payment_time.querySelector("p.yearly").className == 'yearly active'){
        // add the discount on each payment method
        pay_methods.forEach((div)=>{
            div.lastElementChild.lastElementChild.innerText = "2 months free";
            div.querySelector("p").innerHTML = `$<span>${Number(div.querySelector("p span").innerText) * 10}</span>/yr`
        });
        
        // chnage the payment time in services
        services.forEach((ser)=>{
            ser.lastElementChild.innerHTML = `+$<span>${Number(ser.querySelector("p span").innerText) * 10}</span>/yr` 
        })
        // change the bill summary content
        bill_summary.querySelector(".method p").innerText = "(Yearly)";
        // change the price in bill summary
        bill_summary.querySelector(".month-or-year .p").innerHTML = document.querySelector(".choosen p").innerHTML;
        // change online service price
        bill_summary.querySelector(".service").lastElementChild.innerHTML = document.querySelector(".add-container .service").lastElementChild.innerHTML;
        // change online service price
        bill_summary.querySelector(".store").lastElementChild.innerHTML = document.querySelector(".add-container .storage").lastElementChild.innerHTML;
         // change online service price
         bill_summary.querySelector(".profile").lastElementChild.innerHTML = document.querySelector(".add-container .profile").lastElementChild.innerHTML;
        // change the total price
        document.querySelector(".total h4").innerHTML = `+$<span>${(Number(document.querySelector(".choosen p span").innerText)) + add_total(services_input)}</span>/yr`
        // change the total price time 
        document.querySelector(".total p").innerText = "Total (per Year)";
    }
    else{
        // remove the discount from each payment
        pay_methods.forEach((div)=>{
            div.lastElementChild.lastElementChild.innerText = "";
            div.querySelector("p").innerHTML = `$<span>${Number(div.querySelector("p span").innerText) / 10}</span>/mo`
        })  
        // chnage the payment time in services
        services.forEach((ser)=>{
            ser.lastElementChild.innerHTML = `+$<span>${Number(ser.querySelector("p span").innerText) / 10}</span>/mo` 
        })
        // change the bill summary content
        bill_summary.querySelector(".method p").innerText = "(Monthly)";

         // change the price in bill summary
         bill_summary.querySelector(".month-or-year .p").innerHTML = document.querySelector(".choosen p").innerHTML;
         // change online service price
         bill_summary.querySelector(".service").lastElementChild.innerHTML = document.querySelector(".add-container .service").lastElementChild.innerHTML;
          // change online service price
          bill_summary.querySelector(".store").lastElementChild.innerHTML = document.querySelector(".add-container .storage").lastElementChild.innerHTML;
           // change online service price
           bill_summary.querySelector(".profile").lastElementChild.innerHTML = document.querySelector(".add-container .profile").lastElementChild.innerHTML;
            // change the total price
        document.querySelector(".total h4").innerHTML = `+$<span>${Number(document.querySelector(".choosen p span").innerText) + add_total(services_input)}</span>/mo`
          // change the total price time 
          document.querySelector(".total p").innerText = "Total (per Year)";
}
});
    

// make the next button in select
let next_btns = document.querySelectorAll("button.next");

Array.from(next_btns).forEach((button)=>{
    button.addEventListener("click",()=>{
        remove_sidebar_active_class();
        document.querySelector(`aside li.${button.parentElement.parentElement.nextElementSibling.className}`).querySelector("p.number").classList.add("active");
        remove_div_active_class();
        button.parentElement.parentElement.nextElementSibling.classList.add("active");     
})
});

// back buttons
let back_btns = document.querySelectorAll("button.back");
Array.from(back_btns).forEach((button)=>{
    button.addEventListener("click",()=>{
        remove_sidebar_active_class();
        document.querySelector(`aside li.${button.parentElement.parentElement.previousElementSibling.className}`).querySelector("p.number").classList.add("active");
        remove_div_active_class();
        button.parentElement.parentElement.previousElementSibling.classList.add("active");     
})
});

// make the change button 
let change = bill_summary.querySelector(".change");
change.addEventListener("click",()=>{
    if (radio_button.style.left == 5 + "px"){
        radio_button.style.left = 33 + "px"
    }
    else{
        radio_button.style.left = 5 + "px"
    }
    Array.from(payment_time.querySelectorAll("p")).forEach((p)=>{
        p.classList.toggle("active");
    })
   if (bill_summary.querySelector(".method p").innerText == "(Yearly)"){
        bill_summary.querySelector(".method p").innerText = "(Monthly)";
        // change online service price
        bill_summary.querySelector(".service").lastElementChild.innerHTML = `+$1/mo`;
        // change online service price
        bill_summary.querySelector(".store").lastElementChild.innerHTML = `+$2/mo`;
        // change online service price
        bill_summary.querySelector(".profile").lastElementChild.innerHTML = `+$2/mo`;
        // change the total price time 
        document.querySelector(".total p").innerText = "Total (per Month)";
        // change the price in bill summary
        bill_summary.querySelector(".month-or-year .p").innerHTML = `$${Number(document.querySelector(".choosen p span").innerText) /10}/mo`;
        // chnage the payment time in services
        services.forEach((ser)=>{
            ser.lastElementChild.innerHTML = `+$<span>${Number(ser.querySelector("p span").innerText) / 10}</span>/mo` 
        })
        // add the discount on each payment method
        pay_methods.forEach((div)=>{
            div.lastElementChild.innerText = "";
            div.querySelector("p").innerHTML = `$<span>${Number(div.querySelector("p span").innerText) / 10}</span>/mo`
        });
        // change the total price
        document.querySelector(".total h4").innerHTML = `+$${(Number(document.querySelector(".choosen p span").innerText)) + add_total(services_input)}/mo`
   } 
   else{
    bill_summary.querySelector(".method p").innerText = "(Yearly)";
     // change online service price
     bill_summary.querySelector(".service").lastElementChild.innerHTML = `+$10/yr`;
     // change online service price
     bill_summary.querySelector(".store").lastElementChild.innerHTML = `+$20/yr`;
      // change online service price
      bill_summary.querySelector(".profile").lastElementChild.innerHTML = `+$20/yr`;
     // change the total price time 
     document.querySelector(".total p").innerText = "Total (per Year)";
     // change the price in bill summary
     bill_summary.querySelector(".month-or-year .p").innerHTML = `$${Number(document.querySelector(".choosen p span").innerText) *10}/yr`;
     // chnage the payment time in services
    services.forEach((ser)=>{
         ser.lastElementChild.innerHTML = `+$<span>${Number(ser.querySelector("p span").innerText) * 10}</span>/yr` 
    })
    // add the discount on each payment method
    pay_methods.forEach((div)=>{
        div.lastElementChild.innerText = "2 months free";
        div.querySelector("p").innerHTML = `$<span>${Number(div.querySelector("p span").innerText) * 10}</span>/yr`
    });
    //change the total price
     document.querySelector(".total h4").innerHTML = `+$${(Number(document.querySelector(".choosen p span").innerText)) + add_total(services_input)}/yr`
   }
})

// make the confirm button
let confirm_btn = document.querySelector(".summary .confirm");
console.log(confirm_btn);
confirm_btn.addEventListener("click",()=>{

    Array.from(form.querySelectorAll("label span")).every((span)=>{
        if (span.innerText == "Vaild"){
            // appear the confirm window
            let summary = document.querySelector("div.summary");
            summary.classList.add("thank")
            // add the inner html 
            summary.innerHTML = `
            <img src = "./assets/images/icon-thank-you.svg" class = "thank_img">
            <h3 class = "thank_heading">Thank you!</h3>
            <p class = thank_p">
            Thanks for confirming your subscription! We hope you have fun 
            using our platform. If you ever need support, please feel free 
            to email us at support@loremgaming.com.
            </p>
            
            `
        }
        else{
            remove_div_active_class();         
            // display the first div
            container_div.querySelector(".info").classList.add("active");
            // make all fileds required
            Array.from(form.querySelectorAll("label span")).forEach((span)=>{
                if (span.innerText == ""){
                    span.innerText = "This field is required";
                    span.style.color = "red";
                    span.parentElement.nextElementSibling.style.borderColor = "red"
                }
        })
    }  
}    
)})