import React from "react"
import CitationMetrics from "../components/CitationMetrics"
import { referencesDetail as pubs } from "../data/prev-build"
import cits from "../../stat_aggregator/publications-citations.json"

// was two client-side fetches (react-query + useEffect); now build-time
const data = pubs.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)

// scatter plot data
const citations = cits.map((obj, index) => (
  { 'x': index + 1, 'y': parseInt(obj.citations, 10) }
))


function parseTitle(title) {
  // title = title.replace('\\\'{c}', 'ć')
  title = title.replace('\\"a', 'ä')
  title = title.replace('\\"u', 'ü')
  title = title.replace('\\\"u', 'ü')
  title = title.replace('\\"o', 'ö')
  title = title.replace('\{', '')
  title = title.replace('\}', '')
  title = title.replace('{', '')
  title = title.replace('}', '')
  title = title.replace('{', '')
  title = title.replace('}', '')
  return title
}


export default function JufoPage() {
  return (
      <div className="ui container">
        <h1>Jufo Points</h1>
        <section style={{textAlign:'center'}}>
          <p style={{fontSize:'22pt'}}>
            <span>&asymp; {data}</span>
          </p>
        </section>
        <section style={{textAlign:'center'}}>
          <CitationMetrics citation_graph_data={citations} />
        </section>
        {
          pubs.length > 0 &&
            <section style={{textAlign:'center'}}>
              <ul style={{textAlign: 'left'}}>
                {
                  pubs.map(p => <li key={p.title}>
                    {p.jufo}:{' '}
                    {parseTitle(p.title)}
                    {p.booktitle && ' (' + p.booktitle + ')'}
                    </li>)
                }
              </ul>
            </section>
        }
      </div>
  )
}
