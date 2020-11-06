import React from 'react';
import {
  Form,
  DatePicker,
  Input,
  Card,
  Button,
  Radio,
  Select,
  Col,
} from 'antd';
const { Option } = Select;
import NumberFormat from 'react-number-format';
import { cc_brand_id } from 'utils/helpers/helper';
const formItemLayout = {
  labelCol: {
    md: {
      span: 24,
    },
    lg: {
      span: 8,
    },
  },
  wrapperCol: {
    md: {
      span: 24,
    },
    lg: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    md: {
      span: 24,
      offset: 0,
    },
    lg: {
      span: 16,
      offset: 8,
    },
  },
};

export default function StepOne({ handleNext, setValues, latestValues }) {
  const [form] = Form.useForm();
  const [CCNumb, setCCNumb] = React.useState(null);
  const onFinish = values => {
    console.log('Received values of form: ', values);
    if (values) {
      setValues({ ...latestValues, ...values });
      handleNext();
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      cc_type: CCNumb ? cc_brand_id(CCNumb).toUpperCase() : '',
    });
  }, [CCNumb]);

  return (
    <Col md={{ span: 24 }} lg={{ span: 16, offset: 4 }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birth"
          label="Date of Birth"
          rules={[
            {
              type: 'object',
              required: false,
              message: 'Please input your date of birth!',
              whitespace: true,
            },
          ]}
        >
          <DatePicker format="DD / MM / YYYY" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please input your gender',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="member_type"
          label="Membership type"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your membership type!',
            },
          ]}
        >
          <Select placeholder="Please select a membership type">
            <Option value="silver">Silver</Option>
            <Option value="gold">Gold</Option>
            <Option value="platinum">Platinum</Option>
            <Option value="black">Black</Option>
            <Option value="vip">VIP</Option>
            <Option value="vvip">VVIP</Option>
          </Select>
        </Form.Item>

        <Col
          xs={{
            span: 24,
            offset: 0,
          }}
          sm={{
            span: 16,
            offset: 8,
          }}
        >
          <Card title="Credit Card Information">
            <Form.Item
              name="cc_number"
              label="Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your CC number!',
                  whitespace: true,
                },
              ]}
            >
              <NumberFormat
                className="ant-input"
                format="#### #### #### ####"
                mask="_"
                onChange={e => setCCNumb(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="cc_type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: 'Please input your CC type!',
                  whitespace: true,
                },
              ]}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              name="cc_exp"
              label="Exp. Date"
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Please input your CC expired date!',
                  whitespace: true,
                },
              ]}
            >
              <DatePicker picker="month" format="MM / YYYY" />
            </Form.Item>
          </Card>
        </Col>
        <br />
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
