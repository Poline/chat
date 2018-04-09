import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import './styles.scss';

import { getUsers } from '../../../../reducers/users';

class UsersListModal extends PureComponent {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.createChat = this.createChat.bind(this);
  }

  componentWillMount(){
    this.props.getUsers();
  }

  closeModal(){
    this.props.closeModal();
  }

  createChat(){

  }

  render() {
    const { usersList } = this.props;

    return (
      <div className='modal'>
        <div className='modal__dialog'>
          <div className='modal__header'>Создание беседы</div>
          <div className='modal__body'>
            {usersList && usersList.map && usersList.map((user, index) => (
              <div key={`user-${index}`}>
                {user.name} {user.email} {user.last_seen}
              </div>
            ))}
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
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(getUsers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListModal);
