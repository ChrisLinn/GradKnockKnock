/**
 * Created by hastings on 14/05/2017.
 */
import React, {Component} from 'react';
import "./searchbar.css";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    switchAlign() {
        if (!this.props.align) {
            return "search-bar";
        }
        switch (this.props.align) {
            case "left":
                return "search-bar left";
            case "right":
                return "search-bar right";
        }
    }

    render() {
        return <div className={this.switchAlign()}>
            <div className="search-bar-icon">
                <i className="material-icons">search</i>
            </div>
            <div className="search-bar-input">
                <input type="text"/>
            </div>
        </div>
    }
}