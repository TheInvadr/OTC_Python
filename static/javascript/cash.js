window.onload = function(){
        var table = document.getElementById("sales")
        let button = document.querySelector('#submit')
//        let table = document.getElementById('sales')
        fetch('http://localhost:8000/WHSHOWSPEC/WHSHOWSPECIFIC',
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data){

                let lineitem = document.querySelector('#lineitem')
                lineitem.addEventListener('click',function(evt){
                    evt.preventDefault()
                    table.style.display = 'block'
                    let rows = table.rows.length
//                    console.log(rows)
                    counter = 0
                    bro = 0
                    let row = table.insertRow(rows)
                    counter++
                    let dad = row.insertCell(0)
                    let broski = document.createElement('td')
                    broski.innerHTML = rows
                    dad.appendChild(broski)
                    let product = row.insertCell(1)
                    let prodinput = document.createElement('input')
                    prodinput.setAttribute('id','product')
                    prodinput.setAttribute('placeholder','Product Code')
                    prodinput.setAttribute('required','true')
                    product.appendChild(prodinput)
                    let qty = row.insertCell(2)
                    let qtyinput = document.createElement('input')
                    qtyinput.setAttribute('id','qty')
                    qtyinput.setAttribute('placeholder','Quantity')
                    qtyinput.setAttribute('required','true')
                    qty.appendChild(qtyinput)
                    let price = row.insertCell(3)
                    let priceinput = document.createElement('input')
                    priceinput.setAttribute('id','price')
                    priceinput.setAttribute('placeholder','Price Per Unit')
                    priceinput.setAttribute('required','true')
                    price.appendChild(priceinput)
                    let WHDATA = []
                    WHDATA=data
//                    console.log(WHDATA)
                    let whcodes = []
                    for(i=0;i<WHDATA.length;i++){
                        whcodes.push(WHDATA[i]['WHCODE'])
                    }
                    let WareH = document.createElement('select')
                    WareH.setAttribute('id','WHCODES')
                    for(i=0;i<whcodes.length;i++){
                        option = document.createElement('option')
                        option.innerHTML =  whcodes[i]
                        option.setAttribute('value',whcodes[i])
                        WareH.appendChild(option)
                    }
                    let WH=row.insertCell(4)
                    WH.appendChild(WareH)
                    button.style.display = 'block'

    })})

                        button.addEventListener('click', function(evt){

                        let form = document.getElementById("header")

                        let inputs = form.querySelectorAll("input")

                        for (var i=0;i<inputs.length;i++)
                        {
                            let input_id = inputs[i].id
                            if (document.getElementById(input_id).value.length <= 0){
                                alert("Aye bruh kinda sus, ngl you cappin'")
                                break
                            }

                        }
                        for (let i = 1;i<table.rows.length;i++){
                            for (let j=1;j<table.rows[i].cells.length;j++){
                                let cellsid=0
                                try
                                {
                                    cellsid=table.rows[i].cells[j].querySelector("input").id
                                }
                                catch
                                {
                                    cellsid=table.rows[i].cells[j].querySelector("select").id
                                }
                                console.log(cellsid)
                                if (document.getElementById(cellsid).value.length <= 0){
                                    alert('no')
                                    break
                                }
                            }
                        }
                        let order = 0
                        for (let i = 1;i<table.rows.length;i++){
                            let QUANTITY = table.rows[i].cells[2].querySelector("input").value
                            let PRICE = table.rows[i].cells[3].querySelector("input").value
                            let qtyx = parseInt(QUANTITY)
                            let ppx = parseInt(PRICE)
                            let orderx = qtyx*ppx
                            order=order+orderx
                        }
                        console.log(order)

//                        console.log()

                        evt.preventDefault()

                        let custcode = document.querySelector('#CUSTCODE')
                        let orderdate = document.querySelector('#ORDERDATE')
                        let rdd = document.querySelector('#RDD')
                        let ptcode = document.querySelector('#PTCODE')
                        let product = document.querySelector('#product')
                        let qtya = document.querySelector('#qty')
                        let ppp = document.querySelector('#price')
                        let selector = document.querySelector('#WHCODES')
                        let CUSTCODE = custcode.value
                        let ORDERDATE = orderdate.value
                        let RDD = rdd.value
                        let PTCODE = ptcode.value
                        let PRODUCT = product.value
                        let QTY = qtya.value
                        let PPP = ppp.value
                        let WH = selector.value
                        let PP1 = parseInt(PPP)
                        let QTY1 = parseInt(QTY)
                        let ORDERAMT = PP1*QTY1
                        console.log(CUSTCODE,ORDERDATE,RDD,PTCODE,PRODUCT,PPP,WH)
                        console.log(typeof(CUSTCODE))
                       fetch('http://localhost:8000/CASH/MONEY',{
                            method: 'POST',
                            headers: {
                                        'Accept': 'application/json',
                                     },
                            body: JSON.stringify({DATE1:ORDERDATE , DATE2: RDD,ORDER:order,CUST: CUSTCODE,PAYT:PTCODE})
                          })
                            .then(response => response.json())
                            .then(function (data)
                            {
                                let winston = data['WINSTON'].length
//                                console.log(data['WINSTON'][winston-1][0])
                                let num = data['WINSTON'][winston-1][0]
                                console.log(table.rows.length)
                                for (let i = 1; i <table.rows.length; i++)
                                {
                                    let row = table.rows[i]
                                    let item = row.cells[0].querySelector("td").innerHTML
                                    let productcode = row.cells[1].querySelector("input").value
                                    let quantity = row.cells[2].querySelector("input").value
                                    let priceper = row.cells[3].querySelector("input").value
                                    let selected = row.cells[4].querySelector('select').value
                                    fetch('http://localhost:8000/CASH1/MONEY1',{
                                        method: 'POST',
                                        headers: {
                                                    'Accept': 'application/json',
                                                 },
                                        body: JSON.stringify({SOCODE: num, Item: item,QUANT: quantity,PAYT: priceper,TYPE: 'New',PRODUCT1:productcode,WAREH1:selected})
                                    });
                                }




                                let cust={}
                                fetch('http://localhost:8000/CUSTSPEC/CUST/'+ CUSTCODE,
                                {
                                  headers : {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json'
                                            }

                                    })
                                        .then(response => response.json())
                                        .then(function (data)
                                        {
                                            console.log(data['broski']['0'])
                                            let yo=data['broski']['0']
                                            let total = yo+order
                                            fetch('http://127.0.0.1:8000/CUSTAIUP/AI/' + total + '/' + CUSTCODE, {
                                            method: 'PUT',
                                            headers: {
                                                'Accept': 'application/json',
                                            },
                                            body: JSON.stringify({})
                                           });
                                        })
                                    var prods = {}

                                    for (let i = 1; i < table.rows.length; i++) {
                                        var key = parseInt(table.rows[i].cells[1].querySelector("input").value)
                                        var val = parseInt(table.rows[i].cells[2].querySelector("input").value)

//                                         console.log(key)

                                        if(key in prods)
                                        {
                                            prods[key] = prods[key] + val
                                        }
                                        else
                                        {
                                            prods[key] = val
                                        }

                                    }

                                    let keys = Object.keys(prods)
                                    let values = Object.values(prods)
                                    for(i=0;i<keys.length;i++){
                                        fetch('http://127.0.0.1:8000/PRODUCT/AIUPDATE/' + values[i] + '/' + keys[i], {
                                        method: 'PUT',
                                        headers: {
                                            'Accept': 'application/json',
                                        },
                                        body: JSON.stringify({})
                                       });
                                    }

                                })
                            })
                        }









