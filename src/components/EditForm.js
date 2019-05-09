import React, { Component } from 'react'
import { db } from "../firebaseConnect";




export default class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      rfid:this.props.userEditObject.RFID,
      mssv:this.props.userEditObject.MSSV,
      name:this.props.userEditObject.name,
      class:this.props.userEditObject.class,
      subscribeUntil:this.props.userEditObject.subscribeUntil.toDate(),
      addTime:0,
      inputStatus: true
    }
  }

  saveButton = async () => {
    this.props.changeEditUserStatus();
    var info= {};
    info.RFID = this.state.rfid
    info.MSSV = this.state.mssv
    console.log(new Date().getTime());
    if(this.state.subscribeUntil.getTime() > new Date().getTime())
      info.subscribeUntil = (this.state.subscribeUntil.getTime() + this.state.addTime*60*60*24*1000) ;
    else 
      info.subscribeUntil = (new Date().getTime() + this.state.addTime*60*60*24*1000) ; 
    
    console.log(info.subscribeUntil);
    console.log(new Date(info.subscribeUntil));
    this.setState({subscribeUntil:new Date(info.subscribeUntil)});
    var memberSnapshot = await db.collection("members").where("MSSV", "==", this.state.mssv).get();
    db.collection("members").doc(memberSnapshot.docs[0].id).update({
     RFID:Number(this.state.rfid),
     subscribeUntil: new Date(info.subscribeUntil),
    });
   
   }


  isChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]:value});  
  }
  
  //when rfid == 0 inputStatus=false && readOnly=inputStatus
  async componentWillMount() {
    if(this.state.rfid == 0)
    await this.setState({inputStatus:false});
  }
  
  render() {
   
    return (
      <div className="col-12">
      <div className="card border-primary mb-3">
      <div className="card-header">Sửa thông tin user</div>
      <div className="card-body text-primary">    
        <div className="form-group">
          <input onChange={(event) => this.isChange(event)} type="text" name="name" defaultValue={this.props.userEditObject.name} className="form-control"  aria-describedby="helpId" placeholder="User name"  readOnly/>       
        </div>
        <div className="form-group">
          <input onChange={(event) => this.isChange(event)} type="number" name="rfid" defaultValue={this.props.userEditObject.RFID} className="form-control" aria-describedby="helpId" placeholder="RFID" required readOnly={this.state.inputStatus}/>       
        </div>
        <div className="form-group">
          <input onChange={(event) => this.isChange(event)} type="text" name="mssv" defaultValue={this.props.userEditObject.MSSV} className="form-control" aria-describedby="helpId" placeholder="MSSV" required readOnly/>       
        </div>
        <div className="form-group">
          <input onChange={(event) => this.isChange(event)} type="text" name="addTime" className="form-control" aria-describedby="helpId" placeholder="Nhập số ngày gia hạn" required/>       
        </div>
        <div className="form-group">
          <input type="reset" className="btn btn-block btn-primary" onClick={() => this.saveButton()}  value="Lưu"/>
        </div>
      </div>
    </div> 
    </div>
    )
  }
}
