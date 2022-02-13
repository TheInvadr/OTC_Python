Formercost = ""
Formerqty = ""

var FORMERQTY = 0
var FORMERCST = 0

function broslow(){
        event.stopPropagation();
        var id_ = event.target.parentNode.parentNode.cells[0].innerHTML
        var price = event.target.parentNode.parentNode.cells[5].innerHTML
        var quantity = event.target.parentNode.parentNode.cells[4].innerHTML
        var prodcode = parseInt(event.target.parentNode.parentNode.cells[2].innerHTML)

        if (confirm('Are you really sure you want to delete this ?'))
        {

        fetch('http://localhost:8000/PRODDISPEC/SPEC/' + prodcode,
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                Formercost=data['INVENTCOST']
                Formerqty=data['ONORDERQTY']
                console.log(Formercost,Formerqty)

                var PRICE = parseInt(price)
                var QUANT = parseInt(quantity)
                FORMERCST = parseInt(Formercost)
                FORMERQTY = parseInt(Formerqty)
                var futureinventcost=FORMERCST-(QUANT*PRICE)
                var futureqty=FORMERQTY-QUANT

                console.log(futureinventcost, futureqty)

                fetch('http://localhost:8000/GOODS/GOODSUPD', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                },
                body: JSON.stringify({PTBASISCODE1: futureqty,BRO:futureinventcost, PTDESC1: prodcode})
                       });

                fetch('http://localhost:8000/GOODBANISH/BANISH',
                {
                     headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                     method: "DELETE",
                body: JSON.stringify({id: id_,})

        })
            })

        }
        else{
            void(0)
        }



}
function myFunction(x){
    var prodcode = parseInt(x.cells[2].innerText)
          fetch('http://localhost:8000/PRODDISPEC/SPEC/' + prodcode,
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                console.log(data)
                Formercost=data['INVENTCOST']
                Formerqty=data['ONORDERQTY']
                FORMERQTY = parseInt(Formerqty)
                FORMERCST = parseInt(Formercost)
                })

  var id = (x.cells[0].innerText)

  var modal = document.getElementById("myModal");

  modal.style.display = "block";

  fetch('http://localhost:8000/SKR/CLOCKER/' + id,
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                var disp_form = modal.querySelector('form')

                for (const attr in data)
                {
                    var label = document.createElement("label")
                    label.setAttribute("for", attr.replace(/ /g,''))

                    label.innerHTML = attr

                    disp_form.append(label)

                    var input = document.createElement('input')

                    if (attr === "BATCHNO")
                    {
                        input.setAttribute("readonly", true)
                    }
                    if (attr === "PRODCODE")
                    {
                        input.setAttribute("readonly",true)
                    }
                    var type_ = ""
                    if (attr === "DATE")
                    {
                        type_ = "date"
                    }
                    else
                    {
                        type_ = "text"
                    }

                    input.setAttribute("type", type_)

                    input.setAttribute("value", data[attr])

                    input.setAttribute("id", attr.replace(/ /g,''))

                    disp_form.appendChild(label)

                    disp_form.appendChild(input)

                    disp_form.appendChild(document.createElement('br'))
                }
                var button = document.createElement("button")

                button.innerHTML = "Submit"

                button.setAttribute("id", "sub")

                disp_form.appendChild(button)
                let DATE2 = document.querySelector('#DATE').value
                let BATCHNO2 = document.querySelector('#BATCHNO').value
                let PRODCODE2 = document.querySelector('#PRODCODE').value
                let QTY2 = document.querySelector('#QTY').value
                let PPP2 = document.querySelector('#PRICEPERUNT').value
                let PONUM2= document.querySelector('#PONUM').value
                let VENDOR2 = document.querySelector('#VENDOR').value
                let WHCODE2 = document.querySelector('#WHCODE_id').value
                let resetqty = FORMERQTY - parseInt(QTY2)
                console.log(FORMERQTY, resetqty)
                let resetprice = FORMERCST - (parseInt(PPP2)*parseInt(QTY2))
                document.getElementById("sub").addEventListener("click", function(event){
                    event.preventDefault()
                    let DATE1 = document.querySelector('#DATE').value
                    let BATCHNO1 = document.querySelector('#BATCHNO').value
                    let PRODCODE1 = document.querySelector('#PRODCODE').value
                    let QTY1 = document.querySelector('#QTY').value
                    let PPP1 = document.querySelector('#PRICEPERUNT').value
                    let PONUM1 = document.querySelector('#PONUM').value
                    let VENDOR1 = document.querySelector('#VENDOR').value
                    let WHCODE1 = document.querySelector('#WHCODE_id').value
                    let BILLS = parseInt(PPP1)
                    let AMOUNT = parseInt(QTY1)
                    nextcost=BILLS*AMOUNT
                    console.log(resetprice, nextcost, resetqty, AMOUNT,FORMERCST,FORMERQTY,parseInt(QTY2),parseInt(PPP2))
                    let updatedcost = resetprice+nextcost
                    console.log(FORMERQTY, resetqty, AMOUNT)
                    let updatedqty = resetqty+AMOUNT

                    let old_data = {DATE: DATE2, QTY: QTY2, PRICEPERUNT:PPP2, PONUM:PONUM2,VENDOR:VENDOR2,WHCODE_id:WHCODE2, PRODCODE: PRODCODE2}
                    let new_data = {DATE: DATE1, QTY: QTY1, PRICEPERUNT:PPP1, PONUM:PONUM1,VENDOR:VENDOR1,WHCODE_id:WHCODE1, PRODCODE: PRODCODE1}

                    let data_ = [old_data, new_data]

//                    console.log(BATCHNO1,PRODCODE1,QTY1,PPP1,PONUM1,VENDOR1,WHCODE1,resetqty,resetprice,AMOUNT,nextcost)

                    fetch('http://127.0.0.1:8000/MATRESS/KING/' + BATCHNO1, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(data_)
                   });

               fetch('http://localhost:8000/GOODS/GOODSUPD', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                },
                body: JSON.stringify({PTBASISCODE1: updatedqty,BRO:updatedcost, PTDESC1: PRODCODE1})
                   });

            })
        })
}

window.onload = function(){
fetch('http://localhost:8000/RECIEPTDA/D',
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                console.log(data)
				let table = document.querySelector('tbody')

				for(const [idx, reciept] of data.entries())
				{
				    let row = table.insertRow(idx)

				    let counter = 0

				    for(let attr in reciept)
				    {
				        let cell = row.insertCell(counter)

				        cell.innerHTML = data[idx][attr]

				        counter++
				    }
                    let cell = row.insertCell(counter)
				    let del_but = document.createElement("button")
				    del_but.setAttribute("onclick","broslow()")
				    del_but.innerHTML = "Delete"
                    row.setAttribute("onclick","myFunction(this)")
				    cell.appendChild(del_but)
                }

            })
        }