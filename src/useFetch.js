import { useEffect, useState } from 'react';

const useFetch = (url) =>{ //passing the endpoint 
     const [data, setData] = useState(null);
     const [isPending, setIsPending] = useState(true);
     const [error, setError] = useState(true);

     useEffect(() => {
      const abortCont = new AbortController();

       fetch(url, { signal: abortCont.signal })
         .then(res => {
           if (!res.ok) {   //error coming back from server
             throw Error("could not fetch data");
           }
           return res.json();
         })
         .then(data => {
           setData(data);
           setIsPending(false);
           setError(null);
         })
         .catch(err => {
          if(err.name === 'AbortError'){
            console.log('fetch aborted');
          } else {
            // auto catches network / connection error
            setError(err.message);
            setIsPending(false);
          }
         });
         return () => abortCont.abort()
     }, [url]);
  
     return { data, isPending, error }  //we are getting these three properties back
} 

export default useFetch;