import './App.css';
import React from 'react';
import ProjectList from './components/ProjectList';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            inputTitle: "",
            inputDescription: "",
            inputMembers: ""
        };
    }

    handleCancel = () => {
        this.setState({showModal: false});
        this.setState({
            inputText: "",
            inputDescription: "",
            inputMembers: "",
        });
    }

    handleSave = () => {
        let p = {
            title: this.state.inputTitle,
            description: this.state.inputDescription,
            members: this.state.inputMembers,
        }
        fetch(window.location.href + 'newproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p),
        });

        this.setState({showModal: false});
        this.setState({
            inputText: "",
            inputDescription: "",
            inputMembers: "",
        });
    }

    handleShow = () => {
        this.setState({showModal: true});
    }

    updateTitleInput = (evt) => {
        this.setState({
            inputTitle: evt.target.value,
        })
    }

    updateDescriptionInput = (evt) => {
        this.setState({
            inputDescription: evt.target.value,
        })
    }

    updateMembersInput = (evt) => {
        this.setState({
            inputMembers: evt.target.value,
        })
    }


    render() {

        return (
            <div className="App">
                <div className="list">
                    <ProjectList></ProjectList>
                </div>
                <div className="control">
                    <Button onClick={this.handleShow}>Neues Projekt</Button>

                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>
                            Title: <input value={this.state.inputTitle} 
                            onChange={(evt) => this.updateTitleInput(evt)}></input>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Members: <input value={this.state.inputMembers}
                            onChange={(evt) => this.updateMembersInput(evt)}></input>
                        </Modal.Body>
                        <Modal.Body>
                            Description: <input value={this.state.inputDescription} 
                            onChange={(evt) => this.updateDescriptionInput(evt)}></input>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default App;
