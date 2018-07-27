import React, {Component} from 'react';
import {Modal, Button} from 'antd';
import {Motion, spring} from 'react-motion';
import PropTypes from "prop-types";
import styles from './Modal.less';

class HDModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false};
  }

  componentDidUpdate(oldprops) {
    if (this.props.pane != oldprops.pane) {
       this.setState({open : this.props.pane === 1});
    }
  }

  onCancel() {
    this.setState({'modalvisible': !this.state.modalvisible});
  }

  slide() {
    this.setState({'open': !this.state.open});
  }

  render() {

    const {title, width, footer, component1, component2, onCancel, visible } = this.props;
    const {modalvisible, open} = this.state;

    return (
      <Modal className={styles.hdmodal} bodyStyle={{'height' : '80vh'}} title={title} visible={visible} width={width} onCancel={onCancel.bind(this)} footer={footer}>

        <div className={styles.wrapper}>

          <Motion style={{tween: spring(open ? -100 : 0)}}>
            {
              ({tween}) => (

                <div style={{ 'transform': 'translateX(' + tween + '%)'}}>
                  <div className={styles.slide} >
                    {component1}
                  </div>

                  <div className={styles.slide2} >
                    {component2}
                  </div>
                </div>

              )}
          </Motion>
        </div>

      </Modal>);
  }
}

HDModal.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  footer: PropTypes.array
};

HDModal.defaultProps = {
  title: 'Modal Title',
  width: '70%',
  footer: null

};

export default HDModal;






