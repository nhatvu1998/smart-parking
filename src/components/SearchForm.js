import React, { Component } from 'react'

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      tempValue:'',
      memberData:''
    }
  }

  
  isChange = (event) => {
    this.setState({tempValue:event.target.value});
    
  }
  //find and save data in props at EditData.js
  searchButton = () => {
    
    var ketqua = []
    Object.values(this.props.memberData).map((value, key) =>{
      console.log(value.name);
      if (value.name.toLocaleLowerCase().indexOf(this.state.tempValue.toLocaleLowerCase())!==-1 || value.MSSV.indexOf(this.state.tempValue)!==-1)
        ketqua.push(value);
    })
    console.log(ketqua)
   
    this.props.getSearchData(ketqua);
  }

  render() {
    return (
      <div className="btn-group">
        <input type="text" className="form-control"  onChange={(event) => this.isChange(event)} style={{width: '600px'}} placeholder="Tìm kiếm theo tên hoặc MSSV" />
        <div className="btn btn-info" onClick={() => this.searchButton()}  >Tim</div>
      </div>
    )
  } 
}
