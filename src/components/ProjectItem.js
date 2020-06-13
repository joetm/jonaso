import React from "react"
import { List } from 'semantic-ui-react'

const joinIfNotNull = (arr, sep=', ') => arr.filter(val => val ? val : undefined).join(sep)


const ProjectItem = ({item, i}) => {
  const { title, doi = null, url = null, month = null, year = null } = item
  const theurl = doi ? `http://doi.org/${doi}` : url || null
  const metadata = joinIfNotNull([item.note, item.conference, item.location])
  return (
    <List key={`projectitem_${i}`}>
      <List.Item>
        <List.Icon name='newspaper' />
        <List.Content style={{textDecoration: item.status === 'canceled' ? 'line-through': 'inherit'}}>{
          theurl ?
            <a href={theurl}>{title}</a>
            :
            `${title}`
        }
        </List.Content>
      </List.Item>
      { (metadata || (month && year)) &&
        <List.Item>
          <List.Content>{joinIfNotNull([metadata, joinIfNotNull([month, year], ' ')])}</List.Content>
        </List.Item>
      }
    </List>
  )
}

export default ProjectItem
