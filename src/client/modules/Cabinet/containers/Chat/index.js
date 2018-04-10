import React from 'react';
import { connect } from 'react-redux';

import { getMessages, sendMessage } from '../../../../reducers/messages';
import { Button, FormGroup, Label, Input } from 'reactstrap';

class ChatView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'message',
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount(){
    if (this.props.messages.length === 0){
      this.props.getMessages({
        chat_name: this.props.currentChat.chat_name,
        first_user_email: this.props.user.email,
        second_user_email: this.props.currentChat.second_user_email,
      });
    }
  }

  handleOnChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  sendMessage(){
    if (this.state.message.length > 0){
      this.props.sendMessage({
        chat_name:  this.props.currentChat.chat_name,
        message: this.state.message,
        first_user_email: this.props.user.email,
        second_user_email: this.props.currentChat.second_user_email,
      })
    }
  }

  render() {
    const { message } = this.state,
      { closeChat, messages } = this.props;

    return(
      <div className='modal'>
        <div className='modal__dialog'>
          <div className='modal__body'>
            <FormGroup>
              <Label for="name">Введите сообщение</Label>
              <Input
                type="text"
                value={message}
                name="message"
                onChange={this.handleOnChange}
              />
            </FormGroup>

          </div>
          <div className=''>
            {messages && messages.map && messages.map((message, index) => (
              <div>
                {message.message_text}
              </div>
            ))}
          </div>
          <div className='modal__footer'>
            <Button color="primary" onClick={this.sendMessage}>Отправить сообщение</Button>{' '}
            <Button color="secondary" onClick={closeChat}>Закрыть чат</Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (credentials) => {
    dispatch(getMessages(credentials));
  },
  sendMessage: (credentials) => {
    dispatch(sendMessage(credentials));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
