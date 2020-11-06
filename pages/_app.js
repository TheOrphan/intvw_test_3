import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import 'moment/locale/id';

moment.locale('id');

function MainApp(props) {
  return <div>Hello World</div>;
}

export default function App(props) {
  return <MainApp {...props} />;
}
