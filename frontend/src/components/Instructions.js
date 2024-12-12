import React from "react";
import "../styles/Instructions.css";

const Instructions = () => {
    return (
        <div className="instBox">
            <h1>Not sure what to do?</h1>
            <p>
                To start off you can type in anything that you want to look for in the search bar above. 
                This will then search through a couple of websites and give you a few results from them here in one spot.
            </p>
            <p>
                Once you have done that you will be given either the entire name of the product or a shortend name.
                You will also be able to go directly to the online store we found it if you want to buy it. 
                Lastly you can click on view cheaper items which will take you to a new page. 
                That page will have your item on the left and similar items that are cheaper on the right.
            </p>
            <p>
                One last thing, if you have already created an account and signed in you can hit that little heart on the top right of an item and save it to your wishlist
                This will allow you to look back at anything you saved.
            </p>
        </div>
    )
}

export default Instructions;