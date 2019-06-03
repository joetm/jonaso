import React from "react"
import { Header, List } from 'semantic-ui-react'


const TRAVEL = 'https://raw.githubusercontent.com/joetm/jonaso/master/public/travel.json'


const styles = {
  notopmargin: {
    marginTop: 0,
  },
  nobottommargin: {
    marginBottom: 0,
  },
  defaultcursor: {cursor: 'inherit'},
}


class TravelRotary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rotary: [],
    }
  }
  componentWillMount() {
    fetch(TRAVEL)
    .then(response => response.json())
    .then(travel => this.setRotary(travel))
  }
  setRotary(travel) {

    const Now = new Date()

    // convert dates into JavaScript dates
    let rotary = travel.filter(item => item.status === 'confirmed').map(item => {
      if ('start' in item) {
        item.start = new Date(item.start)
      }
      if ('end' in item) {
        item.end = new Date(item.end)
      }
      if ('date' in item) {
        item.date = new Date(item.date)
      }
      item.dateDiff = Math.abs(Now - (item.start || item.date))
      item.isPast = (Now - (item.start || item.date)) > 0 ? true : false
      // identify upcoming travel item in the array
      return item
    })

    // find event with minimum datediff
    let index = 0
    let min = null
    for (let i=0; i < rotary.length; i++) {
      if (min === null) {
        min = rotary[i].dateDiff
        index = i
      } else {
        if (rotary[i].dateDiff < min) {
          min = rotary[i].dateDiff
          index = i
        }
      }
    }

    // show two above and one below the current item
    const sliceMin = index - 2 <= 0 ? 0 : index - 2;
    const sliceMax = index + 1 >= rotary.length ? rotary.length : index + 2;
    // console.log(index, sliceMin, sliceMax)
    rotary = rotary.slice(sliceMin, sliceMax)
    // console.log('rotary', rotary);

    this.setState({ rotary })
  }
  render() {
    const { rotary } = this.state
    return (
      <div>

          <Header size="tiny" style={styles.nobottommargin}>Travel</Header>

          <List>
              {
                  rotary.map((item, index) => {
                    let dateString = ""
                    if ('start' in item && 'end' in item) {
                      dateString = item.start.getDate() + '.-' + item.end.getDate() + '. ' + item.end.getMonth() + '. ' + item.end.getFullYear()
                    }
                    if ('date' in item) {
                      dateString = item.date
                    }
                    return (
                      <List.Item key={index} title={item.status} style={{
                        color: item.isPast ? '#AAAAAA' : '#000000',
                      }}>
                          <List.Icon name={item.status === 'confirmed' ? 'checkmark' : 'calendar'} />
                          {[item.event,dateString,item.location].join(", ")}
                      </List.Item>
                    );
                  })
              }
          </List>

      </div>
    )
  }
}

export default TravelRotary
