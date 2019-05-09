import React, { Component } from "react";

export default class Guest extends Component {
  showTrangThai = () => {
    console.log(this.props.isCurrentlyIn);
    if (this.props.isCurrentlyIn) return <i className="fas fa-check-square In" />;

    return <i className="fas fa-times-circle Out" />;
  };
  render() {
    return (
      <tr className="text-center">
        <td>{this.props.stt}</td>
        <td>{this.props.rfid}</td>
        <td className=" text-center">{this.showTrangThai()}</td>
      </tr>
    );
  }
}
