const sellButtons = document.querySelectorAll('[data-sell-btn]');
// const sellFormDiv = document.querySelector('[data-sell-form-div]');
const sellForm = document.querySelector('[data-sell-form]');

sellButtons.forEach(button => {
    button.addEventListener('click', function() {
        
        showSellForm(button.classList[2]);
    })
})



function showSellForm(item) {

    const itemNoDashes = item.replace('-', ' ');

    const sellFormDiv = document.querySelector('[data-sell-form-div]');

    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    h2.textContent = `Do you wish to sell ${itemNoDashes} back to the marketplace?`;
    const label = document.createElement('label');
    const input = document.createElement('input');
    
    label.setAttribute('label', 'transferuser');
    input.setAttribute('name', 'resellitem');
    input.setAttribute('type', 'hidden');
    input.setAttribute('class', 'form-control');
    input.setAttribute('value', item);
    input.setAttribute('id', 'transferuser');

    button.setAttribute('type', 'submit');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.textContent = 'Marketplace';

    // <button type="submit" class="btn btn-primary">Claim Item</button>

    const tradeToUserForm = document.createElement('form');

    tradeToUserForm.setAttribute('action', "/dashboard/trade");
    tradeToUserForm.setAttribute('method', "POST");

    tradeToUserForm.innerHTML = `
    <h2> Or, enter username you would like to send this item to </h2>

        <div class="form-group">
            <label for="usertotrade" class="sr-only">Trade Item</label>
            <input name="usertotrade" type="text" class="form-control" id="additem" placeholder="Enter username to trade to">

            <input name="itemtotrade" type="hidden" value=${item}>

            <button type="submit" class="btn btn-primary">Trade Item</button>


        </div>
    
    
    `
    sellFormDiv.append(tradeToUserForm);





    sellForm.append(h2);
    sellForm.append(label);
    sellForm.append(input);
    sellForm.append(button);


}