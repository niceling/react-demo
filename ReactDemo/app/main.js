import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './components/Component1.jsx';
import Greeter from './components/Greeter';
import './main.css';//ʹ��require����css�ļ�

ReactDom.render(<Component1/>,document.getElementById('content'));


ReactDom.render(<Greeter />, document.getElementById('root'));