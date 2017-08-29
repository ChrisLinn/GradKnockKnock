import React, {Component} from "react";
import "./messagebox.css";

export default class MessageBox extends Component {
    constructor(props) {
        super(props);
    }

    renderTypes() {
        let types = "message-box";
        switch (this.props.type) {
            case "success":
                types += " success";
                break;
            case "warn":
                types += " warn";
                break;
            case "error":
                types += " error";
                break;
        }
        return types;
    }

    render() {
        return (<div className={this.renderTypes()}>
            <div className="msg-icon">
            </div>
            <div className="msg-content"></div>
            {this.props.children}
        </div>);
    }
}

MessageBox.show = (content = "", type = "normal", delay = 3000)=> {
    if (type && type != "warn" && type != "error" && type != "success" && type != "normal")
        throw new Error("MessageBox: type not recognizable error");
    let dom = document.querySelector(".message-box");
    dom.querySelector(".msg-content").innerHTML = content;
    let icon = "";
    if (type == "success") {
        icon += "<i class='material-icons'>done</i>";
    } else if (type == "warn") {
        icon += "<i class='material-icons'>warning</i>";
    } else if (type == "error") {
        icon += "<i class='material-icons'>error_outline</i>";
    }
    dom.querySelector(".msg-icon").innerHTML = icon;
    dom.classList.toggle(type);
    setTimeout(function () {
        dom.classList.toggle(type);
    }, delay);
};

const renderIcon = (type) => {

}