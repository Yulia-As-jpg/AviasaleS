import { Checkbox } from 'antd';
import styled from 'styled-components';

const CheckboxStyles = styled(Checkbox)`
  .ant-checkbox-inner {
    background-color: #FFFFFF; 
    border-color: #2196F3; 
    width: 20px;
    height: 20px;
  }
  .ant-checkbox .ant-checkbox-inner:after {
  border-color: #2196F3;
  width: 8px;
  height: 12px;
  }
  .ant-checkbox+span {
    padding-inline-start: 10px;
    color: #4A4A4A;
    font-size: 13px;
  }
`

export default CheckboxStyles;

