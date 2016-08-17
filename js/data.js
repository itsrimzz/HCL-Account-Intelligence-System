var acc = document.getElementsByClassName('name');
var weather = document.getElementsByClassName('weather');
var latitude = document.getElementsByClassName('latitude');
var longitude = document.getElementsByClassName('longitude');
var stock = document.getElementsByClassName('stock');
var news = document.getElementsByClassName('news');
var stockid = document.getElementsByClassName('stockid');
var lat = [];
var long = [];
var currWeather=[];
var requests = [];
var i=0;
var k=0;
var l=0;

for(i=0; i<acc.length; i++){
    var arr = acc[i].innerHTML.split(", ");
    $('a').attr('href','https://www.google.co.in/search?q='+arr[0]+'&tbm=nws');
    //console.log(weather[i].innerHTML);

    
   
    var request = $.ajax({ url: 'http://api.openweathermap.org/data/2.5/weather?q='+arr[arr.length-1]+'&appid=570c29ea95140683c90252f40309c2f9',
            contentType: "application/json",
            dataType: 'jsonp',
            async:false,
            success: function(json) {
                    console.log(json.weather[0].description);
                 currWeather.push(json.weather[0].description);
            },
            error: function(e) {
               console.log(e.message);
            }
           });
    requests.push(request);

 var geocoder = new google.maps.Geocoder();
            var address = arr[arr.length-1];
        geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                     lat.push(results[0].geometry.location.lat());
                    long.push(results[0].geometry.location.lng());
                    console.log("Latitude: " + results[0].geometry + "\nLongitude: " + results[0].geometry.location.lng());
                    update();
                } else {
                    alert("Google Maps: Request failed.")
                }
            });

 
    $.ajax({ url: 'http://www.google.com/finance/info?q='+stockid[i].innerHTML+'&callback=?',
            jsonpCallback: 'myCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            timeout: 100000,
            async:false,
            success: function(json) {
               updateStock(json[0].l);
            },
            error: function(e) {
               console.log(e);
            }
           });



}

$.when.apply(null, requests).done(function(){
    for(j=0;j<weather.length;j++){
        
        weather[j].innerHTML = currWeather[j];
    }
  })


    
   function update(){
        
        latitude[k].innerHTML = 'Latitude: '+lat[k];
        longitude[k].innerHTML = 'Longitude: '+long[k];
       k++;
       
    }

 function updateStock(value){
     stock[l].innerHTML = value;
     l++;
 }

function myCallback(data){
    updateStock(data[0].l);
    console.log('mycallback: '+data[0].l);
}