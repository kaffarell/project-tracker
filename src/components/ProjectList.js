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
    }

    renderList() {
        let jsxElements = [];
        let elements = this.state.projects;
        for (let i = 0; i < elements.length; i++) {
            jsxElements.push(
                <ProjectElement title={elements[i].title} 
                description={elements[i].description} 
                members={elements[i].members}
                update={this.getProjects}>
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

    componentDidUpdate() {
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