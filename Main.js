import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Penggunaan from "./Component/penggunaan";

class Main extends Component {
    render = () => {
        return (
            <Switch>
                <Route path="/penggunaan" component={Penggunaan} />
            </Switch>
        );
    }
}

export default Main;