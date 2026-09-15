import 'semantic-ui-css/components/statistic.min.css'
import 'semantic-ui-css/components/progress.min.css'

import React from "react"
import { noMarginGrid } from "../../common"
import { docentship as allRefs } from "../../data/prev-build"

// was a client-side fetch of docentship.json; now resolved at build time
const references = allRefs.filter(o => 'docentship' in o)


export default function Docentship() {
  const published = references.filter(r => r?.howpublished !== 'Pre-prints and Working Papers')
  const firstAuthored = references.filter(r => r?.author.trim().startsWith('Jonas'))
  const validRefs = references.filter(r => published.includes(r))
  const progressPercent = validRefs.length / 10 * 100

  return (
      <div className="ui container">

          <h1 style={{marginBottom: '30px'}}>Docentship Progress {validRefs.length}/10</h1>

            <div className="ui container" id="docentship">

                  <div className="centered margin">
                    <div class="ui progress" data-percent={progressPercent}>
                      <div class="bar" style={{width: `${progressPercent}%`}}>
                        <div class="progress">{progressPercent}%</div>
                      </div>
                    </div>
                  </div>

                  <div class="ui centered grid margin" style={{margin: '2rem auto 2rem auto'}}>
                    <div class="ui statistics middle">
                      <div class="statistic">
                        <div class="value">
                          {references.length}
                        </div>
                        <div class="label">
                          Candidate<br />Papers
                        </div>
                      </div>
                      <div class="statistic">
                        <div class="value">
                          {published.length}
                        </div>
                        <div class="label">
                          Published
                        </div>
                      </div>
                      <div class="statistic">
                        <div class="value">
                          {firstAuthored.length}
                        </div>
                        <div class="label">
                          First-authored
                        </div>
                      </div>
                    </div>
                  </div>

                  {
                    references.map((ref, index) => {
                      const color = ref?.howpublished === 'Pre-prints and Working Papers' ? 'red' : 'black'
                      return (
                        <div className="ui grid" key={index} style={noMarginGrid}>

                            <div className="row">
                              <h3 style={{color}}>{index+1}. {ref?.title}</h3>
                            </div>

                            <div className="row">
                              <div className="one wide column"></div>
                              <div className="fifteen wide column">
                                <div className="item">
                                  <div className="content">
                                    <div>
                                      {ref?.author}
                                    </div>
                                    <div style={{color}} className="header">
                                      {ref?.howpublished}
                                    </div>
                                    <div>
                                      {ref?.journal}
                                    </div>
                                    <div>
                                      {ref?.booktitle}
                                    </div>
                                    <div>
                                      Jufo {ref?.jufo}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                        </div>
                      )
                    })
                  }
                <div className="spacer"></div>
            </div>

      </div>
  )
}
