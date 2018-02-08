react-d3
=============
结合 [React](https://reactjs.org 'React') 和 [D3.js](https://d3js.org 'D3.js') 写点 demo

在线预览：[请戳](http://show.funlee.cn/react-d3/index.html '在线预览')

技术栈
------
* [React](https://reactjs.org 'React')
* [React Router](https://reacttraining.com/react-router/web/guides/philosophy 'React Router')
* [D3.js](https://d3js.org 'D3.js')

安装
----
```bash
git clone https://github.com/funlee/react-d3.git
cd react-d3
npm install
npm start
```
然后在浏览器里输入：http:localhost:8080 即可访问

踩坑记录
---------
* [Warning!! Accessing PropTypes via the main React package is deprecated](https://doc.react-china.org/docs/typechecking-with-proptypes.html 'PropTypes')

```javascript
// Warning
import React, { Component, PropTypes } from 'react'

// No Warning
import React,{ Component } from 'react'
import PropTypes from 'prop-types'
```
* [Last D3(v4.13.0) publish breaks webpack build](https://github.com/d3/d3/issues/3140 'xmlhttprequest')

solution:

```javascript
// https://github.com/webpack/webpack-dev-server/issues/66
externals:[{
  xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
}]

```

