import React from 'react';
import { connect } from 'react-redux';
import { Button, ListGroupItem, ListGroup } from 'reactstrap';
import CreateChatModal from '../CreateChatModal';
import Chat from '../Chat';

import { logout } from '../../../../reducers/user';
import { getChats } from '../../../../reducers/chats';

import './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateChatModalOpen: false,
      openChat: false,
      currentChat: {},
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logout = this.logout.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }

  componentWillMount(){
    if (this.props.chats.length === 0){
      this.props.getChats({user_email: this.props.user.email});
    }
  }

  openModal(){
    this.setState({isCreateChatModalOpen: true});
  }

  closeModal(){
    this.setState({isCreateChatModalOpen: false});
  }

  openChat(currentChat){
    this.setState({
      openChat: true,
      currentChat: currentChat,
    });
  }

  closeChat(){
    this.setState({openChat: false});
  }

  logout(){
    this.props.logout();
  }

  render() {
    const { isCreateChatModalOpen, openChat, currentChat } = this.state,
      { chats, user } = this.props;

    return (
      <div className="home">
        <Button color="primary" onClick={this.openModal}>
          Новый чат
        </Button>

        <Button color="secondary" className='home__logout-button' onClick={this.logout}>
          Выйти
        </Button>

        {isCreateChatModalOpen &&
          <CreateChatModal closeModal={this.closeModal}/>
        }

        <h3> Выберите чат </h3>

        <ListGroup>
          {chats && chats.map((chat, chatId) => {
            return(
              <ListGroupItem key={`chat-${chatId}`} onClick={()=>{this.openChat(chat)}}>
                <span className='home__chat-name'> {chat.chat_name} </span>
                <span className='home__chat-friend-name'>
                  собеседник {chat.second_user_email === user.email ? chat.first_user_name : chat.second_user_name}
                </span>
              </ListGroupItem>)
          })}
        </ListGroup>

        {openChat &&
          <Chat closeChat={this.closeChat} currentChat={currentChat} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (credentials) => {
    dispatch(logout(credentials));
  },
  getChats: (credentials) => {
    dispatch(getChats(credentials));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
