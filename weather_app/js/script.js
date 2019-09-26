window.addEventListener("load", ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let tempSection = document.querySelector(".temperature");
	let tempSpan = document.querySelector(".temperature span");

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/367ff7e736bea8ba82c78b5bb00c1380/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const {temperature, summary, icon} = data.currently;
					// set DOM elements from api
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					// formula for celcius
					let celsius = (temperature - 32) * (5 / 9);
					// Set Icon
					setIcons(icon, document.querySelector(".icon"));

					//change temp to celcius/farenheit
					tempSection.addEventListener("click", () => {
						if (tempSpan.textContent === "F") {
							tempSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							tempSpan.textContent = "F";
							temperatureDegree.textContent = temperature;
						}
					})

				})
		});
	} else {
		alert("Please enable your browser location");
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});