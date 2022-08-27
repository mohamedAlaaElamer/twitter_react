import axios from "axios";
import React, { useContext, useState, useRef } from "react";
import { CreateTweetContext } from "./CreateTweetContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faHeart, faTrash, faComment, faImage } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faRetweet, faHeart, faTrash, faComment, faImage)

function CreateTweet() {

    //show form
    const { showCreate, setshowCreate } = useContext(CreateTweetContext);

    //state delcaration
    const [image, setimage] = useState(null)
    const [userReg, setuserReg] = useState("")
    const inputFile = useRef(null)

    //state handler
    const getpic = (e) => {
        console.log(e.target.files[0])
        setimage(e.target.files[0])

    }
    const userHandle = (e) => {
        if (e.target.name === 'content')
            setuserReg(e.target.value)
    }
    const onButtonClick = () => {
        inputFile.current.click();
    };

    //form handler
    const formHandle = (e) => {
        e.preventDefault();
        //checking state
        let from1 = new FormData(e.target)
        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
        axios.post('https://mini-twitter-app2.herokuapp.com/creattweet/', from1, {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { console.log(res.data, res.status); e.target.reset(); setshowCreate(false); })
            .catch((err) => console.log(err))
    }


    return (
        <div className={showCreate ? "d-block" : "d-none"}>
            <form onSubmit={e => formHandle(e)} className=" p-2 text-center text-white" encType=" multipart /form-data"
                style={{ position: "fixed", zIndex: "1000", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "350px", backgroundColor: "#36a2b9", borderRadius: "15px" }}>
                <div className="d-flex align-items-center flex-column">
                    <h2>Create Tweet</h2>
                    <textarea style={{ width: "300px", height: "200px", resize: "none", borderRadius: "25px", textAlign: "center", fontSize: "25px" }} name='content' value={userReg.content} onChange={e => userHandle(e)} />
                    <div style={{ width: "300px" }} className="d-flex justify-content-between align-items-center mt-3">
                        <FontAwesomeIcon icon="fas fa-image" onClick={onButtonClick} style={{ fontSize: "30px" }} />
                        <input type="file" ref={inputFile} name='image' style={{ display: "none" }} onChange={e => getpic(e)} />
                        <input style={{ color: "#36a2b9" }} className="btn  btn-light" type="submit" value='Save' />
                        <input style={{ color: "#36a2b9" }} className="btn  btn-light" type="submit" value='Close' onClick={(e) => { e.preventDefault(); setshowCreate(false); }} />
                    </div>
                </div>
            </form>
        </div >
    )
}

export default CreateTweet;