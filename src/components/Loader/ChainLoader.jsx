import React, {Component} from "react";
import "./loaders.css";

export default class ChainLoader extends Component {
    constructor(props) {
        super(props);
    }

    renderSegments() {
        let segs = [];
        for (let i = 0; i < 28; i++) {
            segs.push(<div className="seg" key={i}>
                <div className="bar"></div>
            </div>);
        }
        return segs;
    }

    render() {
        return <div className="chain-loader">
            <div className="chain-loader-overlay"></div>
            <div className="loader-text">
                <div>A</div>
                <div>l</div>
                <div>l</div>
                <div>u</div>
                <div>m</div>
                <div>e</div>
            </div>
            <div className="segs">
                {this.renderSegments()}
            </div>
        </div>;
    }
}
