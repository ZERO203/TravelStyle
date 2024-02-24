import { useState } from "react";

const useCounter = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter +1)
    }

    return { counter, increment}
}


export default useCounter;