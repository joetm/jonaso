import React from "react"
import Link from "gatsby-link"
import { Grid } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Item } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const styles = {
  spacer: {
    height: '5em',
  },
  nonbold: {
    fontWeight: 'normal',
  },
}


class Publications extends React.Component {
    render() {
        return (
            <div>
              <Container>


                  <Grid>

                    <Grid.Row>
                      <Header size="large">2018</Header>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name='file text outline' />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenlaender, J., Benjamin, J.J., M&uuml;ller-Birn, C. (forthcoming): Towards Sociotechnical Management of Intra-Organisational Knowledge Transfer. Multikonferenz Wirtschaftsinformatik (MKWI), Lüneburg, Germany, March 2018</Item.Header>
                        </Item.Content>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Header size="large">2017</Header>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name='file text outline' />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenlaender, J., Benjamin, J.J., M&uuml;ller-Birn, C. (2017): Socio-technical Revelation of Knowledge Transfer Potentials. Poster, Proc. 5th AAAI Conf. Human Computation and Crowdsourcing (HCOMP), Quebec, Canada</Item.Header>
                          <Item.Extra>
                            <List>
                              <List.Item><a href="https://www.humancomputation.com/2017/papers/91-hcomp-paper-final.pdf"><Icon title="pdf" name='file pdf outline' /></a></List.Item>
                            </List>
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name='file text outline' />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenl&auml;nder, J., Gl&ouml;ckler, F., Hoffmann, J., M&uuml;ller-Birn, C. (2017): Bewertung von Reifegradmodellen f&uuml;r ein integriertes Forschungsdatenmanagement für multidisziplin&auml;re Forschungsorganisationen. E-Science-Tage 2017, Heidelberg, Germany</Item.Header>
                        </Item.Content>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Header size="large">2015</Header>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name='file outline' />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenlaender, J. (2015): CrowdUI – A Remote Tool to Crowdsource and Evaluate User Interface Adaptions. Master thesis, unpublished.</Item.Header>
                        </Item.Content>
                        <Item.Meta>
                          <List>
                            <List.Item>Supervisor: Dr Thanassis Tiropanis</List.Item>
                            <List.Item>Second Examiner: Prof Dr Mike Wald</List.Item>
                          </List>
                        </Item.Meta>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Header size="large">2009</Header>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name='file outline' />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenl&auml;nder, J. (2009): Anwendung des Kano-Modells zur Analyse und Charakterisierung gesellschaftlicher Anforderungen an Produkte. Diploma thesis, unpublished</Item.Header>
                        </Item.Content>
                        <Item.Meta>
                          <List>
                            <List.Item>Supervisor: Dr.-Ing. Dirk Hanusch</List.Item>
                            <List.Item>Examiner: Prof. Dr. h.c. Dr.-Ing. Herbert Birkhofer, Institute for Product Development and Machine Elements (pmd)</List.Item>
                          </List>
                        </Item.Meta>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name="file outline" />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenl&auml;nder, J. (2009): Gesch&auml;ftskonzept f&uuml;r ein auf peer-to-peer basierendes Soziales Netzwerk. Seminal paper (Studienarbeit), unpublished</Item.Header>
                        </Item.Content>
                        <Item.Meta>
                          <List>
                            <List.Item>Supervisor: Dr. Kalman Graffi, Dr. Dirk Traiser</List.Item>
                            <List.Item>Examiner: Prof. Dr. Horst Geschka, Dr.-Otto-R&ouml;hm-Stiftungsprofessur f&uuml;r &Uuml;nternehmensgr&uuml;ndung</List.Item>
                          </List>
                        </Item.Meta>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Header size="large">2008</Header>
                    </Grid.Row>


                    <Grid.Row>
                      <Grid.Column width={2}>
                          <Icon color="grey" size="huge" name="file outline" />
                      </Grid.Column>
                      <Grid.Column width={14}>
                      <Item>
                        <Item.Content>
                          <Item.Header>Oppenl&auml;nder, J. (2008): Entwicklung einer Beschreibungssprache f&uuml;r Produktentwicklungsinhalte. Seminal paper (Studienarbeit), unpublished</Item.Header>
                        </Item.Content>
                        <Item.Meta>
                          <List>
                            <List.Item>Supervisor: Dr.-Ing. Harald Weber</List.Item>
                            <List.Item>Examiner: Prof. Dr. h.c. Dr.-Ing. Herbert Birkhofer, Institute for Product Development and Machine Elements (pmd)</List.Item>
                          </List>
                        </Item.Meta>
                      </Item>
                      </Grid.Column>
                    </Grid.Row>

                  </Grid>

                  <div style={styles.spacer}></div>

              </Container>
            </div>
        )
    }
}

export default Publications
