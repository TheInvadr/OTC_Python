function myFunction(x){
    var old_val = {}
  var id = (x.cells[0].innerText)

  var modal = document.getElementById("myModal");

  modal.style.display = "block";

  fetch('http://localhost:8000/SALESREP/SALESSPECIFYINGLY/' + id,
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
//                console.log(data)
                data = data[0]
                var disp_form = modal.querySelector('form')

                for (const attr in data)
                {
                    var label = document.createElement("label")
                    label.setAttribute("for", attr.replace(/ /g,''))

                    label.innerHTML = attr

                    disp_form.append(label)

                    var input = document.createElement('input')

                    if (attr === "SONUM")
                    {
                        input.setAttribute("readonly", true)
                    }

                    var type_ = ""
                    {
                        type_ = "text"
                    }

                    input.type = type_

                    input.setAttribute("value", data[attr])

                    input.setAttribute("id", attr.replace(/ /g,''))

                    disp_form.appendChild(label)

                    disp_form.appendChild(input)

                    disp_form.appendChild(document.createElement('br'))
                }
                disp_form.appendChild(document.createElement('br'))
                var button = document.createElement("button")
                button.innerHTML = "Submit"
                button.setAttribute("id", "sub")
                disp_form.appendChild(button)
                let array = [1,2,3]
                for(let i=0;i<array.length;i++){
                    let br = document.createElement('br')
                    disp_form.appendChild(br)
                }
                fetch('http://localhost:8000/SALESREP/NAHFAM/' + id,
                {
                  headers : {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }

                    })
                        .then(response => response.json())
                        .then(function (data)
                        {
                            data = data.sort((a,b)=> (a.ITEM < b.ITEM ? 1 : -1))
                            var disp_form = modal.querySelector('form')
                            var table = document.getElementById("sales")
                            let rows = table.rows.length
                            for (let i=0;i<data.length;i++)
                            {
		                        old_val[parseInt(i+1)] = []
                                let values = Object.values(data[i])
//                                console.log(data[i])
                                let w_code = data[i]['WAREH']
                                let row = table.insertRow(rows)
                                for(let j=0;j<values.length;j++)
                                {
                                        let broski = document.createElement('td')
                                        //broski.innerHTML = rows
//                                        row.appendChild(broski)
                                    fetch('http://localhost:8000/WHSHOWSPEC/WHSHOWSPECIFIC',
                                    {
                                      headers : {
                                                    'Content-Type': 'application/json',
                                                    'Accept': 'application/json'
                                                }

                                        })
                                    .then(response => response.json())
                                    .then(function (data){
//                                    console.log(Object.values(data[i]))
                                        let nah = row.insertCell(j)

                                        if(j==6){
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
//                                            console.log(w_code, whcodes[i])
                                                option = document.createElement('option')
                                                option.innerHTML =  whcodes[i]
                                                option.setAttribute('value',whcodes[i])
                                                 if (whcodes[i] == w_code)
                                                {
                                                    option.setAttribute("selected", w_code)
//                                                    old_val[i+1].push(w_code)
                                                }

                                                WareH.appendChild(option)

                                            }
                                            nah.appendChild(WareH)

                                        }
                                        else
                                        {
                                        let input = document.createElement('input')
                                        input.setAttribute('id',values[j])
                                        input.setAttribute('placeholder',values[j])
                                        input.setAttribute('value',values[j])
//                                        let SONUMBER = table.rows[i].cells[0].querySelector('input').value
//                                        let ITEM = table.rows[i].cells[1].querySelector('input').value
//                                        let QTY = table.rows[i].cells[2].querySelector('input').value
//                                        let PRICE = table.rows[i].cells[3].querySelector('input').value
//                                        let PRODCODE = table.rows[i].cells[4].querySelector('input').value
    //                                  console.log(input)
                                        nah.appendChild(input)
                                        old_val[parseInt(i+1)].push(values[j])
//                                        console.log(Object.values(old_val)[0])
                                        }

                                })
                            }
                            old_val[parseInt(i+1)].push(w_code)

//                            old_val[parseInt(i+1)].push(old_val[parseInt(i+1)].shift())

//                            old_val = old_val.sort((a,b)=> (a.2 < b.2 ? 1 : -1))
//                            console.log(old_val)
                        }
                                        button.addEventListener('click',function(evt){
                                            evt.preventDefault()
                                            let table = document.getElementById("sales")
                                            let newval = {}
                                            for(let i = 1;i<table.rows.length;i++){
                                                var bro = table.rows[i]
//                                                console.log(bro.cells)
                                                newval[parseInt(i)] = []
                                                for(let j=0;j<bro.cells.length;j++){
//                                                    console.log(bro.cells[j])
                                                    if (j==6)
                                                    {
                                                        newval[parseInt(i)].push((bro.cells[j].querySelector('select').value))
                                                    }
                                                    else
                                                    {
                                                        newval[parseInt(i)].push((bro.cells[j].querySelector('input').value))
                                                    }
                                            }
                                        }
                                            let new_val_val_i = Object.values(newval)
                                            let old_val_val_i = Object.values(old_val)
                                            var new_qty = ''
                                            var new_price = ''
                                            var newprod = ''
                                            var newwh = ''
                                            var sonum1 = ''
                                            let total = 0
                                            for(let k = table.rows.length-2;k>=0;k--){
                                                let oldval_i= old_val_val_i[k]
                                                let val_i = new_val_val_i[k]
                                                let sonum = val_i[0]
                                                sonum1 = sonum
                                                let itemno = val_i[1]
//                                                console.log(oldval_i[3])
//                                                console.log(sonum,itemno)
                                                 new_qty = val_i[2]
                                                 new_price = val_i[3]
                                                 newprod = val_i[5]
                                                 newwh = val_i[6]
                                                 let ayo = parseInt(new_qty)*parseInt(new_price)
                                                 total=total+ayo
//                                                console.log(new_qty,new_price,newprod,newwh)
                                                fetch('http://127.0.0.1:8000/SALESREP/DOUBLETROUBLE/' + new_qty + '/' + new_price + '/' + newprod + '/' + newwh + '/' + sonum + '/' + itemno, {
                                                method: 'PUT',
                                                headers: {
                                                    'Accept': 'application/json',
                                                },
                                                body: JSON.stringify({})
                                               });
                                            }
                                                fetch('http://127.0.0.1:8000/SALESREP/BEATSLAPPING/' + total + '/' + sonum1 , {
                                                method: 'PUT',
                                                headers: {
                                                    'Accept': 'application/json',
                                                },
                                                body: JSON.stringify({})
                                               });
                                            console.log(total
                                            )
                                            let agg = {"Qty": 0, "Price":0}
                                            for (let i=1;i<table.rows.length;i++)
                                            {
                                                let row = table.rows[i]
                                                let qty = parseInt(row.cells[2].querySelector("input").value)
                                                agg['Qty'] = agg['Qty'] + qty
                                                let price = parseInt(row.cells[2].querySelector("input").value)
                                                agg['Price'] = agg['Price'] + price
                                            }
                                            console.log(agg)


//                                            let prodqty = {}
//                                            for (let i = 1; i < table.rows.length; i++) {
//                                            var key = newprod
//                                            var val = parseInt(new_qty)
//
////                                         console.log(key)
//
//                                            if(key in prodqty)
//                                            {
//                                                prodqty[key] = prodqty[key] + (val)
//                                            }
//                                            else
//                                            {
//                                                prodqty[key] = val
//                                            }
//
//                                            }
//                                            let prodprice = {}
//                                            for(let i =1;i<table.rows.length;i++){
//                                                var key = newprod
//                                                var val = parseInt(new_price)
//                                                if(key in prodprice)
//                                                {
//                                                    prodprice[key] = prodprice[key]+val
//                                                }
//                                                else
//                                                {
//                                                    prodprice[key] = val
//                                                }
//                                                console.log(val)
//                                            }
//                                            console.log(prodqty,prodprice)
                                        })
                    })
                })
            }









window.onload = function(){

      fetch('http://localhost:8000/SALESSHOW/SALESBABY' ,
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
				var table = document.querySelector('tbody')
				for(const [idx, payment] of data.entries())
				{
				    let row = table.insertRow(idx)

				    let counter = 0

				    for(let attr in payment)
				    {
				        let cell = row.insertCell(counter)

				        cell.innerHTML = data[idx][attr]

				        counter++
				    }
                    row.setAttribute("onclick", "myFunction(this)")
            }

        })
    }