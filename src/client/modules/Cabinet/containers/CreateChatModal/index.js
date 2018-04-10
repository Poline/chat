import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import './styles.scss';

import { getUsers } from '../../../../reducers/users';
import { createChat } from '../../../../reducers/chats';

class CreateChatModal extends PureComponent {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.createChat = this.createChat.bind(this);

    this.state = {
      user: null,
      name: 'Chat name',
    };
  }

  componentWillMount(){
    this.props.getUsers();
  }

  closeModal(){
    this.props.closeModal();
  }

  createChat(){
    const chatData = {
      name: this.state.name,
      first_user_email: this.props.userEmail,
      second_user_email: this.state.user,
    };
    
    if (chatData.second_user_email !== null){
      this.props.createChat(chatData);
      this.props.closeModal();
    }
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { usersList, userEmail } = this.props,
      { user, name } = this.state;

    return (
      <div className='modal'>
        <div className='modal__dialog'>
          <div className='modal__header'>Создание беседы</div>
          <div className='modal__body'>
            <FormGroup>
              <Label for="name">Название беседы</Label>
              <Input
                type="text"
                value={name}
                name="name"
                onChange={this.handleOnChange}
              />
            </FormGroup>

            <h4>Выберите собеседника </h4>

            {usersList && usersList.map && usersList.map((userEl, index) => {
              if (userEmail !== userEl.email){
                return(
                  <div key={`user-${index}`}
                    onClick={()=>{this.setState({user: userEl.email})}}
                    className={user === userEl.email ? 'user-item selected' : 'user-item'}
                  >
                    {userEl.name} {userEl.email} {userEl.last_seen}
                  </div>
                )
              }
            })}
          </div>
          <div className='modal__footer'>
            <Button color="primary" onClick={this.createChat}>Создать</Button>{' '}
            <Button color="secondary" onClick={this.closeModal}>Отменить</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersList: state.users.list,
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(getUsers());
  },
  createChat: (credentials) => {
    dispatch(createChat(credentials));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatModal);
