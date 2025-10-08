import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const Card = ({ text, value }) => {

    return (
      <div className='weather-card'>
        <h4>{text}</h4>
        <p>{value}</p>
      </div>
    )
  }


  const [city, setCity] = useState("")
  const [isSearchPerformed, setIsSearchPerformed] = useState(false)

  const WeatherDisplay = ({ city }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

      async function getData() {
        setIsLoading(true)
        try {
          const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
            params: {
              key: '8710af06c3a644b7bd972141250810',
              q: city,
            }
          })

          const data = await response.data;
          console.log(data);
          setData(data)
          setIsLoading(false)
        } catch (err) {
          console.log('fetch err', (err));
          alert('Failed to fetch weather data')
          setIsLoading(false)
        }
      }

      getData();

    }, [city])



    return (
      <div className='weather-cards'>
        {isLoading ? <p>Loading data...</p> : <>
          <Card text={'Temperature'} value={data ? data.current['temp_c'] + '°C' : ""} />
          <Card text={'Humidity'} value={data ? data.current.humidity + '%' : ""} />
          <Card text={'Condition'} value={data ? data.current.condition.text : ""} />
          <Card text={'Wind Speed'} value={data ? data.current['wind_kph'] + 'kph' : ""} />
        </>}
      </div>
    )
  }



  const handleSearch = (e) => {
    e.preventDefault();
    let val = e.target.elements["city"].value;
    setCity(val);
    setIsSearchPerformed(true);
  }

  return (
    <div className="App">

      <form onSubmit={(e) => handleSearch(e)} style={{ height: "30px", width: '400px', display: "flex", justifyContent: 'space-evenly', alignItems: 'center' }}>
        <input name='city' style={{ height: "100%", width: '70%' }} type='text' />
        <button style={{ textAlign: 'center', borderRadius: "4px", backgroundColor: 'lightgreen', border: 'none', height: "100%", padding: '0.5rem', color: 'white', fontWeight: 'bold' }} type='submit'>Search</button>
      </form>


      {isSearchPerformed && <WeatherDisplay city={city} />}

    </div>
  );
}

export default App;
