console.log('Client side Js is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) =>{
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})