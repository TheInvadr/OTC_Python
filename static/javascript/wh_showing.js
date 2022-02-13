function delFunction()
{
        event.stopPropagation();
        var id_ = event.target.parentNode.parentNode.cells[0].innerHTML
        console.log(id_)
        if (confirm('Are you really sure you want to delete this ?')){
            fetch('http://localhost:8000/WHDEL/DEL',
        {
          headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
          method: "DELETE",
          body: JSON.stringify({id: id_,})

        })
        }
        else{
            void(0)
        }
}
function myFunction(x){
  var id = (x.cells[0].innerText)

  var modal = document.getElementById("myModal");

  modal.style.display = "block";

  fetch('http://localhost:8000/WHSHO/SHOW/' + id,
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
                var button = document.createElement("button")

                button.innerHTML = "Submit"

                button.setAttribute("id", "sub")

                disp_form.appendChild(button)

                document.getElementById("sub").addEventListener("click", function(event){
                    event.preventDefault()

                    let WHCODE1 = document.querySelector('#WHCODE').value
                    let WHNAME = document.querySelector('#WHNAME').value
                    let WHADD = document.querySelector('#WHADD').value
                    console.log(WHCODE1,WHNAME,WHADD)

                    fetch('http://127.0.0.1:8000/WHUPDATE/UPDATE/' + WHCODE1, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({WHCODE2: WHCODE1, WHNAME1: WHNAME, WHADD1: WHADD})
                   });
            })
        })
}

window.onload = function(){
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
                console.log(data)
				let table = document.querySelector('tbody')

				for(const [idx, whdata] of data.entries())
				{
				    let row = table.insertRow(idx)

				    let counter = 0

				    for(let attr in whdata)
				    {
				        let cell = row.insertCell(counter)

				        cell.innerHTML = data[idx][attr]

				        counter++
				    }
                    let cell = row.insertCell(counter)
				    let del_but = document.createElement("button")
				    del_but.setAttribute("onclick", "delFunction()")
				    del_but.innerHTML = "Delete"

				    cell.appendChild(del_but)

				    row.setAttribute("onclick", "rowClick(this)")
				    row.setAttribute("onclick", "myFunction(this)")
				}
            });

}