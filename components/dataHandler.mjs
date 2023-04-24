// Exporting a class named DataHandler as the default export
export default class DataHandler {

    // Declaring a static method named fetchData() which returns a promise that resolves to JSON data
    static async fetchData() {
      try {

        // Sending a GET request to fetch the data.json file using fetch() method and storing the response in res variable
        const res = await fetch('data.json');
        // Extracting JSON data from the response using json() method and storing it in data variable
        const data = await res.json();
  
        // Returning the data
        return data;

        // Logging any errors that occurred while fetching or parsing the data
      } catch(err) {
        console.log("Error", err)
      }
    }
  }