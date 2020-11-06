import Router from 'next/router';

import { Typography, Divider } from 'antd';

const { Title } = Typography;

export default function PageUnderConstruction() {
  /**
   * TO DO:
   * Error tidak refresh whole page / layout
   * kecuali content saja
   */

  return (
    <div style={{ marginTop: '10%', marginLeft: '10%' }}>
      <Title>Under Construction</Title>
      <Divider />
      <p>We are very sorry, we are not finish with this page</p>
      <p>Do come back later</p>
      <p>
        <a onClick={() => Router.back()}>Go Back</a>
        <Divider type="vertical" />
        <a onClick={() => Router.reload(window.location.pathname)}>Reload</a>
        <Divider type="vertical" />
        <a onClick={() => Router.push('/')}>Back to home</a>
      </p>
    </div>
  );
}
