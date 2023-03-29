"use client"

import React from "react"


const TRAVEL = 'https://raw.githubusercontent.com/joetm/jonaso/master/public/travel.json'


const Now = new Date()

function processRotary(travel) {
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
  const sliceMin = index - 3 <= 0 ? 0 : index - 3;
  const sliceMax = index + 3 >= rotary.length ? rotary.length : index + 3;
  rotary = rotary.slice(sliceMin, sliceMax)
  return rotary
}


export default function TravelRotary() {
  const [rotary, updateRotary] = React.useState([])
  const stati = {
    'canceled': 'line-through',
    'running': 'bold',
    'confirmed': 'initial',
  }

  const getTravel = async () => {
    try {
      const res = await fetch(TRAVEL)
      const travel = await res.json()
      updateRotary( processRotary(travel) )
    } catch (err) {
      console.error("Error fetching travel.json")
    }
  }

  React.useEffect(() => {
    getTravel()
  }, [])

  if (!rotary.length) return null

  return (
    <>
      <strong>Travel</strong>
      <div role="list" className="ui list" style={{marginTop: "0px"}}>
          {
            rotary.map(item => {
              let dateString = ""
              if ('start' in item && 'end' in item) {
                dateString = item.start.getDate() + '.-' + item.end.getDate() + '.' + (item.end.getMonth() + 1) + '.' + item.end.getFullYear()
              }
              else if ('date' in item) {
                dateString = item.date.getDate() + '.' + (item.date.getMonth() + 1) + '.' + item.date.getFullYear()
              }
              let icnName = item.isRunning ? 'marker' : ['confirmed', 'canceled'].indexOf(item.status) === -1 ? 'calendar' : item.isPast ? 'checkmark' : 'calendar'
              icnName = icnName + " icon"
              return (
                <div role="listitem"
                  key={item.event}
                  className="item"
                  title={item.isRunning ? 'attending' : item.status}
                  style={{
                    color: item.isRunning ? '#008080' : item.isPast ? '#AAAAAA' : '#000000',
                    fontWeight: item.isRunning ? 'bold' : 'inherit',
                    textDecoration: stati[item.status],
                    cursor: 'default',
                  }}>
                    <i aria-hidden="true" className={icnName}></i>{[item.event,dateString,item.location].join(", ")}
                </div>
              )
            })
          }
      </div>
    </>
  )
}
