import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/item.min.css'

import React from "react"
import Layout from "../../components/layout"
import { spacer } from "../../common.js"
import ProjectItem from "../../components/ProjectItem"
import { Seo } from "../../components/Seo"


// const _PROJECTS = 'https://raw.githubusercontent.com/joetm/jonaso/master/src/projects.json'
const _PROJECTS = '/static/projects.json'


export function Head() {
  return (
    <Seo title="Projects // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/projects/" />
    </Seo>
  ) //
} 

const CustomImage = ({image}) => (
	<img className="ui fluid image"
		style={{
			padding:'0 0 20px 0',
			maxHeight: '410px',
			width: 'auto',
			margin: 'auto auto',
		}}
    src={image.src}
    title={image.title}
    alt=""
	/>
)


class Projects extends React.Component {
  state = {
    projects: [],
    // publications: [],
  }
  componentDidMount = () => {
    // get projects
    fetch(_PROJECTS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server: Could not get projects")
      }
      return response.json()
    })
    .then(projects => this.setState({ projects }))
  }
  render() {
    const { projects } = this.state
    // const keys = Object.keys(projects).reverse()
    return (
      <Layout>
        <div className="ui container">
              <h1 id="projects">Research Projects</h1>

							<p style={spacer}>
                &rarr; To view my web development projects, visit my <a href="https://www.jonaso.de/portfolio/">portfolio</a>.
							</p>

              {
                projects.map(project => {
                	const { title, subtitle, description, date, organisation, organisation_href, funding, img,
                    medium = [], presentations = [], workshops = [] } = project
                  return (
                    <div className="ui grid" key={`grid_${title}`} style={{marginBottom:'20px'}}>

							        <div className="ui container">
                        <div className="row">
                          <h2>{title}{subtitle ? ` – ${subtitle}` : null}</h2>
                        </div>
							        </div>

                      <div className="row" key={`row_${title}`}>

                        <div className="two wide column">{date}</div>

                        <div className="fourteen wide column">
                        <div className="item">

                          <CustomImage image={img} />

                          <div className="content">
                            <div className="extra">
                              {
                              	organisation_href ?
                              	  <a href={organisation_href}>{organisation}</a>
                              	:
                              	  organisation
                              }
                            </div>
                            <div className="header" dangerouslySetInnerHTML={description}></div>

                            {
                            	funding &&
  	                            <div className="extra">
      	                        	<p>{funding}</p>
          	                    </div>
         	                  }

                            {
                              medium.length > 0 &&
                                <h3>Medium</h3>
                            }
                            {
                              medium.map((post, i) => <ProjectItem key={`${title}_${i}`} item={post} i={i} /> )
                            }

                            {
                              presentations.length > 0 &&
                                <h3>Presentations</h3>
                            }
                            {
                              presentations.map((pres, i) => <ProjectItem key={`${title}_${i}`} item={pres} i={i} /> )
                            }

                            {
                              workshops.length > 0 &&
                                <h3>Workshops</h3>
                            }
                            {
                              workshops.map((pres, i) => <ProjectItem key={`${title}_${i}`} item={pres} i={i} /> )
                            }

                            {
                              /*
                              publications.length > 0 &&
                                <h3>Publications</h3>
                            }
                            {
                              publications.map(pubkey => <div key={pubkey}>
                                  {this.findPublicationByKey(pubkey)}
                                </div> )
                                */
                            }

                          </div>

                        </div>
                        </div>
                      </div>

                    </div>
                  )
                })
              }

            <div style={spacer}></div>

        </div>
      </Layout>
    )
  }
}

export default Projects
