import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div className="home">
        This is home page
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
