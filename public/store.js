function handleFormSubmit(event) {
    event.preventDefault()
    const obj = {
        itemName: event.target.itemName.value,
        description: event.target.description.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value
    }

    axios.post('http://localhost:3000/add-item', obj)
        .then(result => {

            event.target.itemName.value = ""
            event.target.description.value = ""
            event.target.price.value = ""
            event.target.quantity.value = ""

            console.log(result.data.storeData)
            displayItemOnScreen(result.data.storeData)
        })
        .catch(err => {
            console.log("Somethinf")
            console.log(err)
        })
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/store/get-items')
        .then(response => {

            console.log(response.data.allItems)
            for (let i = 0; i < response.data.allItems.length; i++) {
                displayItemOnScreen(response.data.allItems[i])
            }
        })
        .catch(err => {
            console.log(err)
        })

})

function displayItemOnScreen(Item) {
    const list = document.querySelector('ul')

    const itemList = document.createElement('li')
    itemList.appendChild(document.createTextNode(`${Item.itemName}  ${Item.description}  ${Item.price}   ${Item.quantity}`))
    list.appendChild(itemList)

    const b1 = document.createElement('button')
    b1.appendChild(document.createTextNode('Buy 1'))
    itemList.appendChild(b1)

    const b2 = document.createElement('button')
    b2.appendChild(document.createTextNode('Buy 2'))
    itemList.appendChild(b2)

    const b3 = document.createElement('button')
    b3.appendChild(document.createTextNode('Buy 3'))
    itemList.appendChild(b3)

    const delBtn = document.createElement('button')
    delBtn.appendChild(document.createTextNode("Delete"))
    itemList.appendChild(delBtn)

    delBtn.addEventListener('click', () => {

        
        axios.delete(`http://localhost:3000/store/delete-item/${Item.id}`)
            .then(result => {
                console.log("item deleted")
                list.removeChild(itemList)
            })
            .catch(err => {
                console.log("not deleted", err)
            })
    })




    b1.addEventListener("click", () => {
        axios.put(`http://localhost:3000/store/edit-item/${Item.id}/1`)
            .then(response => {
                console.log('ItemUpdated Successfully', response.data)
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    })

    b2.addEventListener("click", () => {
        axios.put(`http://localhost:3000/store/edit-item/${Item.id}/2`)
            .then(response => {
                console.log('ItemUpdated Successfully', response.data)
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    })

    b3.addEventListener("click", () => {
        axios.put(`http://localhost:3000/store/edit-item/${Item.id}/3`)
            .then(response => {
                console.log('ItemUpdated Successfully', response.data)
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    })


}