import './App.css';

import navBar from './components/navBar/navBar';
import contentSpace from './components/contentSpace/contentSpace';


function App() {
    return (
        <div>
            <div>
                <contentSpace />
            </div> 
            <div>
                <navBar />
            </div>
        </div>
    );
}

export default App;
