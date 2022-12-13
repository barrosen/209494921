
// For From Year
let fromYear = document.getElementById('from');

let currentYear = new Date().getFullYear();
let earliestYear = 1970;
while (currentYear >= earliestYear) {
    let dateOption = document.createElement('option');
    dateOption.text = currentYear;
    dateOption.value = currentYear;
    fromYear.add(dateOption);
    currentYear -= 1;
}

document.getElementById('from').addEventListener("change",applyDropdown)
// // For Until Year

function applyDropdown() {
    let untilYear = document.getElementById('until');
    currentYear = new Date().getFullYear();
    let startYear = fromYear.value;
    while (currentYear >= startYear) {
        let yearOption = document.createElement('option');
        yearOption.text = currentYear;
        yearOption.value = currentYear;
        untilYear.add(yearOption);
        currentYear -= 1;
    }
}

const myForm = document.querySelector('#form3');
const Brand = document.querySelector('#brands');
const From = document.querySelector('#from');
const Until = document.querySelector('#until');
const Max = document.querySelector('#Max');
const TypeLow = document.querySelector('#typeLow');
const TypeHigh = document.querySelector('#typeHigh');

myForm.addEventListener('submit',onSubmit);

function onSubmit (e) {
    e.preventDefault();
    // var Type1 : TypeLow.value;
    // var Type2 : TypeHigh.value;
    // var Brand1 :Brand;
    //     From1 : From.value,
    //     Until1 : Until.value,
    //     Max1 : Max.value};
    window.location.href = '../views/Results.html';
}
    // console.log(Brand.value);
    // var validItems = [];
    // for (let i=0; i<Items.length; i++)
    // {
    //     if(Items[i].getBrand() === Brand.value)
    //     {
    //         console.log(Items[i].getBrand());
    //         validItems.push(Items[i]);
    //     }
    // }
    // console.log(validItems);


