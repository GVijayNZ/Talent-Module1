/* Experience section */

import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        const details = this.props.experienceData
        this.state = {
            id: "",
            company: "",
            position: "",
            responsibilities: "",
            start: '',
            end: '',
            newExperience: details,
            showAddSection: false,
            showEditSection: false,
            updateId: ""
        }
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.openHeader = this.openHeader.bind(this)
        this.closeHeader = this.closeHeader.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)
        this.editItem = this.editItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.updateData = this.updateData.bind(this)
        this.closeEditData = this.closeEditData.bind(this)
    }

    openHeader() {
        const details = this.props.experienceData
        this.setState({
            newExperience: details,
            showAddSection: true
        })
        {/*const details = Object.assign([], this.props.languageData)
        this.setState({
            showEditSection: true,
            newLanguage: details
        })*/}
    }
    closeHeader() {
        this.setState({ showAddSection: false })
    }

    deleteItem(id) {
        console.log("id", id);
        const details = this.props.experienceData
        var index = details.findIndex(item => item.id == id)
        console.log("index", index);
        //const details = this.props.languageData
        details.splice(index, 1)
        this.props.updateProfileData(details)
    }
    editItem(id, company, position, responsibilities, start, end) {
        console.log("id", id);
        const details = this.props.experienceData
        this.setState({
            newSkill: details,
            showEditSection: true,
            updateId: id,
            company: company,
            position: position,
            responsibilities: responsibilities,
            start: start,
            end: end
        })

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    saveData() {
        let company = this.state.company
        let position = this.state.position
        let responsibilities = this.state.responsibilities
        let start = this.state.start
        let end = this.state.end
        this.state.newExperience.push({ company, position, responsibilities, start, end })
        //this.state.newExperience.push({ company, position, responsibilities,start})
        const data = Object.assign([], this.state.newExperience)

        this.props.updateProfileData(data)
        console.log("new array", data);
        this.closeHeader()
    }

    updateData(id) {
        const details = this.props.experienceData

        const company = this.state.company
        const position = this.state.position
        const responsibilities = this.state.responsibilities
        const start = this.state.start
        const end = this.state.end
        var index = details.findIndex(item => item.id == id)
        details.splice(index, 1, { company, position, responsibilities, start, end })
        this.props.updateProfileData(details)
        this.closeEditData()
    }
    closeEditData() {
        this.setState({
            showEditSection: false
        })
    }
    render() {
        return (
            this.state.showAddSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderDisplay() {
        let list = this.props.experienceData;
        //let list = this.state.newLanguage;
        let tableData = null;
        function formatDate(string) {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(string).toLocaleDateString([], options);
        }
        if (list != "") {
            tableData = list.map((item, index) => <tr key={index}>
                {this.state.showEditSection && (item.id == this.state.updateId)
                    ?
                    <React.Fragment>

                        <td>
                            <ChildSingleInput
                                inputType="text"
                                name="company"
                                value={this.state.company}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Company"
                                errorMessage="Please enter a valid company"
                            />
                        </td>
                        <td>
                            <ChildSingleInput
                                inputType="text"
                                name="position"
                                value={this.state.position}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Position"
                                errorMessage="Please enter a valid position"
                            />
                        </td>

                        <td>

                            <ChildSingleInput
                                inputType="date"
                                name="start"
                                value={this.state.start}

                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Start Date"
                                errorMessage="Please enter a valid start date"
                            />

                        </td>
                        <td>
                            <ChildSingleInput
                                inputType="date"
                                name="end"
                                value={this.state.end}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="End Date"
                                errorMessage="Please enter a valid end date"
                            />
                        </td>
                        <td>

                            <ChildSingleInput
                                inputType="text"
                                name="responsibilities"
                                value={this.state.responsibilities}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Responsibilities"
                                errorMessage="Please enter your responsibilities"
                            />
                        </td>
                        <td>
                            <button type="button" className="ui button" onClick={this.updateData.bind(this, item.id)}>Update</button>

                            <button type="button" className="ui button" onClick={this.closeEditData}>Cancel</button>
                        </td>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <td>{item.company}</td>
                        <td>{item.position}</td>
                        <td>{item.responsibilities}</td>

                        <td>{formatDate(item.start)}</td>
                        <td>{formatDate(item.end)}</td>

                        <td>
                            <a onClick={this.editItem.bind(this, item.id, item.company, item.position, item.responsibilities, item.start, item.end)}>
                                <i className="pencil icon"></i>
                            </a>
                            <a onClick={this.deleteItem.bind(this, item.id)}>
                                <i className="close icon"></i>
                            </a>
                        </td>
                    </React.Fragment>


                }
            </tr>)
        }
        //console.log("tabledata", tableData);
        return (
            <div className="row">
                <div className="ui sixteen wide column">
                    <div className="ui segments">
                        <table className="ui single line table" style={{ table_layout: 'fixed', width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Positions</th>
                                    <th rowSpan="2">Responsibility</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th><button className="ui right floated secondary button" onClick={this.openHeader}> <i className="plus square icon"> </i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )

    }
    renderEdit() {
        return (
            <React.Fragment>
                <div className="ui eight wide column">

                    <ChildSingleInput
                        inputType="text"
                        name="company"
                        value={this.state.company}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Company"
                        errorMessage="Please enter a valid company"
                    />
                </div>
                <div className="ui eight wide column">

                    <ChildSingleInput
                        inputType="text"
                        name="position"
                        value={this.state.position}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Position"
                        errorMessage="Please enter a valid position"
                    />
                </div>

                <div className="ui eight wide column">

                    <ChildSingleInput
                        inputType="date"
                        name="start"
                        value={this.state.start}

                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Start Date"
                        errorMessage="Please enter a valid start date"
                    />
                </div>
                <div className="ui eight wide column">

                    <ChildSingleInput
                        inputType="date"
                        name="end"
                        value={this.state.end}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="End Date"
                        errorMessage="Please enter a valid end date"
                    />
                </div>
                <div className="ui sixteen wide column">

                    <ChildSingleInput
                        inputType="text"
                        name="responsibilities"
                        value={this.state.responsibilities}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Responsibilities"
                        errorMessage="Please enter your responsibilities"
                    />
                </div>
                <div className="ui two wide column">
                    <button type="button" className="ui button" onClick={this.saveData}>Add</button>
                </div>
                <div className="ui two wide column">
                    <button type="button" className="ui button" onClick={this.closeHeader}>Cancel</button>
                </div>
                <div className="ui sixteen wide column">
                    {this.renderDisplay()}
                </div>
            </React.Fragment>

        )
    }
}