var weatherAPI = {
  address: $('#search'),
  init: function (){
          $('form').submit( function (e){
            e.preventDefault();
           var url ="http://api.openweathermap.org/data/2.5/weather?";
     
        console.log(url);

        var requestParameters = {
          q : weatherAPI.address.val()
         }

        var response = function (user) {
          var displayResult ='<div class="error resultPane"> <table>';
              displayResult += '<tr><td> City: </td><td>' +user.name+'</td></tr>';
              // displayResult += '<p>'+user.clouds.all+'</p>';
              // $.each (user.weather, function( i, list) {
              displayResult += '<tr><td> Country: </td><td>' + user.sys.country +'</td></tr>';
              displayResult += '<tr><td> Latitude: </td><td>' + user.coord.lon +'</td></tr>';
              displayResult += '<tr><td> longitude: </td><td>' + user.coord.lat +'</td></tr>';
              $.each (user.weather, function(i, list){
                displayResult += '<tr><td> Weather: </td><td>' + list.main+'</td></tr>';

              });
              var longitude =user.coord.lon;
              var latitude = user.coord.lat;
              var temp = parseInt(user.main.temp, 10);
              var temp = Math.floor(temp-273.15);
              console.log(temp);
              displayResult += '<tr><td> Current Temperature: </td><td>' + temp +'&#x2103; </td></tr>';
              displayResult += '</table></div>';
              // });
           weatherAPI.mapAPI(latitude, longitude); 
          $('#resultDiv2').html(displayResult);
        }; 
        var errorfile = function(){
             var displayResult ='<div class="error resultPane"> CANNOT PROCESS YOUR PAGE NOW </div>';
             $('#resultDiv2').html(displayResult); 
           weatherAPI.errorTest();                      
        }
          
          $.ajax(url, {
              success: response,
              type: "get",
              data: requestParameters,
              error: errorfile 
            });

        // $.getJSON(url, data, callback);
         
        }); //end of the click function
  }, // end of the init method 
  errorTest: function (){
        console.log("nonsense");
  },

  mapAPI : function (latitude, longitude) {
        console.log("MAking Sense");
  }

}; // end of the object 
 
 weatherAPI.init();