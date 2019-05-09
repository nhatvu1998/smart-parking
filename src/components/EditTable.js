import React, { Component } from 'react'

export default class EditTable extends Component {

  
  editAction = () => {
    this.props.changeEditUserStatus();
  }

  
      
  render() {
    return (
      <tr className="text-center">
        <td>{this.props.stt}</td>
        <td>{this.props.mssv}</td>
        <td>{this.props.name}</td>
        <td>{this.props.class}</td>
        <td>
          <div className="btn btn-warning"  onClick={() => this.editAction()}> <i className="fa fa-edit">Edit</i></div>
        </td>
      </tr>
      );
    }
  }

