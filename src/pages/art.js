import 'semantic-ui-css/components/card.min.css'

// import '../masonry.css'

import React from "react"
import { Container, Header, Card, Image, Label } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { spacer } from "../common"
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox"

// responsiveness
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 990,
  },
})


const _ARTWORKS = "/static/artworks/artworks.json"

const styles = {
	breadcrumb: {
		cursor: 'pointer',
	}
}

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
	  			<Image
	  				src={work.thumb}
	  				style={{width: '100%', height: 'auto'}}
	  				loading="lazy"
	  				ui={true} />
	  			</a>
				:
			  	<Image src={work.thumb} wrapped ui={true} />	  		
	  	}
	    	{
	    		work.title && <Card.Content><Card.Header style={{fontWeight:'normal'}}>{work.title}</Card.Header></Card.Content>
	    	}
		    {/*
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
	    			methods.map((m,i) => <Label style={labelsize} key={`l${i}`} tag={i==0 ? true : false}>{m}</Label>)
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
    allartworks: [],
    artworks: [],
    activebreadcrumb: null,
    breadcrumbs: []
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
    	let dates = []
    	artworks.forEach(series => {
    		series.works.forEach(w => {
    			dates.push(`${w.year}-${w.month}`)
    		})
    	})
    	const breadcrumbs = [...new Set(dates)];
    	breadcrumbs.sort()
			this.setState({
				artworks,
				allartworks: artworks,
				breadcrumbs //: ['2021-10', '2021-11']
			})
		})
  }
  handleFilterClick(d) {
  	if (!d) {
  		// reset to all artworks
	  	this.setState({
	  		artworks: this.state.allartworks,
	  		activebreadcrumb: null,
	  	})
  		return
  	}
  	this.setState({
  		artworks: this.state.allartworks.map(series => {
  			const filteredworks = series.works.filter(w => `${w.year}-${w.month}` === d ? w : false)
  			// filter the whole series if empty
  			if (!filteredworks.length) {
	  			return false	
  			}
  			console.log('works', filteredworks)
  			// replace works in series with the filtered ones
  			const out = {...series}
  			out.works = filteredworks
  			return out
  		}),
  		activebreadcrumb: d,
  	})
  }
  render() {
  	const { artworks, activebreadcrumb, breadcrumbs } = this.state
  	// resizing series with only 1 artwork
  	const resizeMapSingle = {
  		"1": 1,
  		"2": 1,
  		"3": 2,
  		"4": 2,
  		"5": 2,
  		"6": 2,
  	}
  	// resizing series with > 1 artworks
  	const resizeMapMultiple = {
  		"1": 1,
  		"2": 2,
  		"3": 2,
  		"4": 2,
  		"5": 2,
  		"6": 2,
  	}
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
		        	<p>I post some more AI-generated artworks on the Twitter account <a href="https://twitter.com/kettlebellz">@kettlebellz</a></p>
		        </section>

	          <div className="spacer" style={spacer}></div>

						<div id="breadcrumbs">
							<span style={{...styles.breadcrumb, fontWeight: activebreadcrumb == null ? 'bold' : 'normal'}}
								onClick={() => this.handleFilterClick(null)}>ALL</span>
							{
								breadcrumbs.map((b,i) => (
									<React.Fragment key={`f${i}`}>
										<span> / </span>
										<span style={{
												...styles.breadcrumb,
												fontWeight: activebreadcrumb === b ? 'bold' : 'inherit'
											}}
											onClick={() => this.handleFilterClick(b)}>{b}</span>
									</React.Fragment>
								))
							}
						</div>

	          <div className="spacer" style={spacer}></div>

	          <SRLWrapper>
		        {
		        	artworks.map((series,s) => series.works ? (
						      <Container key={`s_${s}`}>
										<Header as='h2' textAlign='center' content={series.series} />

                    <MediaContextProvider>
                      <Media at="sm">
							    	    <Card.Group centered itemsPerRow={1}>
					    	    			{series.works && series.works.map((w,i) => <Cardwork key={i} info={w} numtiles={series.numtiles} />)}
											  </Card.Group>
                      </Media>
                      <Media at="md">
							    	    <Card.Group centered itemsPerRow={series.works.length === 1 ? resizeMapSingle[series.numtiles] : resizeMapMultiple[series.numtiles]}>
					    	    			{series.works && series.works.map((w,i) => <Cardwork key={i} info={w} numtiles={series.numtiles} />)}
											  </Card.Group>
                      </Media>
                      <Media greaterThanOrEqual="lg">
							    	    <Card.Group centered itemsPerRow={series.numtiles}>
					    	    			{series.works && series.works.map((w,i) => <Cardwork key={i} info={w} numtiles={series.numtiles} />)}
											  </Card.Group>
                      </Media>
                    </MediaContextProvider>



				            <div className="spacer" style={spacer}></div>
						      </Container>
					  	) : null)
		      	}
		      	</SRLWrapper>
	      </Container>
        </Layout>
        </SimpleReactLightbox>
    )
  }
}


export default ArtPage
