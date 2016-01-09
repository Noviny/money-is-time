var hourlyRateGlobal = 0;
var timeSpent = 0


var getWorth = function (worth) {
  if ( worth < 1 ) {
      var minutes = Math.round( worth*60 );
      return (minutes + " minutes")
    } else if ( 24 >= worth >= 1 ) {
      var hours = Math.floor(worth);
      var minutes = Math.round( ( worth%1 )*60 );
      return (hours + " hours, and " + minutes + " minutes")
    } else if ( worth >= 24 ) {
      var days = Math.floor( worth/24 )
      var hours = Math.floor( worth%24 );
      var minutes = Math.round( ( worth%1 )*60 );
      return (days + " days," + hours + " hours, and " + minutes + " minutes" )
    }
}

$( document ).ready ( function () {

  $('button.hourly-rate').click( function () {
    event.preventDefault();
    var results = $('form.hourly-rate').serializeArray()
    var hourlyRate = 0;
    var hours = results[0].value
    var salary = results[1].value
    var salaryType = results[2].value
    if ( salaryType === "hourly" ) {
      hourlyRate = salary;
    } else if  ( salaryType === "weekly" ) {
      hourlyRate = (salary/hours).toFixed(2);
    } else if (salaryType === "fortnightly") {
      hourlyRate = ((salary/2)/hours).toFixed(2);
    }else if  ( salaryType === "yearly" ) {
      hourlyRate = ((salary/52)/hours).toFixed(2);
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
    timeSpent += worth
    overallWorth = getWorth(timeSpent)
    localWorth = getWorth(worth)
    $('#items').append( "<li>" + results[0].value + " is worth " + localWorth + "</li>" )
    $('#totals').html(overallWorth)
  })

  $( 'button.reset' ).click( function () {
    timeSpent = 0
    $('#items').html( "" )
    $('#totals').html( "" )
  } )
});


