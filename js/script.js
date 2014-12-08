var weatherAPI = {
  address: $('#search'),

  init: function (){
          $('form').submit(function (e) {
            e.preventDefault();
            if(weatherAPI.address.val() === ""){
               weatherAPI.errorMsg();
              // return;
            }
            else{ 
            $('#submit').prop('disabled', true);
            $('#submit').val(" ").css('background', 'url("./images/loading2.gif") no-repeat white center'); 
             var url ="http://api.openweathermap.org/data/2.5/weather?";
             var requestParameters = {
               q : weatherAPI.address.val()
             };
                $.ajax(url, {
                    success: weatherAPI.response,
                    type: "get",
                    data: requestParameters,
                    error: weatherAPI.errorfile 
                   });  
          } //end of else statement      
        }); //end of the click function
  }, // end of the init method 

 response : function (user) {
            // var list.main= ;
            var displayResult ='<table class="resultPane">';
            var temp = parseInt(user.main.temp, 10);
            temp = Math.round(temp-273.15);
              if( temp <= 6) {
                 displayResult += '<tr class="hot cloudy"><td colspan=2>' + user.name +'</td></tr>';
              }
              else if (temp >= 7 && temp <= 19){ 
                  displayResult += '<tr class="hot sunny"><td colspan=2>' + user.name +'</td></tr>';
              }
              else if(temp >= 20) {
                 displayResult += '<tr class="hot sun"><td colspan=2>' + user.name +'</td></tr>';
              }  
                displayResult += '<tr><td> Country: </td><td>' + user.sys.country +'</td></tr>';
                displayResult += '<tr><td> Latitude: </td><td>' + user.coord.lon +'</td></tr>';
                displayResult += '<tr><td> longitude: </td><td>' + user.coord.lat +'</td></tr>';
                $.each (user.weather, function(i, list){
                  displayResult += '<tr><td> Weather: </td><td>' + list.main+'</td></tr>';
                    // return list.main;
                });
              
                var lngCoord = +user.coord.lon.toFixed(3);  
                var latCoord = +user.coord.lat.toFixed(8);
                // var temp = parseInt(user.main.temp, 10);
                // temp = Math.round(temp-273.15);
                console.log(temp);
                if(temp <=15){  
                   displayResult += '<tr class="cold"><td> Current Temp: </td><td>' + temp +'&#x2103; </td></tr>';
                }else if(temp){
                   displayResult += '<tr class="hot"><td> Current Temp: </td><td>' + temp +'&#x2103; </td></tr>';
                }
                // console.log(lngCoord +"  "+latCoord);
           // This is going to be an if statement
                // displayResult += '<tr><td> Current Temp: </td><td>' + temp +'&#x2103; </td></tr>';
                displayResult += '</table>';
                weatherAPI.mapDisplay(latCoord, lngCoord);
                $('#resultDiv2').html(displayResult);
                weatherAPI.btnEffect();
  }, // end of the response method

  errorfile : function(){
              var displayResult ='<div class="error"> Your Request Cannot Be Processed at The Moment </div>';
                $('#resultDiv2').html(displayResult); 
                weatherAPI.btnEffect();                   
  },

  errorMsg: function (){
                var displayResult ='<div class="error"> Please Enter A City, State or Country </div>';
                  $('#resultDiv2').html(displayResult);
                  weatherAPI.btnEffect();
  },

  mapDisplay: function(latitude, longitude) {
                // console.log(longitude +" and "+ latitude);
                var mapOptions = {    
                      center: {
                        lat: latitude, 
                        lng: longitude
                        },
                        zoom: 7
                      };
      var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

  }, 
  btnEffect : function() {
                $('#submit').prop('disabled', false);
                $('#submit').val("Forecast").css('background-image', 'none');
  }    
}; // end of the  weatherAPI object 

 weatherAPI.init();