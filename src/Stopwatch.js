import React, {useState} from 'react'
import Error from './Error';

function Stopwatch() {
    const [counter, setCounter] = useState(0);
    const [isStart, setStart] = useState(false);
    const [btnStart, setBtnStart] = useState(`Start`);
    const [intervalId, setIntervalId] = useState();
    const [records, setRecords] = useState([]);
    const [error, setError] = useState({status: false})

    const start = () => {
        if(!isStart){
            setIntervalId(
                setInterval(()=>{
                    setCounter(prevState => prevState+100);
                },100)
            );
            setBtnStart(`Stop`);
            setStart(true);

            error.status && setError({status: false});
        } else{
            clearInterval(intervalId);
            setBtnStart(`Start`);
            setStart(false);
        }
    }

    const reset = () => {
        clearInterval(intervalId);
        setBtnStart(`Start`);
        setStart(false);
        setCounter(0);
        setRecords([]);
    }

    const record = () => {
        isStart ? setRecords(prevState => prevState.concat([counter])) : setError({status: true})
    }

    return (
        <div>
            <h3>Stopwatch: {counter}</h3>
            <button onClick={start}>{btnStart}</button>
            <button onClick={reset}>Reset</button>
            <button onClick={record}>Record</button>

            {error.status ? <Error text="Press Start button at first" /> : undefined}

            {records.length ?
                <ul>
                    {records.map((item,index) => <li key={`counter_`+index}>{item}</li>)}
                </ul>
                : undefined
            }
        </div>
    )
}

export default Stopwatch