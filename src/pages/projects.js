import React from "react"
import Link from "gatsby-link"
import { Image, Responsive, Button, Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'
// import "isomorphic-fetch"

import { spacer } from "../common"

import img_idlab from "../img/idlab.jpg"
import img_ikon  from "../img/ikon.png"
import crowdui   from "../img/crowdui-vision.jpg"
import prodxml   from "../img/prodxml.jpg"
import kano      from "../img/kano-variation.jpg"


const CustomImage = ({image}) => {
	console.log(image)
	return <Image
				style={{
					padding:'0 0 20px 0',
					maxHeight: '410px',
					width: 'auto',
					margin: 'auto auto',
				}}
				{...image}
				fluid
			/>
}


const projects = [
  {
  	title: "IKON",
  	lang: "en",
  	description: {__html: "<p>The Natural History Museum in Berlin (Museum für Naturkunde"
  		+ " - Leibniz Institute for Evolution and Biodiversity Science) is the largest of"
  		+ " its kind in Germany and is among the top 10 world-wide."
  		+ " The museum is home to over 30 Mio. collection objects,"
  		+ " more than 250 researchers and more than 400 research assistants"
  		+ " as well as PhD students, from disciplines such as"
  		+ " biology, paleontology, mineralogy and information science.</p>"
  		+ "<p>Behind the publicly accessible spaces, these researchers work"
  		+ " on manyfold projects in a multidisciplinary research setting."
  		+ " To bolster the MfN's efforts at ensuring knowledge transfer throughout"
  		+ " its organisation, we collaborate with the MfN in this BMBF-funded project"
  		+ " to unveil the currently tacit knowledge, competencies, methods and"
  		+ " research project information to the employees of the museum."
  		+ " A formal ontology is developed to support this endeavor.</p>"
  		+ "<p>The project aims to provide the researchers at the museum with"
  		+ " (1) wiki-based read and write access to research project information,"
  		+ " (2) insights about potentials for knowledge transfer powered by linked data and"
  		+ " (3) interactive visualisations of these networked sources of knowledge."
  		+ " Focussing on the seamless integration of these provisions, the project aims"
  		+ " to set up an actionable and holistic system that visualises research project data"
  		+ " and their potential for knowledge transfer in research museums.</p>"},
  	funding: "The project is funded by the Ministry of Education and Research (BMBF).",
  	date: "2017-2018",
  	organisation: "Freie Universität Berlin",
  	organisation_href: "http://www.mi.fu-berlin.de/en/inf/groups/hcc/",
  	url: "http://www.mi.fu-berlin.de/en/inf/groups/hcc/projects/ikon/",
    img: {
      src: img_ikon,
      alt: "",
      title: "",
    },
  },
  {
  	title: "ID+Lab",
  	lang: "en",
  	bwg_description: {__html: "The project «ID+Lab» is dedicated to modeling interdisciplinary research contexts. Its underlying consideration is that the ambiguous category of a discipline does not properly describes research. In fact, the description of interdisciplinary research is approximate only when taking into consideration the variety of specific actors and their connection to each other. Therefore, the so called «ID+Method» generates 11 relevant types of actors, different types of relations as well as rules of modeling. These models create differently compatible clusters of actors, and point out various possibilities and problems of relations - without a need of the discipline as a central category. Within the project, this method of modeling is transformed into a digital modeling tool: the «ID+App». Using the «ID+App», researchers without prior knowledge can model their own research contexts. Thereby, a record of the framework of knowledge production is being produced, contributing to the current debate about Open-Science by disclosing the practices of research. Furthermore, the scientist gains insight about his or her work through modeling: new connecting points are made explicit, showing further project development possibilities. The modeling tool is integrated into the «ID+Stage» - a platform for the publication of interdisciplinary research projects. Therein, various forms of publications should be enabled, which wouldn’t be usual in discipline-specific contexts. All those publications will be published together with their representative «ID+Modeling». Thus, the «ID+Publication» is to be understood not only as a result or an interim status but also as a meta-perspective disclosure of its formation process."},
  	description_old: {__html: "The Cluster of Excellence is a DFG-funded organization comprised of over 36 disciplines. The interdisciplinarity manifests itself in the organization's research output. The researchers produce journal articles, books, physical objects, workshops and exhibitions.</p><p>The ID+Stage is part of a bigger project with three working packages. Firstly, the ID+Method is a theoretic way to model interdisciplinary knowledge spaces. Secondly, the ID+App is a tool to implement the ID+Method and to gather the required data.</p><p>The ID+Stage complements the two working packages by providing a representation of the interdisciplinary knowledge space.</p><p>The ID+Stage aims to provide an insight into the interdisciplinary workings at the Cluster. A knowledge architecture will make disciplinary isolated knowledge accessible to other disciplines. Knowledge structures and barriers will be made visible.</p><p>The ID+Stage aims to provide value to the researchers through the machine-assisted augmentation of research activities.</p><p>An extended concept of publication will open up new perspectives and possibilities for knowledge transfers and to foster interdisciplinary collaboration and new connections.</p><p>The ID+Method and the holistic ID+Model are the theoretic foundation for the two main components of the project: the ID+App for data entry and the ID+Stage for representation of information."},
  	description: {__html: "The aim of the ID+Lab project is to make the interdisciplinary nature of the Cluster \"Image Knowledge Gestaltung\" accessible by raising awareness for existing collaborative work. In this interactive 'enhanced publication' visualization of the interdisciplinary research activities, members of the cluster can explore relations concerning research topics, research objects, used methods, research activities and publications."},
  	funding: "",
  	date: "2016",
  	organisation: "Cluster of Excellency \"Image Knowledge Gestaltung\"",
  	organisation_href: "https://www.interdisciplinary-laboratory.hu-berlin.de/de/content/idlab/",
  	url: "https://www.interdisciplinary-laboratory.hu-berlin.de/en/content/idlab/",
    img: {
      src: img_idlab,
      alt: "",
      title: "",
    },
  },
  {
  	title: "CrowdUI",
  	type: "thesis",
  	lang: "en",
  	subtitle: "A Remote Tool to Crowdsource and Evaluate User Interface Adaptions",
  	description: {__html: "A prototype of a tool that allows the users of a website to re-arrange any parts of the website's user interface (UI). The tool features an integrated user survey. The interface adaptions are stored and loaded for evaluation by a control group of users."},
  	date: "2015",
  	organisation: "University of Southampton",
  	organisation_href: "https://www.southampton.ac.uk/",
  	url: "http://www.crowdui.com/",
    img: {
      src: crowdui,
      alt: "",
      title: "",
    },
  },
  {
  	title: "Anwendung des Kano-Modells zur Analyse und Charakterisierung gesellschaftlicher Anforderungen an Produkte",
  	type: "thesis",
  	lang: "en",
  	description: {__html: ""},
  	date: "2009",
  	organisation: "Technische Universität Darmstadt",
  	organisation_href: "https://www.tu-darmstadt.de/",
  	url: null,
    img: {
      src: kano,
      alt: "",
      title: "",
    },
  },
  {
  	title: "Entwicklung einer XML-basierten Beschreibungssprache für Produktentwicklungsinhalte",
  	type: "studienarbeit",
  	lang: "de",
  	description: {__html: "<p>Zu den Grundaufgaben von Universitäten gehört die Lehre, und damit auch die Erstellung von Lernmaterialien und Vermittlung von Wissen. Im Zuge der sich verstärkenden Vernetzung und der mit dem Internet verbundenen Möglichkeiten wird der Einsatz digitaler Lehr- und Lernmaterialien an Bedeutung zunehmen. Um Inhalte digital verfügbar zu machen, ist eine Interpretation der Dokumente nötig. Erst durch diese Beschreibung der Struktur der Daten kann eine Weiterverarbeitung vorgenommen werden. Dem Lernenden können dabei Inhalte in verschiedenen Darstellungsformen angeboten werden, wie z.B. in Zusammenfassungen und einem Überblick, einem Beispiel oder ausführlich als Textbeschreibung.</p><p>Ziel dieser Arbeit war die Entwicklung einer Beschreibungssprache für Produktentwicklungswissen. Dies bedingte eine intensive Analyse der Inhaltsarten der Produktentwicklung (PE), als auch die Untersuchung bestehender Dokumentbeschreibungssprachen und deren Anwendbarkeit oder eventuelle Erweiterbarkeit in der PE. Die Inhalte der PE wurden klassifiziert und in ein allgemeingültiges Schema übersetzt. Die zu entwickelnde Beschreibungssprache sollte vor allem im Bereich der universitären Lehre zur Anwendung kommen. Jedoch sind auch andere Benutzergruppen denkbar, wie beispielsweise Produktentwickler in Unternehmen. Die Anforderungen, die sich aus dieser Zielsetzung ergeben, machen deutlich, dass ein modularer Aufbau der Inhaltseinheiten die bestmöglichen Resultate zeigt. Verteilt gespeicherte Inhalte erlauben nicht nur die einfache Aktualisierung von Inhalten, sondern auch die situationsbedingte Präsentation der Inhalte beim Benutzer in verschiedenen Formaten."},
  	date: "2008",
  	organisation: "Technische Universität Darmstadt",
  	organisation_href: "https://www.tu-darmstadt.de/",
  	url: null,
    img: {
      src: prodxml,
      alt: "",
      title: "",
    },
  },
]


const Banner = (src, alt, title) => <img style={{width:'100%'}} src={src} alt={alt} title={title} />


class Projects extends React.Component {
  render() {
    const keys = Object.keys(projects).reverse()
    return (
      <div>
        <Container>

              <Header id="technical-skills" size="huge">Research Projects</Header>

								<p style={spacer}>
                &rarr; To view my web development projects, visit my <a href="http://www.jonaso.de/portfolio/">portfolio</a>.
								</p>


              {
                projects.map(project => {
                	const { title, subtitle, description, date, organisation, organisation_href, funding, img } = project
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
      </div>
    )
  }
}

export default Projects
