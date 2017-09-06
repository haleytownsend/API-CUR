var API_BASE_URL ="https://api.fixer.io/latest";

var CUR_ONE= "USD"
var CUR_TWO= "EUR"

$(document).ready(function() {
  console.log("ready");
  //event.preventDefault();

  $(`#currencyOne`).change(function() {
    var el = document.getElementById("currencyOne");
    CUR_ONE = el.options[el.selectedIndex].value;
    console.log(CUR_ONE);
  });
  $(`#currencyTwo`).change(function() {
    var el = document.getElementById("currencyTwo");
    CUR_TWO = el.options[el.selectedIndex].value;
    console.log(CUR_TWO);
  });
  $(`#amountOne`).change(function() {
    var el = document.getElementById("amountOne");
    AMOUNT_ONE = el.value;
    console.log(AMOUNT_ONE);
  });
  $('.search').on("click", function(event) {
    event.preventDefault();
    searchAPI(CUR_ONE, CUR_TWO)
    .then(function(data) {
      displayResults(data.rates[CUR_TWO])
    })
  });
})

function searchAPI(base, symbols) {
  return $.ajax(API_BASE_URL, {
    data: {
      base: base,
      symbols: symbols
    }
  })
}

//replace results in .rate div on HTML
function displayResults(rate) {
  $('.rate').html('rate: ' + rate);
  var amt= $(`#amountOne`).val()
  console.log(amt)
  var roundedRate =Math.round(rate*100) / 100;
  var finalAmount = amt * roundedRate;
  console.log(roundedRate)
  // $('.calcAmount').html('You will need ' + rate*amt + " " + CUR_TWO + " to equal " + amt + " " + CUR_ONE)
  $('.calcAmount').html(`You will need ${finalAmount} ${CUR_TWO} to equal ${amt} ${CUR_ONE}`)
}

//replace all currencies in the left container
function allCurrencies() {
  $('.allCurrencies').html()
}
