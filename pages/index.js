import React from 'react';
import { Row, Col, Steps, Button, message } from 'antd';
import StepOne from 'components/step-one-form';
import StepTwo from 'components/step-two-form';
import StepThree from 'components/step-three-form';
const { Step } = Steps;

export default function HomePage() {
  const [current, setCurrent] = React.useState(0);
  const [latestValues, setValues] = React.useState({});
  const next = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'Profile and Agreement',
      content: <StepOne handleNext={next} setValues={setValues} />,
    },
    {
      title: 'Membership and Payment',
      content: (
        <StepTwo
          handleNext={next}
          setValues={setValues}
          latestValues={latestValues}
        />
      ),
    },
    {
      title: 'Finished',
      content: <StepThree handleNext={next} latestValues={latestValues} />,
    },
  ];

  return (
    <Row>
      <Col
        md={{ span: 24 }}
        lg={{ span: 20, offset: 2 }}
        style={{ width: 'auto', maxWidth: 'unset' }}
      >
        <div style={{ padding: '3rem 0 0' }}>
          <Steps progressDot current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div style={{ margin: '3rem 1.5rem' }}>{steps[current].content}</div>
        </div>
      </Col>
    </Row>
  );
}
