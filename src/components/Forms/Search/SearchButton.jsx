import React, {Component} from "react";
import "./searchbutton.css";

export default class SearchButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProcess: false
        };
    }

    toggleInProcess() {
        if (this.props.onClick) {
            this.props.onClick();
        }
        this.setState({
            inProcess: !this.state.inProcess
        });
    }

    render() {
        return <div className={this.state.inProcess?"search-btn activated":"search-btn"}
                    onClick={this.toggleInProcess.bind(this)}>
            <div className="search-icon">
                <i className="material-icons">search</i>
            </div>
            <div className="search-text">
                Search
            </div>
        </div>;
    }
}
