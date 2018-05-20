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
    this.clickOnEmail = this.clickOnEmail.bind(this);

    this.state = {
      users: [this.props.userEmail],
      name: 'Chat name',
    };
  }

  shouldComponentUpdate(){
    return true;
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
      creator: this.props.userEmail,
      users: this.state.users,
    };
    debugger
    if (chatData.users.length > 1){
      this.props.createChat(chatData);
      this.props.closeModal();
    }
  }

  clickOnEmail(email){
    let { users } = this.state,
      index;
    
    if (users.filter((userEmail, userIndex) => {
      if (userEmail === email){
        index = userIndex;
        return true;
      }
    }).length === 0){
      users.push(email);
      this.setState({users: users});
    } else{
      users.splice(index, 1);
      this.setState({users: users});
    }
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { usersList, userEmail } = this.props,
      { users, name } = this.state;

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

            <h4>Выберите собеседников </h4>

            {usersList && usersList.map && usersList.map((userEl, index) => {
              if (userEmail !== userEl.email){
                return(
                  <div key={`user-${index}`}
                    onClick={()=>{
                      this.clickOnEmail(userEl.email)
                    }}
                    className={users.filter((email)=>email === userEl.email).length > 0 ? 'user-item selected' : 'user-item'}
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
