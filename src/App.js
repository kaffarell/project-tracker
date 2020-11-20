import './App.css';
import React from 'react';
import ProjectList from './components/ProjectList';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


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
                <h2>Aktive Interessensgruppen / Projekte</h2>
                <div className="control">
                    <Button onClick={this.handleShow}>Neues Projekt</Button>

                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>
                            Title: 
                            <InputGroup 
                            value={this.state.inputTitle}
                            onChange={(evt) => this.updateTitleInput(evt)}
                            className="mb-3">
                                <FormControl
                                placeholder="Title name"
                                aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Members: 
                            <InputGroup 
                            value={this.state.inputMembers}
                            onChange={(evt) => this.updateMembersInput(evt)}
                            className="mb-3">
                                <FormControl
                                placeholder="Member names"
                                aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                            <br />
                            Description: 
                            <InputGroup 
                            value={this.state.inputDescription}
                            onChange={(evt) => this.updateDescriptionInput(evt)}
                            className="mb-3">
                                <FormControl
                                placeholder="Description text"
                                aria-describedby="basic-addon2"
                                />
                            </InputGroup>
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
                <div className="list">
                    <ProjectList className="projectlist"></ProjectList>
                </div>
            </div>
        );
    }
}
export default App;
