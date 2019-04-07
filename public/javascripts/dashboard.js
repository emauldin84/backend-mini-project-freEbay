const sellButtons = document.querySelectorAll('[data-sell-btn]');
// const sellFormDiv = document.querySelector('[data-sell-form-div]');
const sellForm = document.querySelector('[data-sell-form]');

sellButtons.forEach(button => {
    button.addEventListener('click', function() {
        
        showSellForm(button.classList[2]);
    })
})



function showSellForm(item) {

    const h2 = document.createElement('h2');
    h2.textContent = item

    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    
    label.setAttribute('label', 'transferuser');
    input.setAttribute('name', 'transferuser');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'form-control');
    input.setAttribute('id', 'transferuser');

    sellForm.append(label);
    sellForm.append(input);


}