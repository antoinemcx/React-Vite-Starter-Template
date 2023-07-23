import '../../assets/main.css'
import { setTitle } from '../../utils/generalFunctions';

export const Home = () => {
    setTitle("Home");

    return (
        <div className="container">
            Hello world...
        </div>
    );
}
