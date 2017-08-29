import React, {Component} from "react";
import PropTypes from "prop-types";

export default class InputBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id={this.props.id} className="input-box" style={this.props.style}>
            <div className="input-icon">
                {this.props.icon}
            </div>
            <div className="input-content">
                {this.props.before?<span className="big">{this.props.before}</span>:""}
                <input type={this.props.password?"password":"text"} onChange={(evt)=>{
                    this.props.onChange(evt.target.value, this.props.identity);
                }} placeholder={this.props.placeholder?this.props.placeholder:""}
                       value={this.props.value || this.props.value == 0?this.props.value:""}/>
                {this.props.after?<span>{this.props.after}</span>:""}
            </div>
        </div>;
    }
}

InputBox.propTypes = {
    identity: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
