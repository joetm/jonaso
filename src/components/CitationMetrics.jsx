import React from "react"
import HIndexGraph from "./h-index-graph"


function calculateHIndex(citations) {
    citations.sort((a, b) => b - a);
    let hIndex = 0;
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= i + 1) {
            hIndex = i + 1;
        } else {
            break;
        }
    }
    return hIndex;
}

function calculateI10Index(citations) {
  const i10 = citations.filter(citation => citation >= 10).length
  return i10
}

function calculateGIndex(citations) {
    citations.sort((a, b) => b - a);
    let sumCitations = 0;
    let gIndex = 0;
    for (let i = 0; i < citations.length; i++) {
        sumCitations += citations[i];
        if (sumCitations >= Math.pow(i + 1, 2)) {
            gIndex = i + 1;
        } else {
            break;
        }
    }
    return gIndex;
}

function calculateEIndex(citations, hIndex) {
    let hCitations = citations
        .sort((a, b) => b - a)
        .slice(0, hIndex)
        .reduce((sum, citation) => sum + citation, 0);
    let surplusCitations = hCitations - Math.pow(hIndex, 2);
    let eIndex = Math.sqrt(surplusCitations);
    return eIndex;
}

function calculateOIndex(citations, hIndex) {
    let maxCitations = Math.max(...citations);
    let oIndex = Math.sqrt(hIndex * maxCitations);
    return oIndex;
}

function calculateRAIndex(citations, hIndex) {
    let sumCitations = citations
        .sort((a, b) => b - a)
        .slice(0, hIndex)
        .reduce((sum, citation) => sum + citation, 0);
    let raIndex = Math.sqrt(sumCitations);
    return raIndex;
}

function calculateWIndex(citations) {
    citations.sort((a, b) => b - a);
    let wIndex = 0;
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= 10 * (i + 1)) {
            wIndex = i + 1;
        } else {
            break;
        }
    }
    return wIndex;
}

function calculateSelfCitationTest(citations, h) {
    let sumCitations = citations.reduce((sum, citation) => sum + citation, 0);
    return h * h / sumCitations;
}


export default function CitationMetrics({ citation_graph_data }) {
  const citations = citation_graph_data.map(data => data.y)
  const hindex = calculateHIndex(citations)
  const i10index = calculateI10Index(citations)
  const currentYear = new Date().getFullYear()
  const mIndex = (hindex / (currentYear - 2017) ).toFixed(2)
  const gIndex = calculateGIndex(citations)
  const eIndex = calculateEIndex(citations, hindex).toFixed(2)
  const oIndex = calculateOIndex(citations, hindex).toFixed(2)
  const RAindex = calculateRAIndex(citations, hindex).toFixed(2)
  const WIndex = calculateWIndex(citations)
  const selfCitationTest = calculateSelfCitationTest(citations, hindex)
  return (
      <div style={{display:'flex', marginBottom: '1rem'}}>
        <div style={{'flex':1,'width':'50%'}}>
          <HIndexGraph citation_graph_data={citation_graph_data} />
        </div>
        <div style={{'flex':1,'width':'50%'}}>
          <div style={{marginTop: '1rem'}} class="ui list">
            <div class="item">
              h-index: {hindex}
            </div>
            <div class="item">
              i10-index: {i10index}
            </div>
            <div class="item">
              m-index: {mIndex}
            </div>
            <div class="item">
              g-index: {gIndex}
            </div>
            <div class="item">
              e-index: {eIndex}
            </div>
            <div class="item">
              o-index: {oIndex}
            </div>
            <div class="item">
              RA-index: {RAindex}
            </div>
            <div class="item">
              W-index: {WIndex}
            </div>
            <div class="item">
              Self-Citation Test: {selfCitationTest}<br />
              Fi-Score: {selfCitationTest * 100}
            </div>
          </div>
        </div>
      </div>
  )
}
