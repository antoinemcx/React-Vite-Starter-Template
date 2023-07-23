import './style.css';
import { Link, useNavigate } from "react-router-dom";
import { setTitle } from '../../utils/generalFunctions';

export const Error = (props) => {
    setTitle(`Error ${props.code}`);

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    
    let message, subMessage;
    if(props.code === '404') {
        message = "Page not found.";
        subMessage = "The page you're looking for may have been moved, deleted or has never existed.";
    } else if(props.code === '403') {
        message = "Forbidden.";
        subMessage = "You do not have access to this page.";
    }

    return (
        <div className="container error-container page-container">
            <div>
                <h1>{props.code}</h1>
                <h2>{message || "Something went wrong"}</h2>
                <p>{subMessage || "An error has occured, maybe you did something wrong ?"}</p>

                <Link to="/" className="button button-full">Back to home</Link>
                {props.code === '403' && <button onClick={goBack} className="button" style={{marginLeft: "10px"}}>Go back</button>}
            </div>
        </div>
    )
}
