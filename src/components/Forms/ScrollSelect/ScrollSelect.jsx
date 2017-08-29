import React, {Component} from "react";
import "./scrollselect.css";

export default class ScrollSelect extends Component {
    constructor(props) {
        super(props);
        let options = [];
        let optionStyles = [];
        for (let i in this.props.options) {
            options.push(this.props.options[i]);
        }
        for (let j in this.props.options) {
            optionStyles.push(this.props.optionStyles[j] ? this.props.optionStyles[j] : "");
        }
        this.state = {
            currentOption: 0,
            options: options,
            optionStyles: optionStyles
        };
    }

    renderOpitons() {
        let options = [];
        this.state.options.forEach((opt, i)=> {
            options.push(<div key={i}
                              className={"scroll-option "+ (this.state.optionStyles[this.state.currentOption]?this.state.optionStyles[this.state.currentOption]:"") + (i==this.state.currentOption?"":" hidden")}>
                {this.state.options[i]}
            </div>);
        });
        return options;
    }

    leftScroll() {
        this.setState({currentOption: (this.state.currentOption - 1 < 0) ? 0 : (this.state.currentOption - 1)});
        this.props.onChange ? this.props.onChange(this.state.options[this.state.currentOption], this.props.key) : "";
    }

    rightScroll() {
        this.setState({currentOption: (this.state.currentOption + 1 <= this.state.options.length - 1 ) ? (this.state.currentOption + 1) : (this.state.options.length - 1)});
        this.props.onChange ? this.props.onChange(this.state.options[this.state.currentOption], this.props.key) : "";
    }

    render() {
        return <div className="scroll-select width-1">
            <div className="left-scroll" onClick={this.leftScroll.bind(this)}>
                <i className="material-icons">keyboard_arrow_left</i>
            </div>
            <div className="scroll-options">
                {this.renderOpitons()}
            </div>
            <div className="right-scroll" onClick={this.rightScroll.bind(this)}>
                <i className="material-icons">keyboard_arrow_right</i>
            </div>
        </div>;
    }
}
