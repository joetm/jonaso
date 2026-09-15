// Build-time construction of the collaboration graph (was fetched +
// computed client-side on /research/network).
import { publications } from "../../data/prev-build"

function buildAuthorname(a) {
  let authorname = a.given + ' ' + (a['dropping-particle'] ? a['dropping-particle'] + ' ' : '') + a.family
  if (authorname === 'Jonas Oppenländer') {
    authorname = 'Jonas Oppenlaender'
  }
  return authorname
}

const uniquenodes = {}
const uniqueedges = {}
const _self = 'Jonas Oppenlaender'

publications.forEach(pub => {
  if (pub.author) {
    pub.author.forEach(a => {
      let authorname = buildAuthorname(a)
      // NODES
      if (!uniquenodes[authorname]) {
        let group = 2
        if (authorname === _self) { group = 1 }
        uniquenodes[authorname] = { id: authorname, group }
      }
      // EDGES
      // edges to all other co-authors of this publication
      if (authorname !== _self) { // skip self
        pub.author.forEach(a2 => {
          let authorname2 = buildAuthorname(a2)
          //skip self
          if (authorname2 !== authorname) {
            if (!uniqueedges[authorname + '-' + authorname2]) {
              uniqueedges[authorname + '-' + authorname2] = { source: authorname, target: authorname2, val: 1 }
            } else {
              uniqueedges[authorname + '-' + authorname2].val += 1
            }
          }
        })
      }
    })
  }
})

export const nodes = Object.values(uniquenodes)
export const edges = Object.values(uniqueedges)
