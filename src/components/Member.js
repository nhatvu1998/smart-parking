import React, { Component } from "react";
import moment from "moment";

export default class Member extends Component {
  showTrangThai = () => {
    //console.log(this.props.isCurrentlyIn);
    if (this.props.isCurrentlyIn) return <i className="fas fa-check-square In" />;

    return <i className="fas fa-times-circle Out" />;
  };
  render() {
    return (
      <tr className="text-center">
        <td>{this.props.stt}</td>
        <td>{this.props.mssv}</td>
        <td>{this.props.name}</td>
        <td>{this.props.class}</td>
        <td>{this.props.plate}</td>
        <td className=" text-center">{this.showTrangThai()}</td>
        <td>{moment(this.props.lastActivity.toDate()).fromNow()}</td>
      </tr>
    );
  }
}
