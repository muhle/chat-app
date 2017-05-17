import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public init() {
    const connection = new WebSocket('ws://localhost:8080/chatSocket/'),
      loginData = {
        name: 'phe', password: '1234'
      }, loginData2 = {
        name: 'u1', password: '1234'
      };
    let firstUser = true;

    // When the connection is open, send login data to the server
    connection.onopen = function () {
      setInterval(() => {
        const event = {
          type: 'Login',
          value: firstUser ? loginData : loginData2
        };
        console.log('send Data');
        firstUser = !firstUser;
        connection.send(JSON.stringify(event));
      }, 10000);
    };

    // Log errors
    connection.onerror = function (error) {
      console.log('WebSocket Error' + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      const o = JSON.parse(e.data);
      console.log('Server', o);
    };
  }
}
