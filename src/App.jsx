import { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);
  
  const startTimeRef = useRef(0);

  
  useEffect(() => {                                  //useEffect se activa cuando 'isRunning' cambia
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {                     //si el cronómetro está corriendo, inicia un intervalo
        setElapsedTime(Date.now() - startTimeRef.current);        //actuliza el tiempo transcurrido cada 10ms
      },10); 
    }

    
    return () => {
      clearInterval(intervalIdRef.current);          //limpia el contenido cuando el componente se desmonta o el estado cambia
    };


  }, [isRunning]);

  
  function start() {
    setIsRunning(true);                                   //cambia el estado para que el cronómetro comience a correr
    startTimeRef.current = Date.now() - elapsedTime;        //guarda el tiempo actual menos el tiempo transcurrido
    console.log(startTimeRef.current); 
  }

  
  function stop() {
    setIsRunning(false);                                  //cambia el estado para que el cronómetro se detenga
  }

 
  function reset() {
    setElapsedTime(0);                                          //reinicia el tiempo transcurrido a 0
    setIsRunning(false);                                        //detiene el cronómetro
  }

  
  function formatTime() {                                       //función que formatea el tiempo transcurrido en formato mm:ss:ms
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); 
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); 
    let seconds = Math.floor((elapsedTime / 1000) % 60); 
    let milliseconds = Math.floor((elapsedTime % 1000) / 10); 

      
    hours = String(hours).padStart(2, "0");                         //asegura que cada numero tenga al menos dos digitos
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;                     //devuelve el timepo formateado
  }

  return (
    <div className="stopwatch">

      <div className="display">
        {formatTime()}
      </div>

      <div className="controls">
        <button onClick={start} className="start-button">Empezar</button> 
        <button onClick={stop} className="stop-button">Parar</button> 
        <button onClick={reset} className="reset-button">Resetear</button> 
      </div>

    </div>
  );
}

export default Stopwatch;
