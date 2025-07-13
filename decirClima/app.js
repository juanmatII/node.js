import chalk from "chalk";
import axios from "axios";

const KEY_API = "05a64a000b4cad1cc75b683dc157ee53";

function displayWaether(city, weatherData) {
   console.log(chalk.yellow(`\nInformación del clima: ${city}:`));
   console.log(
      chalk.yellow(
         "☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️"
      )
   );
   console.log(chalk.cyan("Descripción:"), weatherData.weather[0].description);
   console.log(chalk.cyan("Temperatura:"), `${weatherData.main.temp} °C`);
   console.log(chalk.cyan("Humedad:"), `${weatherData.main.humidity}%`);
   console.log(
      chalk.cyan("Velocidad del Viento:"),
      `${weatherData.wind.speed} m/s`
   );
   console.log(
      chalk.yellow("☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️\n")
   );
}
function handleError(err) {
   console.log(chalk.red("Error: "), err.message);
   process.exit(1);
}
async function getWeather(city) {
   try {
      let enpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY_API}`;
      const response = await axios.get(enpoint, {
         params: {
            q: city,
            appid: KEY_API,
            units: "metric",
         },
      });
      //console.log(response);
      return response.data;
   } catch (err) {
      console.log(err);
      throw new Error(`El valor de la ciudad ${city} no es correcta`);
   }
}
function initApp() {
   let city = process.argv[2];

   if (!city) {
      console.log(chalk.red("no introdusiste una ciudad"));
      console.log(
         chalk.red(
            "Porfavor introduce el valo de la siguiente manera: node app.js [nombre de ciudad]"
         )
      );
   }
   getWeather(city)
      .then((weatherData) => displayWaether(city, weatherData))
      .catch(handleError);
}

initApp();
