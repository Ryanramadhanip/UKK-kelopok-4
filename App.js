import React from 'react';
import {Link} from 'react-router-dom';
import Penggunaan from './Component/Penggunaan';

class App extends React.Component{
    render = () => {
        return(
          <div> <hr/>
            <Link to="/penggunaan"></Link>
            <Penggunaan/>
          </div>
        );
    }
}

export default App;
