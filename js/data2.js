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
var d = new Date();
document.getElementsByClassName('time')[0].innerHTML = d.toLocaleTimeString();
document.getElementsByClassName('date')[0].innerHTML = d.toDateString();
document.getElementsByClassName('timezone')[0].innerHTML = 'Timezone: '+d.toTimeString().slice(8);


for(i=0; i<acc.length; i++){
    var arr = acc[i].innerHTML.split(", ");
    //console.log(weather[i].innerHTML);

    update(i,arr[arr.length-1]);
   
   



}


    
   function update(k,city_name){
        
    $.ajax({ url: 'http://api.openweathermap.org/data/2.5/weather?q='+city_name+'&appid=570c29ea95140683c90252f40309c2f9',
            contentType: "application/json",
            dataType: 'jsonp',
            async:false,
            success: function(json) {
                    
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
                    getTimeZone(results[0].geometry.location.lat(),results[0].geometry.location.lng(),k);
                } else {
                    alert("Google Maps: Request failed.")
                }
            });

}
    
    function getTimeZone(lat,long,k){
        
        
 $.ajax({ url: 'https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+long+'&timestamp='+d.getTime()/1000+'&key=AIzaSyBqxcHcebxTZmuYfNeuGA4GQd5w_LQtkK4',
            success: function(json) {
                    var result = d.getTimezoneOffset()+(json.rawOffset+json.dstOffset)/60;
                    var e = new Date();
                    e.setHours(0);
                    e.setSeconds(0)
                    e.setMinutes(Math.abs(result));
                   document.getElementsByClassName('tz')[k].innerHTML = json.timeZoneName+'<br> Time Difference: '+e.toTimeString().slice(0,5);
                    if(result<0){
                        document.getElementsByClassName('tz')[k].innerHTML+=' behind';
                    }
                else{
                    document.getElementsByClassName('tz')[k].innerHTML+=' ahead';
                }
            },
            error: function(e) {
               console.log(e.message);
            }
           });
        
    }

function getNews(el){
    var sp = document.createElement('span');
    sp.setAttribute('class','glyphicon glyphicon-refresh glyphicon-spin');
    el.parentElement.parentElement.appendChild(sp);
    var q = el.parentElement.parentElement.parentElement.getElementsByTagName('p')[0].innerHTML.split(", ")[0];
    $.ajax({ url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q='+q+'&count=5&offset=0&safeSearch=Moderate',
        headers: { 'Ocp-Apim-Subscription-Key':'35dd9dbb6af84ebe9bb0390a0993a336' },
            success: function(json) {
                 console.log(json.value[0].name);
                console.log(json.value[0]);
                el.parentElement.parentElement.removeChild(sp);
                for(x = 0;x< json.value.length;x++){
                var h2 = document.createElement('h2');
                var p = document.createElement('p');
                var a = document.createElement('a');
                h2.innerHTML = json.value[x].name;
                p.innerHTML = json.value[x].description;
                a.setAttribute('href',json.value[x].url);
                a.appendChild(h2);
                a.appendChild(p);
                el.parentElement.parentElement.appendChild(a);
                }
                el.setAttribute('onClick','hideNews(this)');
            },
            error: function(e) {
               console.log(e.message);
            }
           });

}

function getStock(k){
    if(k>=acc.length)
        return;
    $.ajax({ url: 'http://www.google.com/finance/info?q='+stockid[k].innerHTML+'&callback=?',
            jsonpCallback: 'myCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            async:false,
            success: function(json) {
               stock[k].innerHTML = '<strong>'+json[0].l_cur+'</strong>'+'<br>'+json[0].c+'<br>'+json[0].cp+' %';
                getStock(k+1);
            },
            error: function(e) {
               console.log(e);
            }
           });
    }
    


getStock(0);

function hideNews(el){
    var q = el.parentElement.parentElement.getElementsByTagName('a');
    for(x=0;x<q.length;x++){
        q[x].style.display = 'none';
    
    }
    el.setAttribute('onClick','showNews(this)');
}

function showNews(el){
 var q = el.parentElement.parentElement.getElementsByTagName('a');
    for(x=0;x<q.length;x++){
        q[x].style.display = 'block';
    
    }
    el.setAttribute('onClick','hideNews(this)');
    
}