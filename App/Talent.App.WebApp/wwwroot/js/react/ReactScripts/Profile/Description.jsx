import React from 'react';
import Cookies from 'js-cookie';

export default class Description extends React.Component {

    constructor(props) {
        super(props)
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                summary: "",
                description: ""
            }
        this.state = {
            newDescription: details,
            characters: 0
        };
        this.update = this.update.bind(this);
       
    };
    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                summary: this.props.details.summary,
                description: this.props.details.description
                })
            //console.log("componentupdatesummary", this.props)
            //console.log("componentupdatesummary", this.props.details.summary)
        }

    }
    update(event) {
        const data = Object.assign({}, this.state.newDescription)
        data[event.target.name] = event.target.value
        this.props.updateStateData(data);
        let userDetails = event.target.value;
        this.setState({
            newDescription: data,
            characters: userDetails.length
        })
    }

    render() {
        
        const characterLimit = 600;
        const summaryLimit = 150;
        let characters = this.props.description ? this.props.description.length : 0;
        let charactersSummary = this.props.summary ? this.props.summary.length : 0;
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <input type="text" maxLength={summaryLimit} name="Summary" placeholder="Please provide a short summary about yourself." value={this.state.summary} onChange={this.update} ></input>
                    </div>
                    <p>Summary must be no more than 150 characters</p>
                    {/*<p>Characters remaining : {charactersSummary} / {summaryLimit}</p>*/}
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="Description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.state.description} onChange={this.update} ></textarea>
                    </div>
                    <p>Description must be between 150-600 characters</p>
                    {/*<p>Characters remaining : {characters} / {characterLimit}</p>*/}
                    <button type="button" className="ui right floated teal button" onClick={this.update}>Save</button>
                </div>
            </React.Fragment>
        )
    }
}
