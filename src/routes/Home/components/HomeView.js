import React, {Component} from 'react'
import InputBox from "../../../components/Forms/InputBox/InputBox.jsx";
import InputArea from "../../../components/Forms/InputBox/InputArea.jsx";
import EasySchema from "../../../utils/EasySchema.js";
import './HomeView.scss'

const Schema = new EasySchema({
    email: {
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
            "email": email
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
            alert(js.result)
            setTimeout(function () {
                self.setState({data: [""], isSubmitting: false});
            }, 1000);
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
                    Email Address:
                    <br/>
                    <input    type="text"
                            value={this.state.data[0]}
                            onChange={this.handleChange}
                    />
                    </label>
                    <br/>
                    <br/>
                <input type="submit" value="Subscribe / Unsubsribe" />
            </form>
            {this.state.isSubmitting ? <p>Submitting...</p> : ""}
        </div>;
    }

}
