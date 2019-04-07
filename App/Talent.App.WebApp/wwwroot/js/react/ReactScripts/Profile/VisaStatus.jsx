import React from 'react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';


export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                visaStatus:"",
                visaExpiryDate:''
            }
        this.state = {
            newVisaStatus: details,
            
        }
        this.saveVisa = this.saveVisa.bind(this)
        this.saveData = this.saveData.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                visaStatus: this.props.details.visaStatus,
                visaExpiryDate: this.props.details.visaExpiryDate
            })
            //console.log("componentupdatesummary", this.props.details.visaStatus)
            //console.log("componentupdateexpiry", this.props.details.visaExpiryDate)
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    saveVisa(event) {
        if ((event.target.value) == "workvisa") {
            document.getElementById('expirydate').style.visibility = "visible";
            //const data = Object.assign({}, this.state.newVisaStatus)
            //data[event.target.name] = event.target.value
            //this.setState({
            //    newVisaStatus: data
            //})
            //this.props.saveProfileData(data)
        }
        else {
            document.getElementById('expirydate').style.visibility = "hidden";
        //    const data = Object.assign({}, this.state.newVisaStatus)
        //    console.log("saveVisa", event.target.value)
        //    data[event.target.name] = event.target.value
        //    this.setState({
        //    newVisaStatus: data
        //})
        //this.props.saveProfileData(data)
        }
        const data = Object.assign({}, this.state.newVisaStatus)
        console.log("saveVisa", event.target.value)
        data[event.target.name] = event.target.value
        this.setState({
            newVisaStatus: data
        })
        this.props.saveProfileData(data)
    }
    saveData() {
        //console.log("trial", data);
        const data = this.state.visaExpiryDate
        //this.props.controlFunc(this.props.componentId, data)
        this.props.saveProfileData({ "visaExpiryDate": data })
    }
    
    render() {
        //console.log("render", this.state.visaExpiryDate)
        return (
            <React.Fragment>
                <div className="ui six wide column">
                    
                    <select id="statusbox" className="ui right labeled dropdown"
                        value={this.state.visaStatus}

                        name="visaStatus"
                        onChange={this.saveVisa}>
                        <option value="">Select status</option>
                        <option value="citizen">Citizen</option>
                        <option value="resident">Resident</option>
                        <option value="workvisa">Work Visa</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <div className="ui eight wide column" id="expirydate" style={{visibility:'hidden'}}>
                    <ChildSingleInput
                        inputType="date"
                        name="visaExpiryDate"
                        value={this.state.visaExpiryDate}  
                        controlFunc={this.handleChange}
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