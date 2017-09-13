var API_BASE_URL ="https://api.fixer.io/latest";

var CUR_ONE= "USD"
var CUR_TWO= "EUR"

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

//currencyBar
  searchAPI("USD", "CAD")
  .then(function(data) {
    $('#CAD').html(data.rates["CAD"].toFixed(2))
  console.log(data.rates["CAD"].toFixed(2))
  })
  searchAPI("USD", "EUR")
  .then(function(data) {
    $('#EUR').html(data.rates["EUR"].toFixed(2))
  })
  searchAPI("USD", "BRL")
  .then(function(data) {
    $('#BRL').html(data.rates["BRL"].toFixed(2))
  })
  searchAPI("USD", "GBP")
  .then(function(data) {
    $('#GBP').html(data.rates["GBP"].toFixed(2))
  })
  searchAPI("USD", "JPY")
  .then(function(data) {
    $('#JPY').html(data.rates["JPY"].toFixed(2))
  })
  searchAPI("USD", "MXN")
  .then(function(data) {
    $('#MXN').html(data.rates["MXN"].toFixed(2))
  })
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
  var roundedRate =(rate*100)/100;
  console.log(roundedRate)
  $('.rate').html('rate: ' + roundedRate +'%');
  var amt= $(`#amountOne`).val()
  var finalAmount = Math.round(amt * roundedRate);
  $('.calcAmount').html(`You will need ${finalAmount} ${CUR_TWO} to equal ${amt} ${CUR_ONE}`)
}
