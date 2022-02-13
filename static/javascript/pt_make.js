function myFunction(selTag) {
  var x = selTag.options[selTag.selectedIndex].value;
  document.getElementById("demo").innerHTML = x;
    }
window.onload = function(){
    console.log("g")
    let submit=document.querySelector('#Submit')
    submit.addEventListener("click", function(evt) {
        let PTDESC = document.querySelector('#PTDESC')
        let PTDAYS = document.querySelector('#PTDAYS')
        let PTBASIS = document.querySelector('#basisSelect')
        let PTDAYS1=PTDAYS.value
        let PTDESC1=PTDESC.value
        evt.preventDefault()
        let text=PTBASIS.options[PTBASIS.selectedIndex].innerHTML
        console.log(`${PTDESC1}, ${PTDAYS1}, ${text}`)
                    fetch('http://localhost:8000/PTC/C',{
                method: 'POST',
                headers: {
                            'Accept': 'application/json',
                         },
                body: JSON.stringify({PTNAME: PTDESC1, PTTIME: PTDAYS1, PTTYPE:text})
    })
    PTDESC=null
    PTDAYS=null
})

   }