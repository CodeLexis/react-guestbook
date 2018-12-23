import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import React from 'react'
// import $ from 'jquery'
// import Popper from 'popper.js'
// import { connect } from 'react-redux'
// import { Provider } from 'react-redux'

import { addNewMessage } from './js/actions'
import { configureStore } from './js/store'
import logo from './logo.svg';
import './App.css';


let store = configureStore()


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }


class GuestbookApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], text: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCurrentTimestamp() {
    var today = new Date()
    var min = today.getMinutes()
    var hour = today.getHours()
    var dd = today.getDate()
    var mm = today.getMonth()+1 //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = `${mm} ${dd} ${yyyy} ${hour}:${min}`;

    return today
  }

  addNewMessage(message) {
    message.timestamp = this.getCurrentTimestamp()

    let messages = this.state.messages
    messages.push(message)

    this.setState({messages: messages})
  }

  render() {
    return (
      <div>
        <div class="jumbotron text-center header">
          <h1>Guestbook</h1>
          <p>Feel free to leave a message here</p>
        </div>
                
        <MessageList parent={this} messages={this.state.messages} {...this.props}/>

        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />

          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form> */}

      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.state.text.length) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}


class MessageCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {'author': '', 'message': '', 'timestamp': Date.now().toFixed()}
  }

  render() {
    if (this.props.isInput) {
      return <div class="message-card col-sm-4">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input class="message-author" id='author' onChange={this.onAuthorValueChange.bind(this)}/>
          <textarea class="message-text" id='message' onChange={this.onMessageValueChange.bind(this)}/>
          <br/>
          <button>SUBMIT</button>
        </form>
      </div>
    }

    return (
      <div class="message-card col-sm-4">
        <h3 class="message-author">{this.props.author}</h3>
        <p class="message-text">{this.props.message}</p>
        <p class="message-time">{this.props.timestamp}</p>
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.parent.addNewMessage(this.state)
  }

  onAuthorValueChange(e) {
    this.setState({'author': e.target.value})
  }

  onMessageValueChange(e) {
    this.setState({'message': e.target.value})
  }
}


class MessageList extends React.Component {
  render() {

    let array = this.props.messages.map(
      (val, i, arr) => {
        return <MessageCard parent={this.props.parent} key={i} {...val} />
      }
    )

    return (
      <div class="container">
        <MessageCard parent={this.props.parent} isInput={true}/>
        <div class="row">
          {array}
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addNewMessage: (data) => dispatch(addNewMessage(data))
  }
}


function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

export default GuestbookApp
// export default connect(mapStateToProps, mapDispatchToProps)(GuestbookApp)