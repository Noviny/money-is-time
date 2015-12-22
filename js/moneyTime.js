var hourlyRateGlobal = 0;


$( document ).ready ( function () {
  $('button.hourly-rate').click( function () {
    event.preventDefault();
    var results = $('form.hourly-rate').serializeArray()
    var hourlyRate = 0;
    if ( results[2].value === "hourly" ) {
      hourlyRate = results[1].value;
    } else if  ( results[2].value === "weekly" ) {
      hourlyRate = results[1].value/results[0].value;
    } else if  ( results[2].value === "yearly" ) {
      hourlyRate = (results[1].value/52)/results[0].value;
    } else {
      window.alert("Please pick your pay type");
    }
    hourlyRateGlobal = hourlyRate;
    $('.hourly-rate-result').html('Effective Value of Hour: $' + hourlyRate);
  });

  $( 'button.item-worth' ).click( function () {
    event.preventDefault();
    var results = $('form.item-worth-form').serializeArray();
    var worth = results[1].value / hourlyRateGlobal;
    if ( worth < 1 ) {
      var minutes = Math.round(worth*60);
      $( 'div.worth' ).append('<p>' + results[0].value + ' costs: ' + minutes + ' minutes.</p>');
    } else if ( worth >= 1 ) {
      var hours = Math.floor(worth);
      var minutes = Math.round( ( worth%1 )*60);
      $( 'div.worth' ).append('<p>' + results[0].value + ' costs: ' + hours + ' hours and ' + minutes + ' minutes.</p>');
    }
  })
});