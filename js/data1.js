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


for(i=0; i<acc.length; i++){
    var arr = acc[i].innerHTML.split(", ");
    news[i].setAttribute('href','https://www.google.co.in/search?q='+arr[0]+'&tbm=nws');
    //console.log(weather[i].innerHTML);

    update(i,arr[arr.length-1]);
   
   



}

    
   function update(k,city_name){
        
    $.ajax({ url: 'http://api.openweathermap.org/data/2.5/weather?q='+city_name+'&appid=570c29ea95140683c90252f40309c2f9',
            contentType: "application/json",
            dataType: 'jsonp',
            async:false,
            success: function(json) {
                    console.log(json.weather[0].description);
                weather[k].innerHTML =json.weather[0].description;
            },
            error: function(e) {
               console.log(e.message);
            }
           });
    

 var geocoder = new google.maps.Geocoder();
            var address = city_name;
        geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                     latitude[k].innerHTML ='Latitude: '+results[0].geometry.location.lat();
                    longitude[k].innerHTML =results[0].geometry.location.lng();
                    console.log("Latitude: " + results[0].geometry.location.lat() + "\nLongitude: " + results[0].geometry.location.lng());
                } else {
                    alert("Google Maps: Request failed.")
                }
            });

 
    $.ajax({ url: 'http://www.google.com/finance/info?q='+stockid[k].innerHTML+'&callback=?',
            jsonpCallback: 'myCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            async:false,
            success: function(json) {
               stock[k].innerHTML = json[0].l;
            },
            error: function(e) {
               console.log(e);
            }
           });
    }
