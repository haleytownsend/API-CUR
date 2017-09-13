var API_BASE_URL ="https://api.fixer.io/latest";

var CUR_ONE= "USD"
var CUR_TWO= "EUR"

var amt = "1"

var CUR_BAR_BASE= "USD"
var ALL_CURRENCIES = {
  currency: [
    "USD",
    "CAD",
    "EUR",
    "BRL",
    "GBP",
    "JPY",
    "MXN"
  ]}

$(document).ready(function() {
  console.log("ready");

  var a=([ALL_CURRENCIES.currency[1]])
  console.log(a)
  var b=(searchAPI("USD", a))

  $(`#currencyOne`).change(function() {
    var el = document.getElementById("currencyOne");
    CUR_ONE = el.options[el.selectedIndex].value;
  });

  $(`#currencyTwo`).change(function() {
    var el = document.getElementById("currencyTwo");
    CUR_TWO = el.options[el.selectedIndex].value;
  });

  $(`#amountOne`).change(function() {
    var el = document.getElementById("amountOne");
    AMOUNT_ONE = el.value;
  });

  $('.search').on("click", function(event) {
    event.preventDefault();
    searchAPI(CUR_ONE, CUR_TWO)
    .then(function(data) {
      displayResults(data.rates[CUR_TWO])
    })
  });
});

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
  var roundedRate =(rate*100)/100;
  console.log(roundedRate)
  $('.rate').html('rate: ' + roundedRate +'%');
  var amt= $(`#amountOne`).val()
  var finalAmount = Math.round(amt * roundedRate);
  $('.calcAmount').html(`You will need ${finalAmount} ${CUR_TWO} to equal ${amt} ${CUR_ONE}`)
}
