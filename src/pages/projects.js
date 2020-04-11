import React from "react"
import { Image, Header, List, Item, Grid, Container } from 'semantic-ui-react'
import Layout from "../components/layout"
import { spacer } from "../common.js"
// import img_idlab from "../img/idlab.jpg"
// import img_ikon  from "../img/ikon.png"
// import crowdui   from "../img/crowdui-vision.jpg"
// import prodxml   from "../img/prodxml.jpg"
// import kano      from "../img/kano-variation.jpg"
// import sns       from "../img/sns-analysis.png"
// import skillsplanner from "../img/skillsplanner.png"
// import img_cpcw  from "../img/cpcw.jpg"



const _PROJECTS = 'https://raw.githubusercontent.com/joetm/jonaso/master/src/projects.json'


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

const joinIfNotNull = (arr) => arr.filter(val => val ? val : undefined).join(', ')

// const Banner = (src, alt, title) => <img style={{width:'100%'}} src={src} alt={alt} title={title} />

const PresItem = ({pres, i}) => {
  const url = pres.doi ? `http://doi.org/${pres.doi}` : pres.url || null
  return (
    <List key={`presi_${i}`}>
      <List.Item>
        <List.Icon name='newspaper' />
        <List.Content style={{textDecoration: pres.status === 'canceled' ? 'line-through': 'inherit'}}>{
          url ?
            <a href={url}>{pres.title}</a>
            :
            `${pres.title}`
        }
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>{joinIfNotNull([pres.note, pres.conference, pres.location])}, {pres.month} {pres.year}</List.Content>
      </List.Item>
    </List>
  )
}


class Projects extends React.Component {
  state = {
    projects: [],
  }
  componentDidMount = () => {
    // get projects
    fetch(_PROJECTS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(projects => this.setState({projects}))
  }
  render() {
    const { projects } = this.state
    // const keys = Object.keys(projects).reverse()
    return (
      <Layout>
        <Container>
              <Header id="technical-skills" size="huge">Research Projects</Header>

							<p style={spacer}>
                &rarr; To view my web development projects, visit my <a href="http://www.jonaso.de/portfolio/">portfolio</a>.
							</p>

              {
                projects.map(project => {
                	const { title, subtitle, description, date, organisation, organisation_href, funding, img,
                    presentations = [], workshops = [] } = project
                  return (
                    <Grid key={`grid_${title}`} style={{marginBottom:'20px'}}>

							        <Container>
                      <Grid.Row>
                        <Header>{title}{subtitle ? ` – ${subtitle}` : null}</Header>
                      </Grid.Row>
							        </Container>

                      <Grid.Row key={`row_${title}`}>

                        <Grid.Column width={2}>
                        	{date}
                        </Grid.Column>

                        <Grid.Column width={14}>
                        <Item>

                          <div>
                            <CustomImage image={img} />
                          </div>

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
                            <Item.Extra>
                            	<p>{funding}</p>
                            </Item.Extra>

                            {
                              presentations.length > 0 &&
                                <Header size="small">Presentations</Header>
                            }
                            {
                              presentations.map((pres, i) => <PresItem key={`${title}_${i}`} pres={pres} i={i} /> )
                            }

                            {
                              workshops.length > 0 &&
                                <Header size="small">Workshops</Header>
                            }
                            {
                              workshops.map((pres, i) => <PresItem key={`${title}_${i}`} pres={pres} i={i} /> )
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
