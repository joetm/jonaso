import 'semantic-ui-css/components/card.min.css'

// import '../masonry.css'

import React from "react"
import { Container, Header, Card, Image, Label } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { spacer } from "../common"
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox"

const _ARTWORKS = "/static/artworks/artworks.json"


function Cardwork(w) {
	const work = w.info
	const numtiles = w.numtiles
	const labelsize = numtiles >= 3 ? {fontSize:".6em"} : {}
	let methods = []
	if (work.method instanceof Array) {
		methods = work.method
	} else {
		methods.push(work.method)
	}
	return (
	  <Card>
	  	{
	  		work.src ?
	  			<a href={work.src}>
	  			<Image src={work.thumb} ui={true} />
	  			</a>
				:
			  	<Image src={work.thumb} wrapped ui={true} />	  		
	  	}
		    {/*
		    <Card.Content>
	    	{
	    		work.title && <Card.Header>{work.title}</Card.Header>
	    	}
	      <Card.Meta>
	        <span className='date'>{work.date}</span>
	      </Card.Meta>
	      <Card.Description>
	        &quot;{work.input}&quot;
	      </Card.Description>
		    </Card.Content>
				*/}
	    <Card.Content extra>
	    		{
	    			methods.map((m,i) => <Label style={labelsize} as={i==0 ? 'a' : false} tag={i==0 ? true : false}>{m}</Label>)
	    		}
			    <Label style={labelsize}>{work.model}</Label>
			    {work.initial && <Label style={labelsize}>initial</Label>}
			    {work.target  && <Label style={labelsize}>target</Label>}
	    </Card.Content>
	  </Card>
	)
} //

class ArtPage extends React.Component {
  state = {
    artworks: [],
  }
  componentDidMount = () => {
    // get artworks
    fetch(_ARTWORKS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server: Could not get projects")
      }
      return response.json()
    })
    .then(artworks => {
			this.setState({artworks})
		})
  }
  render() {
  	const { artworks } = this.state
    return (
    	<SimpleReactLightbox>
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
		        		(and Ryan Murdock <a href="https://twitter.com/advadnoun">@advadnoun</a> for coming up with the original BigSleep (BigGAN+CLIP) implementation).
		        	</p>
		        	<p>For now, I just experiment with different textual input prompts, initial images, and target images.</p>
		        </section>
	          <div className="spacer" style={spacer}></div>
	          <SRLWrapper>
		        {
		        	artworks.map((series,s) => (
						      <Container key={s}>
										<Header as='h2' textAlign='center' content={series.series} />
					    	    <Card.Group centered itemsPerRow={series.numtiles}>
			    	    			{series.works.map((w,i) => <Cardwork key={i} info={w} numtiles={series.numtiles} />)}
									  </Card.Group>
				            <div className="spacer" style={spacer}></div>
						      </Container>
					  	))
		      	}
		      	</SRLWrapper>
	      </Container>
        </Layout>
        </SimpleReactLightbox>
    )
  }
}


export default ArtPage
