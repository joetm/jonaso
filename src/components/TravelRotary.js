import React from "react"
import { Header, List } from 'semantic-ui-react'
import { nobottommargin } from '../common'


const TRAVEL = 'https://raw.githubusercontent.com/joetm/jonaso/master/public/travel.json'


class TravelRotary extends React.Component {
  state = {
    rotary: []
  }
  stati = {
    'canceled': 'line-through',
    'running': 'bold',
    'confirmed': 'initial',
  }
  componentDidMount() {
    fetch(TRAVEL)
    .then(response => response.json())
    .then(travel => this.setRotary(travel))
  }
  setRotary(travel) {
    const Now = new Date()

    // convert dates into JavaScript dates
    let rotary = travel.filter(item => ['confirmed','canceled'].indexOf(item.status) > -1).map(item => {
      // date ranges
      if ('start' in item) {
        item.start = new Date(item.start)
      }
      if ('end' in item) {
        item.end = new Date(item.end)
      }
      // single-day events
      if ('date' in item) {
        item.date = new Date(item.date)
      }
      // identify upcoming travel item in the array
      item.dateDiff = Now - (item.start || item.date)
      item.isPast = item.dateDiff > 0 ? true : false
      item.isRunning = false
      if (item.start < Now && Now < item.end) {
        item.isRunning = true
      }
      return item
    })

    // find event with minimum datediff
    let index = 0
    let min = null
    for (let i=0; i < rotary.length; i++) {
      if (min === null) {
        min = Math.abs(rotary[i].dateDiff)
        index = i
      } else {
        if (Math.abs(rotary[i].dateDiff) < min) {
          min = Math.abs(rotary[i].dateDiff)
          index = i
        }
      }
    }

    // show some rows above and below the current travel item
    const sliceMin = index - 5 <= 0 ? 0 : index - 5;
    const sliceMax = index + 6 >= rotary.length ? rotary.length : index + 6;
    rotary = rotary.slice(sliceMin, sliceMax)

    this.setState({ rotary })
  }
  render() {
    const { rotary } = this.state
    return (
      <React.Fragment>
        <Header size="tiny" style={nobottommargin}>Travel</Header>
        {/* / */}
        <List>
            {
                rotary.map(item => {
                  let dateString = ""
                  if ('start' in item && 'end' in item) {
                    dateString = item.start.getDate() + '.-' + item.end.getDate() + '.' + (item.end.getMonth() + 1) + '.' + item.end.getFullYear()
                  }
                  if ('date' in item) {
                    dateString = item.date.getDate() + '.' + (item.date.getMonth() + 1) + '.' + item.date.getFullYear()
                  }
                  return (
                    <List.Item key={item.event}
                      title={item.isRunning ? 'attending' : item.status}
                      style={{
                        color: item.isRunning ? '#008080' : item.isPast ? '#AAAAAA' : '#000000',
                        fontWeight: item.isRunning ? 'bold' : 'inherit',
                        textDecoration: this.stati[item.status],
                        cursor: 'default',
                    }}>
                        <List.Icon
                          name={
                            item.isRunning ? 'marker' : 
                            ['confirmed', 'canceled'].indexOf(item.status) === -1 ? 'calendar' :
                            item.isPast ? 'checkmark' : 'calendar'
                        } />
                        {[item.event,dateString,item.location].join(", ")}
                    </List.Item>
                  );
                })
            }
        </List>
      </React.Fragment>
    )
  }
}


export default TravelRotary
