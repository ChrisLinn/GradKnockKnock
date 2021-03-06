import React, {Component} from 'react'
import InputBox from "../../../components/Forms/InputBox/InputBox.jsx";
import InputArea from "../../../components/Forms/InputBox/InputArea.jsx";
import EasySchema from "../../../utils/EasySchema.js";
import './HomeView.scss'

const Schema = new EasySchema({
    emailAddr: {
        type: "String",
        regex: EasySchema.regex().email
    }
});

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            data: [""],
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleSubmitting() {
        this.setState({isSubmitting: !this.state.isSubmitting});
    }

    handleSubmit(event) {
        let email = this.state.data[0];
        let data = {
            "emailAddr": email
        };
        if (!Schema.validate(data)){
            alert("Email Address Is Not In Correct Format!")
            return;
        };
        let self = this;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        this.toggleSubmitting();
        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            let js = JSON.stringify(json, null, '   ');
            console.log(js);
            self.setState({data: [""], isSubmitting: false});
            alert(json.result);
            // setTimeout(function () {
            //     self.setState({data: [""], isSubmitting: false});
            // }, 300);
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' +
                            error.message);
        });
        event.preventDefault();
    }


    handleChange(event) {
    this.setState({
                    data: [event.target.value],
                });
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <h3> Email Address: </h3>
                    <input    type="text"
                            value={this.state.data[0]}
                            onChange={this.handleChange}
                    />
                    </label>
                    <br/>
                    <br/>
                <input type="submit" value="订阅 / 退订" />
            </form>
            {this.state.isSubmitting ? <p>Submitting...<br/>已订阅的会退订，误退订可重新订</p> : ""}
        </div>;
    }

}
