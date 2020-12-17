import React, { Component } from "react";
import axios from "axios";
export default class TodoList extends Component {
  state = {
    list: [],
    username: "",
    age: 0,
  };

  //可以进行异步请求
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    //调用get这个方法 （restfulapi : get/post/patch/delete等）
    axios.get("http://localhost:4000/list").then((res) => {
      this.setState({
        list: res.data,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  add = () => {
    axios
      .post("http://localhost:4000/list", {
        username: this.state.username,
        age: this.state.age,
      })
      .then((res) => {
        //需要重新请求
        this.getData();
      });
  };

  //删除操作
  delete = (id) => {
    axios.delete("http://localhost:4000/list/" + id).then((res) => {
      this.getData();
    });
  };

  //更新
  update = ({ username, age, id }) => {
    let value = prompt("输入修改的值", username + "," + age);
    let arr = value.split(",");
    axios
      .patch("http://localhost:4000/list/" + id, {
        username: arr[0],
        age: arr[1],
      })
      .then((res) => {
        this.getData();
      });
  };

  //模糊查询
  blur = () => {
    let keyword = prompt("请输入查询的用户名关键字！");
    axios
      .get("http://localhost:4000/list?username_like=" + keyword)
      .then((res) => {
        this.setState({
          list: res.data,
        });
      });
  };

  render() {
    let { list, username, age } = this.state;
    return (
      <div>
        <input
          id="username"
          type="text"
          value={username}
          onChange={this.handleChange}
        />
        <input
          id="age"
          type="number"
          value={age}
          onChange={this.handleChange}
        />
        <button onClick={this.add}>添加</button>
        <button onClick={this.blur}>模糊查询</button>
        <button
          onClick={() => {
            this.getData();
          }}
        >
          返回
        </button>
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                {item.username} {item.age}
                <button onClick={this.delete.bind(this, item.id)}>删除</button>
                <button onClick={this.update.bind(this, item)}>更新</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
