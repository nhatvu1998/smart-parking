import React, { Component } from 'react'

import { db } from "../firebaseConnect";
import EditTable from './EditTable';
import EditForm from './EditForm';
import SearchForm from './SearchForm';

export default class EditData extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchData:[],
      memberData:[],
      getSearchData:[],
      userEditObject:{},
      editUserStatus:false
    }
  }

  async componentDidMount() {
    const memberData = [];

    // First time fetching
    await db
      .collection("members")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(
          member => (memberData[member.data().RFID] = member.data())
        );
      });
    this.setState({ memberData });

    // Listening for changes only
    await db.collection("members").onSnapshot(qs => {
      qs.docChanges().forEach(change => {
        const data = change.doc.data();

        this.setState({ memberData: { ...memberData, [data.RFID]: data }, searchData:this.state.memberData});
      });
    });    
}


  renderMember = () => {
    
    
      return (
        <table className="table table-striped table-hover">
          <thead className="thead-inverse">
            <tr className="text-center">
              <th>STT</th>
              <th>MSSV</th>
              <th>Họ tên</th>
              <th>Lớp</th>
              <th>Sửa thông tin</th>
            </tr>
          </thead>
          <tbody>{this.printMember()}</tbody>
        </table>
      );
  };
  
   printMember = () => {  
      return Object.values(this.state.getSearchData).map((value, key) => {
        return (
          <EditTable
            key={value.RFID}
            stt={key + 1}
            mssv={value.MSSV}
            name={value.name}
            class={value.class}
            changeEditUserStatus={(user) => this.changeEditUserStatus(value)}
          />
        );
      });
    }

    // show edit form status & get data when click in edit button
  changeEditUserStatus = (user) => {
    this.setState({editUserStatus : !this.state.editUserStatus});       
    this.setState({userEditObject: user});                               
  }

  //Get the data after searching
  getSearchData = (user) => {
    this.setState({getSearchData: user});
  }

  //print edit form
  showEditForm = () => {   
    if (this.state.editUserStatus === true) 
    return <EditForm 
            userEditObject={this.state.userEditObject}
            changeEditUserStatus={() => this.changeEditUserStatus()}/>
  };

  render() {   
    return (
      <div className="col-12">
      <div className="form-group">
        <SearchForm memberData={this.state.searchData} getSearchData={(user) => this.getSearchData(user)}/>
        
        <div className="col-12">
          <hr/>
          {this.showEditForm()}
          {this.renderMember()}
        </div>
      </div>
    </div>
    )
  }
}
