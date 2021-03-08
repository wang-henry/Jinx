import React from "react";
import { NumberWidget } from "components/widget";
import { Col } from "reactstrap";

const StatisticCard = (props) => {
  const { title, subtitle, number, color, progress } = props;

  return (
    <Col lg={3} md={6} sm={6} xs={12}>
      <NumberWidget
        title={title}
        subtitle={subtitle}
        number={number}
        color={color}
        progress={progress}
      />
    </Col>
  );
};

export default StatisticCard;
