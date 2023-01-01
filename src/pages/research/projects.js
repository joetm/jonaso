import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/item.min.css'

import React from "react"
import { Image, Item, Grid, Container } from 'semantic-ui-react'
import Layout from "../../components/layout"
import { spacer } from "../../common.js"
import ProjectItem from "../../components/ProjectItem"
import { Seo } from "../../components/Seo"


// const _PROJECTS = 'https://raw.githubusercontent.com/joetm/jonaso/master/src/projects.json'
const _PROJECTS = '/static/projects.json'


export function Head() {
  return (
    <Seo title="Projects // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/projects" />
    </Seo>
  ) //
} 

const CustomImage = ({image}) => (
	<Image
		style={{
			padding:'0 0 20px 0',
			maxHeight: '410px',
			width: 'auto',
			margin: 'auto auto',
		}}
		{...image}
		fluid
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
        <Container>
              <h1 id="projects">Research Projects</h1>

							<p style={spacer}>
                &rarr; To view my web development projects, visit my <a href="https://www.jonaso.de/portfolio/">portfolio</a>.
							</p>

              {
                projects.map(project => {
                	const { title, subtitle, description, date, organisation, organisation_href, funding, img,
                    medium = [], presentations = [], workshops = [] } = project
                  return (
                    <Grid key={`grid_${title}`} style={{marginBottom:'20px'}}>

							        <Container>
                      <Grid.Row>
                        <h2>{title}{subtitle ? ` – ${subtitle}` : null}</h2>
                      </Grid.Row>
							        </Container>

                      <Grid.Row key={`row_${title}`}>

                        <Grid.Column width={2}>{date}</Grid.Column>

                        <Grid.Column width={14}>
                        <Item>

                          <CustomImage image={img} />

                          <Item.Content>
                            <Item.Extra>
                              {
                              	organisation_href ?
                              	  <a href={organisation_href}>{organisation}</a>
                              	:
                              	  organisation
                              }
                            </Item.Extra>
                            <Item.Header dangerouslySetInnerHTML={description}></Item.Header>

                            {
                            	funding &&
	                            <Item.Extra>
    	                        	<p>{funding}</p>
        	                    </Item.Extra>
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

                          </Item.Content>

                        </Item>
                        </Grid.Column>
                      </Grid.Row>

                    </Grid>
                  )
                })
              }

            <div style={spacer}></div>

        </Container>
      </Layout>
    )
  }
}

export default Projects
