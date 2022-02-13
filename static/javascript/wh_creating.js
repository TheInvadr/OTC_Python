window.onload = function(){
    console.log("g")
    let WHNAME_ = document.querySelector('#WHNAME')
    let WHADD_ = document.querySelector('#WHADD')
    let submit=document.querySelector('#Submit')
    submit.addEventListener("click", function(evt) {
        evt.preventDefault()
        let WHAME = WHNAME_.value
        let WHADD = WHADD_.value
         console.log(`Wow ${WHAME}`)
         console.log(`Wow ${WHADD}`)
            fetch('http://localhost:8000/WHMAK/MAKE',{
                method: 'POST',
                headers: {
                            'Accept': 'application/json',
                         },
                body: JSON.stringify({whName: WHAME, whAdd: WHADD})
  });
            WHNAME_.value=null
            WHADD_.value=null
    });
        }