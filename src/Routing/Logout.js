import React, { useEffect } from "react";

function Logout() {
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("auth"))) {
            localStorage.removeItem("auth");
            localStorage.removeItem("userinfo");
            window.location.href = "/"
        } else {
            window.location.href = "/"
        }

    }, [])
    return (
        <></>
    )
}

export default Logout;