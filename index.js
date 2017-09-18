var API_BASE_URL ="https://api.fixer.io/latest";

var CURRENCIES = [ 'CAD', 'EUR', 'BRL', 'GBP', 'JPY', 'MXN' ]
var CONVERSION_RATES

function convertAmount (amount, currency) {
  return (amount * CONVERSION_RATES[currency]).toFixed(2)
}

function updateConvertedAmounts (amountInUsd) {
  console.log('updateConvertedAmounts executing')
  // - convert USD amount to other 6 currencies (using CONVERSION_RATES)
  // - be able to update HTMLs contents of 6 elements

  for (var i = 0; i < CURRENCIES.length; i++) {
    var currency = CURRENCIES[i]
    var convertedAmount = convertAmount(amountInUsd, currency)
    console.log('Amount in', currency, convertedAmount)
    $('.amount-in-' + currency).html(convertedAmount)
  }
}

function loadConversionRates () {
  return $.ajax(API_BASE_URL, {
    data: {
      base: 'USD',
      symbols: CURRENCIES.join(),
    }
  })
    .then(function (data) {
      CONVERSION_RATES = data.rates
    })
}


$(document).ready(function() {
  loadConversionRates()
    .then(function () {
      var $amountEl = $('#amount')
      $amountEl.keyup(function () {
        var elValue = $amountEl.val()
        console.log(elValue)
        var amount = parseInt(elValue)
        console.log(amount)
        updateConvertedAmounts(amount)
      })
    })
  })
