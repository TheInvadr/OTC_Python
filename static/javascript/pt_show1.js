var ptbasis_data = ""

fetch('http://localhost:8000/PTBASIS/PTSHOW',
	{
      headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
			.then(response => response.json())
            .then(function (data)
            {
                ptbasis_data = data
            });

function myFunction(x){
  var id = (x.cells[0].innerText)

  var modal = document.getElementById("myModal");

  modal.style.display = "block";

  fetch('http://localhost:8000/PTDIS/DIS/' + id,
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
                    if (attr === "PTBASISCODE_id")
                    {
                        continue
                    }
                    var label = document.createElement("label")
                    label.setAttribute("for", attr.replace(/ /g,''))

                    label.innerHTML = attr

                    disp_form.append(label)

                    var input = document.createElement('input')

                    if (attr === "WHCODE")
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

                ptbasis = data['PTBASISCODE_id']
//                dept = data['Department']

                var label = document.createElement("label")

                label.setAttribute("for", "PTBASISCODE_id")

                label.innerHTML = "PTBASISCODE"

                disp_form.append(label)

                var sel = document.createElement("select")

                sel.setAttribute("id", "PTBASISCODE_id")

                for (var i=0; i<ptbasis_data.length; i++)
                {
                    var option = document.createElement("option")

                    option.setAttribute("value", ptbasis_data[i]['BASISCODE'])

                    option.innerHTML = `${ptbasis_data[i]['BASISDESC']}`

                    if (ptbasis_data[i]['BASISCODE'] === ptbasis)
                    {
                        option.setAttribute("selected", option.innerHTML)
                    }

//                    console.log(desig_data[i])

                    sel.appendChild(option)

                }

                disp_form.appendChild(sel)

                disp_form.appendChild(document.createElement('br'))


                var button = document.createElement("button")

                button.innerHTML = "Submit"

                button.setAttribute("id", "sub")

                disp_form.appendChild(button)

                document.getElementById("sub").addEventListener("click", function(event){
                    event.preventDefault()

                    let PTCODE = document.querySelector('#PTERMCODE').value
                    let PTDESC = document.querySelector('#PTDESC').value
                    let PTDAYS = document.querySelector('#PTDAYS').value
                    let PTBASISCODE = document.querySelector('#PTBASISCODE_id').value
                    console.log(PTCODE,PTDESC,PTDAYS,PTBASISCODE)

                    fetch('http://127.0.0.1:8000/PTDIS/UPD/' + PTCODE, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({PTBASISCODE1: PTBASISCODE, PTDESC1: PTDESC, PTDAYS1: PTDAYS, PTERMCODE1: PTCODE})
                   });
            })
        })
}



window.onload = function(){
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
                console.log(data)
				let table = document.querySelector('tbody')

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

//                    let cell = row.insertCell(counter)
            }

        })
}