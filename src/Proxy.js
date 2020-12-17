import Axios from "axios";
import React, { Component } from "react";

export default class Proxy extends Component {
  componentDidMount() {
    //请求本地文件
    // Axios.get('/data.json').then(res=>{
    //     console.log(res)
    // })

    //后端可以通过CORS解决跨域问题？ 设置响应头字段  Access-Control-Allow-Origin: *
    // Axios.get(
    //   "https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=9847654",
    //   {
    //     headers: {
    //       "X-Client-Info":
    //         '{"a":"3000","ch":"1002","v":"5.0.4","e":"15894678874376571676907"}',
    //       "X-Host": "mall.film-ticket.film.list",
    //     },
    //   }
    // ).then((res) => {
    //   console.log(res);
    // });

    //请求猫眼的数据  前端代理
    Axios.get("https://api.asilu.com/today/").then((res) => {
      console.log(res);
    });
  }

  render() {
    return <div>Proxy</div>;
  }
}
