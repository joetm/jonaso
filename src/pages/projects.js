import React from "react"
import { Image, Header, Item, Grid, Container } from 'semantic-ui-react'
import Layout from "../components/layout"
import { spacer } from "../common.js"
import ProjectItem from "../components/ProjectItem"
import { Helmet } from "react-helmet"


const _PROJECTS = 'https://raw.githubusercontent.com/joetm/jonaso/master/src/projects.json'
// const _PUBLICATIONS = 'https://raw.githubusercontent.com/joetm/jonaso/master/public/static/publications.json'


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

// const Banner = (src, alt, title) => <img style={{width:'100%'}} src={src} alt={alt} title={title} />


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
    .then(projects => this.setState({projects}))
    // get publications
    // fetch(_PUBLICATIONS)
    // .then(response => {
    //   if (response.status >= 400) {
    //     throw new Error("Bad response from server: Could not get publications")
    //   }
    //   return response.json()
    // })
    // .then(publications => this.setState({publications}))
  }
  // findPublicationByKey = (key) => {
  //   // get the right publication
  //   let thePub = this.state.publications.filter(pub => {
  //     return pub.id === key
  //   })
  //   thePub = thePub[0]
  //   if (!thePub) {
  //     return
  //   }
  //   console.log(thePub)
  //   return (
  //     <List key={key}>
  //       <List.Item>
  //         <List.Icon name='newspaper' />
  //         <List.Content>{
  //           thePub.URL ?
  //             <a href={thePub.URL}>{thePub.title}</a>
  //             :
  //             `${thePub.title}`
  //         }
  //         </List.Content>
  //       </List.Item>
  //     </List>
  //   )
  // }

/*
      <span>{thePub.author.map(a => <span>{a.family}, {a.given}</span>)}: {thePub.title}. ({thePub.year})
        {thePub.DOI &&
          <span>https://doi.org/{thePub.DOI}</span>
        }
      </span>
*/

      // { (month && year) &&
      //   <List.Item>
      //     <List.Content>{joinIfNotNull([metadata, joinIfNotNull([month, year], ' ')])}</List.Content>
      //   </List.Item>
      // }

  render() {
    const { projects } = this.state
    // const keys = Object.keys(projects).reverse()
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Projects {'//'} jonaso.de</title>
          <link rel="canonical" href="http://www.jonaso.de/projects" />
        </Helmet>
        <Container>
              <Header id="technical-skills" size="huge">Research Projects</Header>

							<p style={spacer}>
                &rarr; To view my web development projects, visit my <a href="https://www.jonaso.de/portfolio/">portfolio</a>.
							</p>

              {
                projects.map(project => {
                	const { title, subtitle, description, date, organisation, organisation_href, funding, img,
                    medium = [], presentations = [], workshops = [] } = project
                  return (
                    <Grid key={`grid_${title}`} style={{marginBottom:'20px'}}>

							        <Container style={{paddingLeft: 0}}>
                      <Grid.Row>
                        <Header>{title}{subtitle ? ` – ${subtitle}` : null}</Header>
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
                                <Header size="small">Medium</Header>
                            }
                            {
                              medium.map((post, i) => <ProjectItem key={`${title}_${i}`} item={post} i={i} /> )
                            }

                            {
                              presentations.length > 0 &&
                                <Header size="small">Presentations</Header>
                            }
                            {
                              presentations.map((pres, i) => <ProjectItem key={`${title}_${i}`} item={pres} i={i} /> )
                            }

                            {
                              workshops.length > 0 &&
                                <Header size="small">Workshops</Header>
                            }
                            {
                              workshops.map((pres, i) => <ProjectItem key={`${title}_${i}`} item={pres} i={i} /> )
                            }

                            {
                              /*
                              publications.length > 0 &&
                                <Header size="small">Publications</Header>
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
