/* Skill section */

import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const details = this.props.skillData
        this.state = {
            name: "",
            level: "",
            newSkill: details,
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
        const details = this.props.skillData
        this.setState({
            newSkill: details,
            showAddSection: true
        })
    }
    closeHeader() {
        this.setState({ showAddSection: false })
    }
    editItem(id, name, level) {
        console.log("id", id);
        const details = this.props.skillData
        this.setState({
            newSkill: details,
            showEditSection: true,
            updateId: id,
            name: name,
            level: level
        })

    }

    deleteItem(id) {
        console.log("id", id);
        const details = this.props.skillData
        var index = details.findIndex(item => item.id == id)
        console.log("index", index);
        //const details = this.props.languageData
        details.splice(index, 1)
        this.props.updateProfileData(details)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    saveData() {
        let name = this.state.name
        let level = this.state.level
        this.state.newSkill.push({ name, level })
        const data = Object.assign([], this.state.newSkill)
        //let data = { languages: [{ name: name, level: level }] }
        //let data = {details: [this.state.newLanguage] }
        //console.log("data", data)
        this.props.updateProfileData(data)
        console.log("new array", data);
        this.closeHeader()
    }
    updateData(id) {
        const details = this.props.skillData
        const name = this.state.name
        const level = this.state.level
        var index = details.findIndex(item => item.id == id)
        details.splice(index, 1, { name, level })
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
        let list = this.props.skillData;
        //let list = this.state.newLanguage;
        let tableData = null;
        if (list != "") {
            tableData = list.map((item, index) => <tr key={index}>
                {this.state.showEditSection && (item.id == this.state.updateId)
                    ?
                    <React.Fragment>
                        <td>
                            <ChildSingleInput
                                inputType="text"
                                name="name"
                                value={this.state.name}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Skill"
                                errorMessage="Please enter a valid skill"
                            />
                        </td>
                        <td>
                            <select className="ui right labeled dropdown"
                                value={this.state.level}
                                onChange={this.handleChange}
                                name="level">
                                <option value="">Skill Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="expert">Expert</option>

                            </select>
                        </td>
                        <td>
                            <button type="button" className="ui button" onClick={this.updateData.bind(this, item.id)}>Update</button>
                        </td>
                        <td>
                            <button type="button" className="ui button" onClick={this.closeEditData}>Cancel</button>
                        </td>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <td className="seven wide">{item.name}</td>
                        <td className="seven wide">{item.level}</td>

                        <td className="one wide"><a onClick={this.editItem.bind(this, item.id, item.name, item.level)}><i className="pencil icon"></i></a></td>
                        <td className="one wide"><a onClick={this.deleteItem.bind(this, item.id)}><i className="close icon"></i></a></td>
                    </React.Fragment>


                }

            </tr>)
        }
        //console.log("tabledata", tableData);

        return (<div className="row">
            <div className="ui sixteen wide column">
                <div className="ui segments">
                    <table className="ui single line table">
                        <thead>
                            <tr>
                                <th>Skill</th>
                                <th>Level</th>
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
        //let levelOptions = 
        //    [
        //    "Basic",
        //    "Conversational",
        //    "Fluent",
        //    "Native/Bilingual"
        //    ]
        //let languageLevelOptions = [];
        //languageLevelOptions = levelOptions.map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <React.Fragment>
                <div className="ui five wide column">

                    <ChildSingleInput
                        inputType="text"
                        name="name"
                        value={this.state.name}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Skill"
                        errorMessage="Please enter a valid skill"
                    />
                </div>
                <div className="ui five wide column">
                    <select className="ui right labeled dropdown"
                        value={this.state.level}
                        onChange={this.handleChange}
                        name="level">
                        {/*<option value="">LanguageLevel</option>
                        {languageLevelOptions}*/}
                        <option value="">Skill Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                        
                    </select>

                </div>
                <div className="ui three wide column">
                    <button type="button" className="ui button" onClick={this.saveData}>Save</button>
                </div>
                <div className="ui three wide column">
                    <button type="button" className="ui button" onClick={this.closeHeader}>Cancel</button>
                </div>
                <div className="ui sixteen wide column">
                    {this.renderDisplay()}
                </div>
            </React.Fragment>

        )
    }
}