import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import UsersListModal from '../UsersListModal';

import { logout } from '../../../../reducers/user';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUsersModalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logout = this.logout.bind(this);
  }

  openModal(){
    this.setState({isUsersModalOpen: true});
  }

  closeModal(){
    this.setState({isUsersModalOpen: false});
  }

  logout(){
    this.props.logout();
  }

  render() {
    const { isUsersModalOpen } = this.state;

    return (
      <div className="home">
        <Button color="primary" onClick={this.logout}>
          Выйти
        </Button>
        <Button color="primary" onClick={this.openModal}>
          Новый чат
        </Button>
        {isUsersModalOpen &&
          <UsersListModal closeModal={this.closeModal}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (credentials) => {
    dispatch(logout(credentials));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
