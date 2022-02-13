window.onload = function(){
fetch('http://localhost:8000/htm/ht',
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

				for(const [idx, prod] of data.entries())
				{
				    let row = table.insertRow(idx)

				    let counter = 0

				    for(let attr in prod)
				    {
				        let cell = row.insertCell(counter)

				        cell.innerHTML = data[idx][attr]

				        counter++
				    }
                }
            }
        )
    }