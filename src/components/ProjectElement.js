import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProjectElement.css';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, InputGroup, FormControl } from 'react-bootstrap';

class ProjectElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalInfo: false,
            showModalEdit: false,
            editTitleText: this.props.title,
            editDescriptionText: this.props.description,
            editMembersText: this.props.members,
        }
    }

    handleShowInfo = () => {
        this.setState({showModalInfo: true});
    }
    handleCloseInfo = () => {
        this.setState({showModalInfo: false});
    }

    handleShowEdit = () => {
        this.setState({showModalEdit: true});
        this.setState({
            editTitleText: this.props.title,
            editDescriptionText: this.props.description,
            editMembersText: this.props.members,
        })
    }
    handleCloseEdit = () => {
        this.setState({showModalEdit: false});
    }

    handleDelete = () => {
        let p = {
            title: this.props.title,
        }
        fetch(window.location.href + 'deleteproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p),
        });
        this.props.update();
        this.setState({showModalEdit: false});
    }

    handleSave = () => {
        // Remove Old project
        let p = {
            title: this.props.title,
        }
        fetch(window.location.href + 'deleteproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p),
        });

        // Add new project
        let p1 = {
            title: this.state.editTitleText,
            description: this.state.editDescriptionText,
            members: this.state.editMembersText,
        }
        fetch(window.location.href + 'newproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p1),
        });

        this.setState({showModalEdit: false});
    }

    updateTitleInput = (evt) => {
        this.setState({
            editTitleText: evt.target.value,
        })
    }

    updateDescriptionInput = (evt) => {
        this.setState({
            editDescriptionText: evt.target.value,
        })
    }

    updateMembersInput = (evt) => {
        this.setState({
            editMembersText: evt.target.value,
        })
    }




    render() {
        return (
            <div className="element">
                <Card>
                    <Card.Body style={{paddingLeft: '30px'}}>
                        <Card.Title className="d-flex justify-content-start">{this.props.title}</Card.Title>
                        <Card.Subtitle className="d-flex justify-content-start mb-2 text-muted">{this.props.members}</Card.Subtitle>

                        <Card.Text className="d-flex  justify-content-start">
                            {this.props.description}
                        </Card.Text>
                        <Container style={{marginLeft: '0px'}}>
                            <Row>
                                <Button onClick={this.handleShowInfo} className="d-flex  justify-content-start" variant="primary">Info</Button>
                                <Button style={{marginLeft: '20px'}} onClick={this.handleShowEdit} className="d-flex  justify-content-start" variant="primary">Edit</Button>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>

                {/* Info Modal*/}
                <Modal show={this.state.showModalInfo} onHide={this.handleCloseInfo}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        <b>Title: </b> {this.props.title}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <b>Members: </b>{this.props.members}<br />
                        <b>Description:</b> {this.props.description}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.handleCloseInfo}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal*/}
                <Modal show={this.state.showModalEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Title: 
                        <InputGroup 
                        value={this.state.editTitleText}
                        onChange={(evt) => this.updateTitleInput(evt)}
                        className="mb-3">
                            <FormControl
                            placeholder="Member names"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Members: 
                        <InputGroup 
                        value={this.state.editMembersText}
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
                        value={this.state.editDescriptionText}
                        onChange={(evt) => this.updateDescriptionInput(evt)}
                        className="mb-3">
                            <FormControl
                            placeholder="Description text"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.handleDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )    
    }
}

export default ProjectElement;