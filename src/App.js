import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';

class App extends Component {

  onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {

        var userList = [];

        for (var i = 0; i < data.length; i++) {
          const regNo = data[i][0];
          const name = data[i][1];
          const phoneNumber = data[i][2];
          const email = data[i][3];
          const classType = data[i][4];
          const newUser = { "regNo": regNo, "name": name, "phoneNumber": phoneNumber, "email": email , "class": classType };
          userList.push(newUser);

          fetch('https://bridge-app-e9cce-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
          })
        };
      });
    };

    reader.readAsBinaryString(file);
  }

  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    return (
      <div align="center" oncontextmenu="return false">
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
      </div>
    )
  }
}

export default App;
