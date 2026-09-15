import React, { useState } from "react"
import AuthorList from "../influencer"

// Research-influences island. The aggregated author list arrives as props
// (build-time, see views/research/influences-data.js); the legend filter
// and the per-author on-demand fetches inside AuthorList stay client-side.

export default function Influences({ influencer, researchAreas }) {
  const [selectedLegend, setSelectedLegend] = useState(null)

  const handleLegendClick = (legend) => {
    // double click resets filter
    if (selectedLegend === legend) {
      resetFilter()
    } else {
      setSelectedLegend(legend)
    }
  }
  const resetFilter = () => { setSelectedLegend(null) }

  // Derive the filtered list based on the selected legend
  const filteredList = (influencer && selectedLegend) ? influencer.filter(item => item.area === selectedLegend) : influencer

  return (
      <div className="ui container">
        <h2 style={{float:'left', display:'inline-block'}}>
          Research Influences
        </h2>

        {
          selectedLegend &&
            <button className="mini ui grey basic button" style={{float:'right'}} onClick={resetFilter}>
              <i className="window close icon"></i>
              Reset Filter
            </button>
        }

        <div className="influences-legend">
          {
            researchAreas.map(obj => (
              <span
                key={obj.area}
                style={{
                  fontWeight: selectedLegend === obj.area ? 'bold' : 'inherit',
                  border: `1px solid ${selectedLegend === obj.area ? 'black' : 'white'}`,
                  marginRight:'1em',
                  marginBottom:'.5em'
                }}
                className={'ui label ra ' + obj.area.replace(" ", "_")}
                onClick={() => handleLegendClick(obj.area)}
              >
                {obj.area} ({obj.count})
              </span>
            ))
          }
        </div>

        <div className="clear">
          <AuthorList list={filteredList} />
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
  )
}
