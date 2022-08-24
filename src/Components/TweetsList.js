import axios from "axios";
import React, { useEffect, useState } from "react";
import Tweets from "./Tweets";

function TweetsList() {
    //holding post state 
    const [tweets, setTweets] = useState([])

    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    console.log(tokenaccess);

    //fetch tweets each sec
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://127.0.0.1:8000/getalltweets/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { console.log(res.data.tweetlist, res.status); setTweets(res.data.tweetlist) })
                .catch((err) => console.log(err))
        }, 1000);






        return () => clearInterval(interval);
    }, [])

    return (
        <>
            {tweets.map((e) => {
                return (
                    <Tweets key={e.id} content={e} />
                )
            })}
        </>
    )
}


export default TweetsList;