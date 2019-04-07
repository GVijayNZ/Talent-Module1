import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {

    constructor(props) {
        super(props)

        const details = props.jobSeekingStatus ?
            Object.assign({}, props.jobSeekingStatus)
            : {
                status: "",
                availableDate:null

            }

        this.state = {

            newStatus: details
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveStatus = this.saveStatus.bind(this)
        this.saveData = this.saveData.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                status: this.props.jobSeekingStatus.status,
                availableDate: this.props.jobSeekingStatus.availableDate
            })
            //console.log("componentupdatesummary", this.props)
            //console.log("componentupdatesummary", this.props.details.summary)
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        
        
    }

    saveStatus() {
        if ((event.target.value) == "Available on later dates") {
            document.getElementById('availability').style.visibility = "visible";
            this.saveData();
            }
            else {
            document.getElementById('availability').style.visibility = "hidden";
            }
        const data = Object.assign({}, this.state.newStatus)
        //console.log("savestatus", event.target.value);
        data[event.target.name] = event.target.value
        this.setState({
            newStatus: data
        })
        //console.log("change", data);

        this.props.saveProfileData({ "jobSeekingStatus": data })


    }
    saveData(event) {
        const data = Object.assign({}, this.state.newStatus)
        //data[event.target.name] = event.target.value
        this.setState({
            newStatus: data
        })
        //console.log("change", data);

        this.props.saveProfileData(data)
    }
    render() {
        //console.log("date", this.state.newStatus.availableDate);
        return (
            <React.Fragment>
                <div className="ui sixteen wide column">
                    <label>Actively looking for a Jobs</label>
                    <input
                        type="radio"
                        value="active"
                        name="status"
                        checked={this.state.status === "active"}
                        onChange={this.saveStatus}
                    />
                </div>
                <div className="ui sixteen wide column">
                    <label>Not looking for a Job at the moment</label>
                    <input
                        type="radio"
                        value="not looking"
                        name="status"
                        checked={this.state.status === "not looking"}
                        onChange={this.saveStatus}
                    />
                </div>
                <div className="ui sixteen wide column">
                    <label>Currently employed but open to offers</label>
                    <input
                        type="radio"
                        value="Employed.But available"
                        name="status"
                        checked={this.state.status === "Employed.But available"}
                        onChange={this.saveStatus}
                    />
                </div>
                <div className="ui sixteen wide column">
                    <label>Will be available on later dates</label>
                    <input
                        type="radio"
                        value="Available on later dates"
                        name="status"
                        checked={this.state.newStatus.status === "Available on later dates"}
                        onChange={this.saveStatus}
                    />
                </div>

                {/*hidden div for available date*/}
                <div className="ui eight wide column" id="availability" style={{ visibility: 'hidden' }}>
                    <ChildSingleInput
                        inputType="date"
                        name="availableDate"
                        value={this.state.availableDate}
                        controlFunc={this.saveStatus}
                        maxLength={80}
                        placeholder="Start Date"
                        errorMessage="Please enter a valid start date"
                    />
                    
                    <button type="button" className="ui right floated secondary button" onClick={this.saveData}>Save</button>
                </div>
            </React.Fragment>
        )
    }


}