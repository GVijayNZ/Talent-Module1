/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Icon, Image } from 'semantic-ui-react'

export default class PhotoUpload extends Component {


    constructor(props) {
        super(props);
        const image = this.props.imageUrl;
        const profile = this.props.imageName;

        this.selectFileToUpload = this.selectFileToUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        //this.removeFile = this.removeFile.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.maxNoOfFiles = 1;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

        this.state = {
            //selectedFile: [],
            selectedFileName: [],
            //imageSrc: [],
            imageId: [],
            selectedRemoveFileId: [],
            currentNoOfFiles: 0,
            imageSrc: image,
            selectedFile: profile,
            imageSelected:false
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({
                imageSrc: this.props.imageUrl,
                selectedFile: this.props.imageName
            })
            console.log("componentupdatesrc", this.props.imageUrl)
            console.log("componentupdatename", this.props.imageName)
        }

    }

    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }

    fileSelectedHandler(event) {

        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;
        let localImageId = this.state.imageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;
        console.log("imageid from fileselected handler", this.state.imageId);

        localSelectedFile = event.target.files[0];
        localSelectedFileName = event.target.files[0].name;
        localImageSrc = window.URL.createObjectURL(event.target.files[0]);
        localImageId = localImageId;
        localCurrentNoOfFiles = localCurrentNoOfFiles + 1;

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            imageId: localImageId,
            currentNoOfFiles: localCurrentNoOfFiles,
            imageSelected:true
        })
    }


    fileUploadHandler(Id) {
        let data = new FormData();

        data.append("ProfilePhoto", this.state.selectedFile);
        data.append("ProfilePhotoUrl", this.state.imageSrc);
        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,

            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    TalentUtil.notification.show("Image upload successfully", "success", null, null);
                } else {
                    TalentUtil.notification.show("Image not upload", "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
            }
        });
        this.setState({
            imageSelected:false
        })
    }

    render() {
        
        console.log(this.state.imageSrc);
        return (


            <div className="two wide column">


                <input id="selectFile" type="file" onChange={this.fileSelectedHandler} className="inputfile"
                    style={{ display: 'none' }} />
                <label htmlFor="selectFile" className="work-sample-photo">

                    {this.state.selectedFile ?
                        <img src={this.state.imageSrc} className="ui small circular image" />
                        :
                        <i className="ui huge camera retro icon circular"></i>}
                </label>

                <div className="four wide column">
                    {this.state.imageSelected ?
                        <div>
                            <button className="medium ui black button ui upload button" type="button" onClick={this.fileUploadHandler} >
                                <i className="ui upload icon"></i>Upload </button></div>
                        :
                        null}
                </div>


            </div>

        )
    }
}