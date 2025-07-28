import React from "react"
import { joinIfNotNull } from '../common'


export default function ProjectItem({item, i}) {
  const { title, doi = null, url = null, month = null, year = null } = item
  const theurl = doi ? `http://doi.org/${doi}` : url || null
  const metadata = joinIfNotNull([item.note, item.conference, item.location])
  return (
    <div role="list" className="ui list" key={`projectitem_${i}`}>
      <div role="listitem" className="item">
        <i aria-hidden="true" className="newspaper icon"></i>
        <div className="content" style={{textDecoration: item.status === 'canceled' ? 'line-through' : 'inherit'}}>
          {
            theurl ?
              <a href={theurl} target="_blank">{title}</a>
              :
              `${title}`
          }
        </div>
      </div>
      {
        (metadata || (month && year)) &&
          <div role="listitem" className="item">
            <div className="content">{joinIfNotNull([metadata, joinIfNotNull([month, year], ' ')])}</div>
          </div>
      }
    </div>
  )
}
