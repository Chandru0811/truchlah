import React from "react";
import ErrorPage from '../asset/404.png';
function NotFound(){
    return(
        <div className="container-fluid mt-5 text-center">
           <img src={ErrorPage} style={{width: '50  %', height: 'auto'}} alt="Error page" className="img-fluid" />
        </div>
    );
}
export default NotFound;