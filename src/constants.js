
const prod = {
  _REFERENCES_PER_YEAR: "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references.json",
  _REFERENCES_PER_TYPE: "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references-type.json",
}

const dev = {
  _REFERENCES_PER_YEAR: "http://localhost:8000/static/references.json",
  _REFERENCES_PER_TYPE: "http://localhost:8000/static/references-type.json",
}

export const config = process.env.NODE_ENV === "development" ? dev : prod
