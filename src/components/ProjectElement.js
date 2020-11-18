import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ProjectElement.css';

class ProjectElement extends React.Component {
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
                        <Button className="d-flex  justify-content-start" variant="primary">Info</Button>
                    </Card.Body>
                    </Card>
            </div>
        )    
    }
}

export default ProjectElement;