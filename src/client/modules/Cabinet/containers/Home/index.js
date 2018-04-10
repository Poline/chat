import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import CreateChatModal from '../CreateChatModal';
import Chat from '../Chat';

import { logout } from '../../../../reducers/user';
import { getChats } from '../../../../reducers/chats';

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
      { chats } = this.props;
    
    return (
      <div className="home">
        <Button color="primary" onClick={this.logout}>
          Выйти
        </Button>
        <Button color="primary" onClick={this.openModal}>
          Новый чат
        </Button>
        {isCreateChatModalOpen &&
          <CreateChatModal closeModal={this.closeModal}/>
        }
        {chats && chats.map((chat, chatId) => {
          return(<div key={`chat-${chatId}`} onClick={()=>{this.openChat(chat)}}> {chat.chat_name} </div>)
        })}

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
