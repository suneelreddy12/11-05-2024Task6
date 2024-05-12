// URL of the JSON data
var url = "https://restcountries.com/v3.1/all";

/* This line adds an event listener (which in case ## DOMContentLoaded ##. It fires when the initial HTML document has been completely
loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading) that waits for the HTML document
to be fully loaded before executing the provided function. */

document.addEventListener("DOMContentLoaded", function () {
  // Function to make AJAX call
  function fetchData(url, callback) {
    // This line creates a new instance of the XMLHttpRequest object, which is used to interact with servers.
    var xhr = new XMLHttpRequest();
    /* Assigning an anonymous function to the onreadystatechange event handler of the XMLHttpRequest object (xhr). This function will be
called whenever the readyState property of the XMLHttpRequest object changes. This means it will be executed multiple times throughout
the lifecycle of the AJAX request, not just once after xhr.open("GET", url, true). */

    // 0: UNSENT - The request has not been initialized.
    // 1: OPENED - The request has been set up.
    // 2: HEADERS_RECEIVED - The request has been sent and headers and status are available.
    // 3: LOADING - The request is in progress; xhr.responseText holds partial data.
    // 4: DONE - The request is complete.

    /* So, the assigned function will be executed multiple times, but we're particularly interested in the case when readyState is 4,
indicating that the request is complete. In this state, we can check the status property to see if the request was successful
(status === 200). If both conditions are met, it means that the response is ready to be processed, and we can parse the
JSON response and call the callback function (callback(data)). */

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      }
    };
    xhr.open("GET", url, true); //asynchronous call
    xhr.send();
  }

  // Callback function to handle the fetched data
  function handleData(data) {
    // Iterating JSON contains an array of country objects

    // Filtering countries from Asia continent/region
    var asiaCountries = data.filter((country) => country.region === "Asia");
    // Printing the filtered countries in the console
    console.log("Countries from Asia continent/region ");
    asiaCountries.forEach((country) => console.log(country.name.common));

    // Filtering countries with a population of less than 2 lakhs
    var countriesWithTwoLakhPopulation = data.filter((country) => country.population < 200000);
    // Printing the filtered countries in the console
    console.log("countries with a population of less than 2 lakhs");
    countriesWithTwoLakhPopulation.forEach((country) =>
      console.log(country.name.common)
    );

    // Printing name, capital, flag using forEach
    data.forEach((country) => {
      const capital = country.capital ? country.capital.join(",") : "N/A";
      console.log(`name-${country.name.common} capital-${capital} flag-${country.flag}`
      );
    });
    
    // Printing total population of countries using reduce
    const totalPopulation = data.reduce((accumulator, country) => (accumulator += country.population ? country.population : 0), 0);
    console.log("Total Population ", totalPopulation);

    // Filtering countries with a currency as US dollars 
    var countriesWithUSDollar = data.filter((country) => country.currencies  && country.currencies.USD );
      // Printing the filtered countries in the console
      console.log("countries with a currency as US dollars");
      countriesWithUSDollar.forEach((country) =>
        console.log(country.name.common)
      );
  }

  // Fetch data from the URL
  fetchData(url, handleData);
});
