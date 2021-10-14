import 'semantic-ui-css/components/card.min.css'

import React from "react"
import { Container, Header, Card, Image, Label } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { spacer } from "../common"

// const styles = {}
// const _ARTWORKS = "http://localhost:8000/public/artworks.json"

const artworks = [
	{
		"series": "Abstract Skulls",
		"numtiles": 2,
		"works": [
		  {
		    "title": "",
		    "input": "Abstract skull puking, painting by Maciej Drabik, trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-3/50.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "skull puking, painting by Maciej Drabik, trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-5/100.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "Abstract skull puking, painting by Maciej Drabik trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-2/250.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "Abstract skull by Maciej Drabik trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-1/314.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "Abstract skull puking rain, painting by Maciej Drabik, trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-4/50.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "Abstract skull puking, painting by Maciej Drabik, trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-3/850.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "a skull puking colors, painting by Maciej Drabik, trending on artstation",
		    "thumb": "/static/artworks/vqganclip/skulls/run-7/250.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
	  ]
	},
	{
		"series": "Movie themes",
		"method": "vqgan+clip",
		"numtiles": 2,
		"works": [
		  {
		    "title": "Mad Max Ferrari",
		    "input": "Mad Max ferrari by Abimelec Arellano",
		    "thumb": "/static/artworks/vqganclip/madmax/ferrari/run-1/0057.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "src": null,
		    "initial": false,
		    "target": false,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "Mad Max Ferrari",
		    "input": "Mad Max ferrari by Abimelec Arellano",
		    "thumb": "/static/artworks/vqganclip/madmax/ferrari/run-2/100.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "src": null,
		    "initial": false,
		    "target": false,
		    "date": "Oct, 2021"
		  }
		]
	},
	{
		"series": "Cthulhu",
		"numtiles": 4,
		"works": [
		  {
		    "title": "",
		    "input": "cthulhu swallows earth by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/0/150.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu swallows earth by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-1/250.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu swallows earth by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-2/200.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu reaches for earth by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-7/300.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu holds planet earth in his hand by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-8/50.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu holds planet earth in his hand by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-9/50.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu holds planet earth in his hand by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-9/100.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		  {
		    "title": "",
		    "input": "cthulhu holds planet earth in its hand by greg rutkowski",
		    "thumb": "/static/artworks/vqganclip/cthulhu/run-10/450.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": true,
		    "src": null,
		    "date": "Oct, 2021"
		  },
		]
	},
	{
		"series": "Abstract",
		"method": "vqgan+clip",
		"numtiles": 1,
		"works": [
		  {
		    "title": "A",
		    "input": "Red, Green, Orange by Karl Benjamin",
		    "thumb": "/static/artworks/vqganclip/abstract/redgreenorange/50.png",
		    "method": "vqgan+clip",
		    "model": "wikiart_16384",
		    "src": null,
		    "initial": false,
		    "target": false,
		    "date": "Oct, 2021"
		  }
		]
	},
	{
		"series": "Vaporwave",
		"method": "vqgan+clip",
		"numtiles": 2,
		"works": [
		  {
		    "title": "Patriotic sunset",
		    "input": "vaporwave sunset #80s #retro",
		    "thumb": "/static/artworks/vqganclip/vaporwave/sunset/350.png",
		    "method": "VQGAN+CLIP",
		    "model": "wikiart_16384",
		    "initial": false,
		    "target": false,
		    "src": null,
		    "date": "Oct, 2021"
		  }
		]
	},
]

function Cardwork(w) {
	const work = w.info 
	return (
	  <Card>
	  <Image src={work.thumb} wrapped ui={false} />
	    <Card.Content>
	      <Card.Header>{work.title}</Card.Header>
	      <Card.Meta>
	        <span className='date'>{work.date}</span>
	      </Card.Meta>
		    {/*
	      <Card.Description>
	        &quot;{work.input}&quot;
	      </Card.Description>
				*/}
	    </Card.Content>
	    <Card.Content extra>
			    <Label as='a' tag>{work.method}</Label>
			    <Label>{work.model}</Label>
			    {work.initial && <Label>initial</Label>}
			    {work.target  && <Label>target</Label>}
	    </Card.Content>
	  </Card>
	)
}

class ArtPage extends React.Component {
  // state = {
  //   artworks: [],
  // }
  // componentDidMount = () => {
  //   // get artworks
  //   fetch(_ARTWORKS)
  //   .then(response => {
  //     if (response.status >= 400) {
  //       throw new Error("Bad response from server: Could not get projects")
  //     }
  //     return response.json()
  //   })
  //   .then(artworks => {
  //   	console.log('artworks', artworks)
		// 	this.setState({artworks})
		// })
  // }
  render() {
    return (
	   	<Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>AI-generated Art {'//'} jonaso.de</title>
          <link rel="canonical" href="http://www.jonaso.de/art" />
        </Helmet>
	      <Container>
					<Header as='h1' textAlign='center' content="AI-generated Artworks" />
		        <section style={{textAlign:'center'}}>
		        	<p>All credits go to Katherine Crowson (<a href="https://twitter.com/RiversHaveWings">@RiversHaveWings</a>)
		        		for creating the VQGAN+CLIP Colab notebook
		        		<br />
		        		(and Ryan Murdock <a href="https://twitter.com/advadnoun">@advadnoun</a> for coming up with the original BigGAN+CLIP method).
		        	</p>
		        	<p>For now, I just dabble on here with different textual input prompts, initial images, and target images.</p>
		        </section>
	          <div className="spacer" style={spacer}></div>
		        {artworks.map((series,s) => {
		        	return (
					      <Container key={s}>
									<Header as='h2' textAlign='center' content={series.series} />
				    	    <Card.Group itemsPerRow={series.numtiles}>
		    	    			{series.works.map((w,i) => <Cardwork key={i} info={w} />)}
								  </Card.Group>
			            <div className="spacer" style={spacer}></div>
					      </Container>
					    )
		        })}
	      </Container>
        </Layout>
    )
  }
}


export default ArtPage
