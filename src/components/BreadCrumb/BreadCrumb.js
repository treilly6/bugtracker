import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.js';

class BreadCrumb extends React.Component {
    state={}

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    makeBreadCrumb = (currentPath, projectItem) => {
        console.log("IN THE MAKE BREAD CRUMB FUNCTION");
        if (currentPath[currentPath.length - 1] !== '/') {
            currentPath = currentPath + "/";
        }

        var projectPath = `/projects/${projectItem.id}/`;
        var replacePath = currentPath.replace(projectPath,'');

        if(replacePath[replacePath.length - 1] === '/') {
            console.log("CHOPPING THE END");
            replacePath = replacePath.substring(0, replacePath.length - 1);
        }

        var arraySplitPath = replacePath.split("/");
        var breadCrumb;
        var projectBreadCrumb;
        var projectHomeCrumb = <span><Link className="linkStyle hoverLink" style={{paddingRight : "5px"}} to="/projects">Projects</Link></span>

        if(arraySplitPath.length === 1 && arraySplitPath[0] === '') {
            console.log("NULL RETURN NO MAP");
            breadCrumb = null;
            projectBreadCrumb = <span><span>/</span><span className="bc-content">{projectItem.title}</span></span>;
        } else {
            projectBreadCrumb = <span><span>/</span><Link className="linkStyle hoverLink bc-content" to={projectPath}>{projectItem.title}</Link></span>;
            var folderPath = projectPath;
            var counter = 0;
            breadCrumb = arraySplitPath.map(subfolder => {

                if(subfolder === ''){
                    counter++;
                    return;
                }

                folderPath = folderPath + `${subfolder}/`;
                var breadCrumbLink;
                if(counter === arraySplitPath.length - 1) {
                    breadCrumbLink = <span><span>/</span><span className="bc-content">{subfolder}</span></span>;
                } else {
                    breadCrumbLink = <span><span>/</span><Link className="linkStyle hoverLink bc-content" to={folderPath}>{subfolder}</Link></span>;
                }

                counter++;
                return(breadCrumbLink)
            });
        }

        return(
            <div class="breadCrumb">
                {projectHomeCrumb}{projectBreadCrumb}{breadCrumb}
            </div>
        )
    }

    render(){
        var breadCrumb = this.makeBreadCrumb(this.props.match.url, this.props.projectItem);
        return (breadCrumb);
    }
}


export default BreadCrumb;
