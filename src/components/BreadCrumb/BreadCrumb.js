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

        if(arraySplitPath.length === 1 && arraySplitPath[0] === '') {
            console.log("NULL RETURN NO MAP");
            breadCrumb = null;
            projectBreadCrumb = <span>{projectItem.title}</span>;
        } else {
            projectBreadCrumb = <span><Link className="linkStyle hoverLink" to={projectPath}>{projectItem.title}</Link></span>;
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
                    breadCrumbLink = <span>/{subfolder}</span>;
                } else {
                    breadCrumbLink = <span>/<Link className="linkStyle hoverLink" to={folderPath}>{subfolder}</Link></span>;
                }

                counter++;
                return(breadCrumbLink)
            });
        }

        return(
            <div>
                {projectBreadCrumb}{breadCrumb}
            </div>
        )
    }

    render(){
        var breadCrumb = this.makeBreadCrumb(this.props.match.url, this.props.projectItem);
        return (breadCrumb);
    }
}

export default BreadCrumb;
