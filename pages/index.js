import React from 'react';
import { Row, Col, Steps, Button, message } from 'antd';
import StepOne from 'components/step-one-form';
import StepTwo from 'components/step-two-form';
import StepThree from 'components/step-three-form';
const { Step } = Steps;

export default function HomePage() {
  const [current, setCurrent] = React.useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'Profile and Agreement',
      content: <StepOne handleNext={next} />,
    },
    {
      title: 'Membership and Payment',
      content: <StepTwo handleNext={next} />,
    },
    {
      title: 'Finished',
      content: <StepThree handleNext={next} />,
    },
  ];

  return (
    <Row justify="center" style={{ padding: '3rem' }}>
      <Col xs={{ span: 24 }} sm={{ span: 10 }}>
        <Col span={24}>
          <Steps progressDot current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Col>
        <Col span={24}>
          <Row justify="center" style={{ marginTop: 20 }}>
            {steps[current].content}
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
