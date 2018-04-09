import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import UsersListModal from '../UsersListModal';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUsersModalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState({isUsersModalOpen: true});
  }

  closeModal(){
    this.setState({isUsersModalOpen: false});
  }

  render() {
    const { isUsersModalOpen } = this.state;

    return (
      <div className="home">
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

export default connect(mapStateToProps)(Home);
