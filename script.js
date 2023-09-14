const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");
const alertMessage = document.querySelector('.alert')

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    let tipvalue = event.target.innerText;
    tipvalue = tipvalue.slice(0, -1)

    if (isNaN(billAmount.value) || isNaN(numberOfPeople.value)) {
      clearValues();
      alertMessage.innerText = 'Invalid billAmount or numberOfPeople';
      alertMessage.style.display = 'block';
    
      setTimeout(function () {
        alertMessage.style.display = 'none';
      }, 5000);
      throw new Error('Invalid billAmount or numberOfPeople');
    }

    if (billAmount.value === '') {
      clearValues();
      return;
    }

    if (numberOfPeople.value === '') numberOfPeople.value = 1;

    const billAmountValue = parseFloat(billAmount.value)
    const tipPercentage = parseInt(tipvalue)
    const numberOfPeopleValue = parseInt(numberOfPeople.value)

    let tipAmount = (billAmountValue * (tipPercentage / 100)) / numberOfPeopleValue;
    let tip = Math.floor(tipAmount * 100) / 100;
    tip = tip.toFixed(2);

    let totalAmount = (tipAmount * numberOfPeopleValue + billAmountValue) / numberOfPeopleValue;
    totalAmount = totalAmount.toFixed(2);

    billTipAmount.innerHTML = `$${tip}`;
    billTotalPerPerson.innerHTML = `$${totalAmount}`;
    console.log('button');
  })
})


customTipPercentage.addEventListener('blur', (event) => {
  if (billAmount.value === '') {
    clearValues();
    return;
  }

  if (numberOfPeople.value === '') numberOfPeople.value = 1;

  const billAmountValue = parseFloat(billAmount.value);
  const tipPercentage = parseFloat(event.target.value);

  if (isNaN(billAmountValue) || isNaN(tipPercentage)) {
    clearValues();
    alertMessage.innerText = 'Invalid billAmount or tipPercentage';
    alertMessage.style.display = 'block';

    setTimeout(function () {
      alertMessage.style.display = 'none';
    }, 5000);
    throw new Error('Invalid billAmount or tipPercentage');
  }

  const numberOfPeopleValue = parseInt(numberOfPeople.value);

  let tipAmount = (billAmountValue * (tipPercentage / 100)) / numberOfPeopleValue;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeopleValue + billAmountValue) / numberOfPeopleValue;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;
  console.log('custom');
})

resetButton.addEventListener('click', () => {
  clearValues()
});

function clearValues() {
  billTipAmount.innerHTML = "$0.00";
  billTotalPerPerson.innerHTML = "$0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercentage.value = "";
}