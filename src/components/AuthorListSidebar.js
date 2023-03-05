import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/checkbox.min.css'
import 'semantic-ui-css/components/sidebar.min.css'
import 'semantic-ui-css/components/segment.min.css'

import React from "react"
import { Label, Checkbox } from 'semantic-ui-react'
import { sortByKey } from "../common"


const styles = {
  label: {
    marginBottom: '0.5em',
    marginRight: '1em',
    float:'left',
  },
}


function roundInt(num) {
  return Math.round((num + Number.EPSILON) * 10) / 10
}

// https://stackoverflow.com/a/14810714/426266
Object.map = function(o, f, ctx) {
    ctx = ctx || this;
    var result = {};
    Object.keys(o).forEach(function(k) {
        result[k] = f.call(ctx, o[k], k, o); 
    });
    return result;
}

const Wrapper = {
  KeywordWrapper: ({title, items}) => (
    <div className="ui segment wrapperBox">
      <h4>{title}</h4>
      <div>{items}</div>
      <div style={{clear:'both'}}></div>
    </div>
  ), //
  CoauthorWrapper: ({authorid, toggleCoauthors, coauthorToggleActive, updateActive}) => (
    <div className="ui segment wrapperBox">
      <div>
        <i class="close icon"
          role="button" aria-label="close"
          tabIndex={0}
          title="Close sidebar"
          style={{float:'right', cursor:'pointer'}}
          onClick={() => updateActive({activeid: null, activeAuthors: []})}
          onKeyDown={() => updateActive({activeid: null, activeAuthors: []})}
        ></i>
        <Checkbox checked={coauthorToggleActive} onChange={() => toggleCoauthors(authorid)} label='Show co-authors' toggle />
      </div>
    </div>
  ), //
  PubWrapper: ({title, items, ratio321}) => (
      <div className="ui segment wrapperBox">
        <h4>{title}</h4>
        {
          ratio321 && <div style={{textAlign:'center',cursor:'default'}} title="Ratio">{ratio321}</div>
        }
        <ol style={{marginLeft:0,paddingLeft:0}}>{items}</ol>
      </div>
    ),
}



const DetailContainer = ({authorid, details, keywordClick, activeKeyword, toggleCoauthors, coauthorToggleActive, updateActive}) => {
  // const [visible, setVisible] = React.useState(false)
  const { docs=[], keywords=[] } = details
  // const kwlist = keywords.join(", ")
  const kwlist = keywords.map((kw, i) => (
    <Label
      style={styles.label}
      as="a"
      size={'mini'}
      color={activeKeyword === kw ? 'orange' : 'teal'}
      onClick={(e) => keywordClick(e)}
      key={`kw${i}${authorid}${kw}`}
    >{kw}</Label>
  )) //

  let priocount = {'3': 0, '2': 0, '1': 0, '0': 0}
  const doctotal = docs.length
  docs.forEach(doc => { priocount[""+doc.priority] += 1 })
  priocount = Object.map(priocount, function(v, k, o) {
     return roundInt(v/doctotal * 100)
  });

  const priocolors = {
    '3': 'red',
    '2': 'orange',
    '1': 'brown',
    '0': 'black',
  }
  const ratios = []
  Object.keys(priocolors).reverse().forEach(k => {
    ratios.push(<span class={`ui ${priocolors[k]} label`}>{priocount[k]}%</span>)
  }) //
  const ratio321 = (<span>{ratios}</span>) //

  const publist = sortByKey(docs, 'priority').map((doc, i) => (
          <li className="abbrev" key={`p${i}${authorid}${doc.priority}${doc.title}`}><span class={`ui ${priocolors[doc.priority]} circular label docprio`}>{doc.priority}</span> {doc.title}</li>
      )) //

  return (
    <div className="ui right visible wide sidebar" key={`a-a${authorid}`}>
      <h2 className="ui header" style={{marginTop:'1rem'}}>Author details</h2>
      <Wrapper.CoauthorWrapper authorid={authorid} updateActive={updateActive} toggleCoauthors={toggleCoauthors} coauthorToggleActive={coauthorToggleActive} />
      <Wrapper.KeywordWrapper title="Keywords" items={kwlist} />
      <Wrapper.PubWrapper title="Publications" items={publist} ratio321={ratio321} />
    </div>
  )
} //

export default DetailContainer
