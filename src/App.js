import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import getFormattedWeatherData from './services/weatherService';
import {useEffect, useState} from "react";

function App() {
  const [query, setQuery] = useState({q: 'qatar'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


 useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then(
        (data) => {
          setWeather(data);
        });
    };
  
    fetchWeather();
 }, [query, units]);  

 const formatBackground = () => {
  if (!weather) return 'from-cyan-700 to-blue-700'
  const threshold = units === 'metric' ? 20:60  
  if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

  return 'from-yellow-700 to-orange-700'
 }
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl
    shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery= {setQuery} units={units} setUnits={setUnits} />

      {weather && (
      <div>
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails weather={weather}/>
  
        <Forecast title="Previsão do Tempo" items={weather.hourly}/>
        <Forecast title="Previsão Diária" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;

//Fazendo a tabela azul que fica atrás das informações