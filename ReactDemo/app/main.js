import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './components/Component1.jsx';
import Greeter from './components/Greeter';
import './main.css';//使用require导入css文件

ReactDom.render(<Component1/>,document.getElementById('content'));


ReactDom.render(<Greeter />, document.getElementById('root'));