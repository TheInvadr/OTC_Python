var ptcode_data = ""

fetch('http://localhost:8000/PTDIS/DIS',
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                ptcode_data = data
            });
var whcode_data = ""
fetch('http://localhost:8000/WHSHO/SHOW',
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                whcode_data = data
            });
window.onload = function(){
    SUBMIT.addEventListener('click',function(evt){
        evt.preventDefault()
        let CUSTNAME1 = document.querySelector('#CUSTNAME')
        let CUSTADD1 = document.querySelector('#CUSTADD')
        let PTCODE1 = document.querySelector('#PTCODE')
        let WHCODE1 = document.querySelector('#WHCODE')
        let SUBMIT = document.querySelector('#SUBMIT')
        let CUSTNAME = CUSTNAME1.value
        let CUSTADD = CUSTADD1.value
        let PTCODE = PTCODE1.value
        let WHCODE = WHCODE1.value
        let codes = []
        for(let i=0;i<ptcode_data.length;i++){
            let values1=Object.values(ptcode_data[i])
            let id=values1[0]
            codes.push(id)
        }
        console.log(codes)
        console.log(PTCODE)
        if (codes.includes(parseInt(PTCODE)) == false){
            alert('INVALID PTCODE')
            abort()
        }
        let whcodes = []
        for(let i=0;i<whcode_data.length;i++){
            let values2=Object.values(whcode_data[i])
            let id2=values2[0]
            whcodes.push(id2)
        }
        if (whcodes.includes(parseInt(WHCODE)) == false){
            alert('INVALID WHCODE')
            abort()
        }
                    fetch('http://localhost:8000/CUSTAD/AD',{
                method: 'POST',
                headers: {
                            'Accept': 'application/json',
                         },
                body: JSON.stringify({CUSTCALL: CUSTNAME, CUSTPLACE: CUSTADD,PTID: PTCODE,WHID: WHCODE})
  });
    })
}