$(document).ready(function () {
        var city = "Seongnam";
		var appid = "50b11679e7dde231853fd9f2e1042eee";
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + 
                         city + "&mode=json&units=metric&appid=" + appid;
    	$.ajax({
    		url : url,
    		dataType : "JSON",
			type : "GET",
    		success : function(data) {
			    		console.log(data);
			            var icon;
			            switch (data.weather.description) {
			            case "clear sky":
			                icon = "01d.png";
			                break;
			            case "few clouds":
			            	icon = "02d.png";
			                break;
			            case "scattered clouds":
			            	icon = "03d.png";
			                break;
			            case "broken clouds":
						case "overcast clouds":
			                icon = "04d.png";
			                break;
			            case "shower rain":
						case "drizzle":
						case "drizzle rain":
						case "shower drizzle":
							icon = "09d.png";
			                break;
			            case "light rain":
			            case "moderate rain":
						case "extreme rain":
			                icon = "10d.png";
			                break;
			            case "thunderstorm":
			                icon = "11d.png";
			                break;
			            case "snow":
						case "freezing rain":
						case "heavy snow":
						case "shower snow":
			                icon = "13d.png";
			                break;
			            case "mist":
						case "smoke":
						case "haze":
						case "fog":
			                icon = "50d.png";
			                break;
			            default:
			                icon = "01d.png";
			                break;
			            }
			            
			            $("#result-image").attr("src", "http://openweathermap.org/img/w/" + icon);
			            
			            var w_info = '<b>Country: </b>' + data.sys.contry + '<br/>';
			                w_info += '<b>City: </b>' + data.name + '<br/>';
			            	w_info += '<b>Current Temperature: </b>' +  data.main.temp + ' C<br/>';
			                w_info += '<b>Current Humidity: </b>' + data.main.humidity + ' %<br/>';
			                w_info += '<b>Current Wind Speed: </b>' + data.wind.speed + ' m/s<br/>';
							w_info += '<b>Weather Conditions: </b>' + data.weather.description + '<br/>';			                
			             $("#weather-info").html(w_info);
    		},
    		error : function(error) {
    		},
    		complete : function() {
    		}
    	});
});