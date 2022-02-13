window.onload = function(){
    console.log("g")
    let submit=document.querySelector('#Submit')
    submit.addEventListener("click", function(evt) {
        let PRODNAME1 = document.querySelector('#PRODNAME')
        let PRODGRP1 = document.querySelector('#PRODGRP')
        let INVENTUNT1 = document.querySelector('#INVENTUNT')
        let PRODNAME=PRODNAME1.value
        let PRODGRP=PRODGRP1.value
        let INVENTUNT=INVENTUNT1.value
        let INVENT=0
        let INVENTCOST=0
        let ONORDERQTY=0
        evt.preventDefault()
                    fetch('http://localhost:8000/PRODBR/BR',{
                method: 'POST',
                headers: {
                            'Accept': 'application/json',
                         },
                body: JSON.stringify({PRODCALL:PRODNAME,PRODTYPE:PRODGRP,STORAGE:INVENT,INVENTCLASS:INVENTUNT,INVENTPRICE:INVENTCOST,ONORDER:ONORDERQTY})
    })

})

   }