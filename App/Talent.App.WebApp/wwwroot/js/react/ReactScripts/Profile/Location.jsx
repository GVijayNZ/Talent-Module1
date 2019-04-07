import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const details = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                Number: "",
                Street: "",
                Suburb: "",
                PostCode: 0,
                City: "",
                Country: ""
            }
        this.state = {
            showEditSection: false,
            newAddress: details
        }
        
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: details
        })
    }
    closeEdit() {
        this.setState({
            showEditSection:false
        })
    }
    handleChange(event) {
        event.preventDefault();
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress:data
        })
    }
    saveAddress() {
        const data = Object.assign({}, this.state.newAddress)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit();
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    //componentDidMount() {
    //    const data = Object.assign({}, this.state.newAddress)
    //    this.setState({
    //        newAddress:data
    //    })
    //}

    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.state.newAddress.Country;
        const selectedCity = this.state.newAddress.City;
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

        }
        return (
            <React.Fragment>
            <div className="ui five wide column">
                    <ChildSingleInput
                        inputType="text"
                        label="Number"
                        name="Number"
                        value={this.state.newAddress.Number}
                        controlFunc={this.handleChange}
                        maxLength={12}
                        placeholder="Enter your house number"
                        errorMessage="Please enter a valid house number"
                    />
                </div>
                <div className="ui five wide column">
                    <ChildSingleInput
                        inputType="text"
                        label="Street"
                        name="Street"
                        value={this.state.newAddress.Street}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder="Enter your Street name"
                        errorMessage="Please enter your street name"
                    />
                </div>
                <div className="ui five wide column">
                    <ChildSingleInput
                        inputType="text"
                        label="Suburd"
                        name="Suburb"
                        value={this.state.newAddress.Suburb}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        placeholder="Enter your Suburb"
                        errorMessage="Please enter your Suburb"
                    />
                </div>
                <div className="ui five wide column">
                    <b>Country</b>
                    <select className="ui right labeled dropdown"
                        label="Country"
                        placeholder="Country"
                        onChange={this.handleChange}
                        name="Country">
                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select>
                </div>
                <div className="ui five wide column">
                    <b>City</b>
                    <select
                        className="ui dropdown"
                        label="City"
                        placeholder="City"
                        value={selectedCity}
                        onChange={this.handleChange}
                        name="City">
                        <option value="0"> Select a town or city</option>
                        {popCities}
                    </select>
                </div>
                <div className="ui five wide column">
                    <ChildSingleInput
                        inputType="text"
                        label="Postcode"
                        name="PostCode"
                        value={this.state.newAddress.PostCode}
                        controlFunc={this.handleChange}
                        maxLength={10}
                        placeholder="Enter PostCode"
                        errorMessage="Please enter your PostCode"
                    />
                </div>
            <div className="ui sixteen wide column">
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Close</button>
                </div>
            </React.Fragment>   
        )
    }

    renderDisplay() {
        let Address = this.props.addressData ? `${this.props.addressData.number}  ${this.props.addressData.street}  ${this.props.addressData.suburb}  ${this.props.addressData.postCode}` : ""
        let City = this.props.addressData ? this.props.addressData.city : ""
        let Country = this.props.addressData ? this.props.addressData.country : ""
        //console.log("addressData", this.props.addressData.Number)
        return (

            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address:{Address} </p>
                        <p>City:{City} </p>
                        <p>Country:{Country} </p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}



//Nationality Component

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        //console.log("props",props)
        const details = props.nationalityData ?
            Object.assign({}, props.nationalityData)
            : {
                nationality:""
            }
        this.state = {
            newNationality: details
        }
        this.saveNationality = this.saveNationality.bind(this)
    }
    
    saveNationality() {
        const data = Object.assign({}, this.state.newNationality)
        data[event.target.name] = event.target.value
        this.setState({
            newNationality: data
        })
        this.props.saveProfileData(data)
       
    }
    
    render() {
        let countriesOptions = [];
        const selectedNation = this.props.nationalityData
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <div className="ui five wide column">
                <select className="ui right labeled dropdown"
                    value={selectedNation}
                    onChange={this.saveNationality}
                    name="nationality">
                    <option value="">Select a country</option>
                    {countriesOptions}
                </select>
            </div>
            )
    }
}