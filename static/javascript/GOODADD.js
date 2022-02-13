var PRODUCT = ""
window.onload = function(){
    console.log("g")
    let submit=document.querySelector('#Submit')
    submit.addEventListener("click", function(evt) {
        let DATE1 = document.querySelector('#DATE')
        let PROCODE1 = document.querySelector('#PRODCODE')
        let WHCODE1 = document.querySelector('#WHCODE')
        let QTY1 = document.querySelector('#QTY')
        let PPP1 = document.querySelector('#PPP')
        let PONUM1 = document.querySelector('#PONUM')
        let VENDOR1 = document.querySelector('#VENDOR')
        let SUBMIT = document.querySelector('#Submit')
        let Date=DATE1.value
        let Procode=PROCODE1.value
        let Whcode=WHCODE1.value
        QTY333=QTY1.value
        let QTY=parseInt(QTY1.value)
        let PPP=PPP1.value
        let Price=parseInt(PPP)
        let PONUM=PONUM1.value
        let VENDOR=VENDOR1.value
        evt.preventDefault()
        console.log(Procode)
        let PRO=parseInt(Procode-1)
        console.log(PRO)
        console.log(Whcode)
        fetch('http://localhost:8000/PRODSI/SI',
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                PRODUCTS=data
                console.log(PRODUCTS)
                let respectiveProduct=PRODUCTS[PRO]
                console.log(respectiveProduct)
                let values1 = Object.values(respectiveProduct)
                PRODONORDERQTY=respectiveProduct['ONORDERQTY']
                PRICESSSOLOW=respectiveProduct['INVENTCOST']
                console.log(PRODONORDERQTY)
                console.log(PRODONORDERQTY)
                let newqty=PRODONORDERQTY+QTY
                console.log(newqty)
                let BroPrice=Price*QTY
                NEWPRICE=PRICESSSOLOW+BroPrice
                console.log(BroPrice)
                console.log(NEWPRICE)
                fetch('http://localhost:8000/GOODSY/O',{
                    method: 'POST',
                    headers: {
                                'Accept': 'application/json',
                             },
                    body: JSON.stringify({DATE12:Date,PCODE:Procode,WCODE:Whcode,QUANTY:QTY333,PPP2:PPP,PO:PONUM,SELLER:VENDOR})
    })

                fetch('http://localhost:8000/GOODS/GOODSUPD', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({PTBASISCODE1: newqty,BRO:NEWPRICE, PTDESC1: Procode})
                   });
            })

        })
    }