
const button = document.querySelector('button')
button.addEventListener('click', () => {
    fetch('/api/quotes/random')
        .then(data => data.json())
        .then(data => {
            document.querySelector('.quote').innerText = data.quote
            document.querySelector('.name').innerText = '-' + data.character
        })
        .catch(err => alert(err))

})
