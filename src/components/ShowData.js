import React, { Component } from 'react'
import { db } from "../firebaseConnect";
import Member from "./Member";
import Guest from "./Guest";

export default class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state={
    memberData: [],
    guestData: [],
    showMember: true,
    showGuest: false,
    }
  }
  printMember = () => {
    if (this.state.memberData !== null) {
      return Object.values(this.state.memberData).map((value, key) => {
        return (
          <Member
            key={value.RFID}
            stt={key + 1}
            mssv={value.MSSV}
            name={value.name}
            class={value.class}
            plate={value.plate}
            lastActivity={value.lastActivity}
            isCurrentlyIn={value.isCurrentlyIn}
          />
        );
      });
    }
     
    }


  printGuest = () => {
    if (this.state.guestData !== null) {
      return Object.values(this.state.guestData).map((value, key) => {
        return (
          <Guest
            key={value.RFID}
            stt={key + 1}
            rfid={value.RFID}
            isCurrentlyIn={value.isCurrentlyIn}
          />
        );
      });
    }
  };

  async componentDidMount() {
    const memberData = [];
    const guestData = [];

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

        this.setState({ memberData: { ...memberData, [data.RFID]: data } });
      });
    });

    // First time fetching
    await db
      .collection("guests")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(
          guest => (guestData[guest.data().RFID] = guest.data())
        );
      });
    this.setState({ guestData });

    // Listening for changes only
    await db.collection("guests").onSnapshot(qs => {
      qs.docChanges().forEach(change => {
        const data = change.doc.data();

        this.setState({ guestData: { ...guestData, [data.RFID]: data } });
      });
    });
    
  }

  renderMember = () => {
    if (this.state.showMember === true)
      return (
        <table className="table table-striped table-hover">
          <thead className="thead-inverse">
            <tr className="text-center">
              <th>STT</th>
              <th>MSSV</th>
              <th>Họ tên</th>
              <th>Lớp</th>
              <th>Biển số xe</th>
              <th>Trạng thái</th>
              <th>Hoạt động cuối</th>
            </tr>
          </thead>
          <tbody>{this.printMember()}</tbody>
        </table>
      );
  };

  renderGuest = () => {
    if (this.state.showGuest === true)
      return (
        <table className="table table-striped table-hover">
          <thead className="thead-inverse">
            <tr className="text-center">
              <th>STT</th>
              <th>RFID</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>{this.printGuest()}</tbody>
        </table>
      );
  };

  
  render() {
    return (
      <div>
        <div className="row option">
            <div className="btn-group">
              <button
                onClick={() => {
                  this.setState({ showMember: true, showGuest: false });
                }}
                type="button"
                className="btn btn-primary"
              >
                Member
              </button>
              <button
                onClick={() => {
                  this.setState({ showMember: false, showGuest: true });
                }}
                type="button"
                className="btn btn-primary"
              >
                Guest
              </button>
            </div>
          </div>
          <div className="row">
            {this.renderMember()}
            {this.renderGuest()}
          </div>
      </div>
    )
  }
}
