import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import './styles.scss';
class UsersListModal extends PureComponent {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.createChat = this.createChat.bind(this);
  }

  closeModal(){
    this.props.closeModal();
  }

  createChat(){

  }

  render() {
    return (
      <div className='modal'>
        <div className='modal__dialog'>
          <div className='modal__header'>Создание беседы</div>
          <div className='modal__footer'>
            <Button color="primary" onClick={this.createChat}>Создать</Button>{' '}
            <Button color="secondary" onClick={this.closeModal}>Отменить</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(UsersListModal);
