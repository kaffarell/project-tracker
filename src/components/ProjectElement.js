import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProjectElement.css';
import Modal from 'react-bootstrap/Modal';

class ProjectElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    handleShow = () => {
        this.setState({showModal: true});
    }
    handleClose = () => {
        this.setState({showModal: false});
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
        this.setState({showModal: false});
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
                        <Button onClick={this.handleShow} className="d-flex  justify-content-start" variant="primary">Info</Button>
                    </Card.Body>
                </Card>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
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
                    <Button variant="danger" onClick={this.handleDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )    
    }
}

export default ProjectElement;