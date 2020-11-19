import ProjectElement from './ProjectElement';
import React from 'react';
import Project from '../model/project';
import './ProjectList.css'

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }

        // Example values
        /*
        let p1 = new Project("Arduino", "Arduino electronic stuff", "Johannes, Luca");
        let p2 = new Project("raspberry pi", "Alles sochen mit n rospberry", "Daniel, Peter");
        let p3 = new Project("Rust", "Alles über der Sprache Rust", "Gabriel");
        let p4 = new Project("Java", "Alles über Java", "Tobias, Lukas");
        let newArray = this.state.projects;
        newArray.push(p1);
        newArray.push(p2);
        newArray.push(p3);
        newArray.push(p4);
        this.setState({projects: newArray});
        */
    }

    renderList() {
        let jsxElements = [];
        let elements = this.state.projects;
        for (let i = 0; i < elements.length; i++) {
            jsxElements.push(
                <ProjectElement title={elements[i].title} description={elements[i].description} members={elements[i].members}>
                </ProjectElement>
            )
        }
        return jsxElements;
    }

    getProjects() {
        let processedArray = [];
        fetch('http://localhost:3000/getprojects')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                for(let i = 0; i < data.length; i++) {
                    let p = new Project(data[i].title, data[i].description, data[i].members);
                    processedArray.push(p);
                }
                this.setState({projects: processedArray});
                this.renderList();
            })
            .catch((error) => console.log(error)); 
        
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        return (
            <div className="projectlist">
                <h2>Aktive Interessensgruppen / Projekte</h2>
                {this.renderList()}
            </div>
        )
    }
}

export default ProjectList;