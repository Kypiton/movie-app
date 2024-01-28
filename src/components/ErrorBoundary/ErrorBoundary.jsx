import { Component } from 'react';
import PropTypes from 'prop-types';
import error from '../../assets/7VE.gif';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <img src={error} alt='Error' style={{ display: 'block', margin: '0 auto' }} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};

export default ErrorBoundary;
