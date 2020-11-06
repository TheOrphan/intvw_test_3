import React, { useState } from 'react';
import { Col, Button, Card, Typography } from 'antd';
const { Title } = Typography;
export default function StepThree() {
  return (
    <Col md={{ span: 24 }} lg={{ span: 16, offset: 4 }}>
      <Card>
        <Title level={2}>Welcome on board!</Title>
        <p>You're account has been successfully registered!</p>
        <p>Dear Captain,</p>
        <p>
          Glad you were here. We would like to take this opportunity to welcome
          you on board. We are committed to providing you the highest possible
          standard of service and we appreciate you placing your trust in us.
        </p>
        <p>
          We will serve while you use our services. Our job is to make sure you
          get full value out of your membership and realize your goals.
        </p>
        <p>To contact us with any questions or issues, you can:</p>
        <ul>
          <li>
            <Title level={4}>Email support@board.com</Title>
          </li>
          <li>
            <Title level={4}>Call +123456789</Title>
          </li>
        </ul>
        <p style={{ textAlign: 'right' }}>Best regards,</p>
        <p style={{ textAlign: 'right' }}>
          <Title level={2}>BOARD</Title>
        </p>
        <Button style={{ marginTop: 14 }} type="primary" block>
          Let's start your journey
        </Button>
      </Card>
    </Col>
  );
}
