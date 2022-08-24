import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Tweets from "../Components/Tweets";

function Profile() {


    //get username
    const Params = useParams();

    //holding post state
    const [user, setUser] = useState([])
    const [tweets, setTweets] = useState([])


    //fetch tweets each sec
    useEffect(() => {
        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
        const interval = setInterval(() => {
            axios.get(`http://127.0.0.1:8000/newuserprofile/${Params.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { console.log(res.data, res.status); setTweets(res.data.tweetlist); setUser(res.data.userinfo) })
                .catch((err) => console.log(err))

        }, 1000);






        return () => clearInterval(interval);
    }, [Params.username])



    //follow action
    const followaction = () => {
        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
        axios.get(`http://127.0.0.1:8000/follow/${Params.username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { console.log(res.data, res.status); })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {!localStorage.getItem("auth") ? <Redirect to='/' /> : (
                <>
                    <NavBar />
                    <div className="d-flex align-items-center" style={{ margin: "70px", position: "relative" }}>
                        {!user.propic ? (
                            <img src="https://via.placeholder.com/350x150" alt="" style={{ marginLeft: "15px", borderRadius: "80px", width: "150px", height: "150px" }} />
                        ) : (
                            <img src={`http://127.0.0.1:8000${user.propic}`} alt="" style={{ marginLeft: "15px", borderRadius: "80px", width: "150px", height: "150px" }} />
                        )}

                        <div style={{ marginLeft: "25px" }}>
                            <h1 >{user.firstname} {user.lastname}</h1>
                            <h2 >{user.email}</h2>
                            <h3 style={{ wordWrap: "break-word", width: "30%" }}>{user.bio}</h3>
                            <Link className="text-decoration-none" to={`/${Params.username}/following`}><span className="h5 me-5">Following : {user.following}</span></Link>
                            <Link className="text-decoration-none" to={`/${Params.username}/followers`}><span className="h5">Followers : {user.followers}</span></Link>
                            <Link className="text-decoration-none ms-5 me-5" to={`/${Params.username}/replies`}><span className="h5">Replies</span></Link>
                            <Link className="text-decoration-none" to={`/${Params.username}/likes`}><span className="h5">Likes</span></Link>
                            {JSON.parse(localStorage.getItem("userinfo")).username === Params.username ? (
                                <button type="button" className="btn btn-light" style={{ color: "white", position: "absolute", top: "40%", left: "75%", width: "20%", backgroundColor: "cadetblue" }} onClick={() => { window.location.href = "/profile" }}>Edit</button>) : (
                                <button type="button" className="btn btn-light" style={{ color: "white", position: "absolute", top: "40%", left: "75%", width: "20%", backgroundColor: "cadetblue" }} onClick={() => { followaction() }}>{user.ifollow ? "unfollow" : "follow"}</button>)}

                        </div>
                    </div>
                    {tweets.map((e) => {
                        return (
                            <Tweets key={e.id} content={e} />
                        )
                    })}

                </>
            )}
        </>
    )
}

export default Profile