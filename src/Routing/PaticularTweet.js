import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Tweets from "../Components/Tweets";
import User from "../Components/User";

function ParticularTweet() {

    const params = useParams();

    //users
    const [tweet, settweet] = useState({})


    //fetch users
    //fetch
    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://127.0.0.1:8000/gettweetbyid/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { console.log(res.data, res.status); settweet(res.data.showtweet) })
                .catch((err) => console.log(err))
        }, 1000)

        return () => clearInterval(interval);

    }, [params.id])


    return (
        <>
            <NavBar />
            <div className="followers p-2 w-50 mx-auto mt-5 mb-5 rounded" style={{ backgroundColor: "ghostwhite", color: "#777" }}>

                {tweet.id && <Tweets key={tweet.id} content={tweet} />}



            </div>
        </>
    )
}

export default ParticularTweet