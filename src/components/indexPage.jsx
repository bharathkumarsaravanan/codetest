import React from "react";
import { useState } from "react";
import PopUp from "./popUp";

function IndexPage(){

    const [popUp, setPopUp] = useState(false);

    return(
        <div className="indexPage">
            <button onClick={() => setPopUp(true)}>Save Segments</button>
            <PopUp visible={popUp} setVisible={setPopUp} />
        </div>
    )
}

export default IndexPage;