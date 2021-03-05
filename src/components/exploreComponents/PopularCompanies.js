import React from 'react';
import { Container, CardBody, CardHeader, Col, Row, Table, CardTitle } from 'reactstrap';
import { FaShoppingBag, FaFile, FaMicrophone, FaMoneyBill, FaEllipsisH} from 'react-icons/fa';
import ExploreCell from 'components/exploreComponents/ExploreCell';


const PopularCompanies = ({ companies }) => {
  return (
    <Container>
      <Row>
        <h2 className="text-info font-weight-300">Popular Companies</h2>
      </Row>
      <Row className="pl-2">
        <p>Employers with the most jobs</p>
      </Row>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {companies && companies.map(({ name, description, background, logo }, index) => {
            return (
              <ExploreCell name={name} description={description} background={background} logo={logo} />
            )
          })}
        </div>
    </Container>
  )
}

export default PopularCompanies;