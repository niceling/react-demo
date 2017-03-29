import React, {Component} from 'react'
import config from './config.json';
import styles from './style/Greeter.css';//����

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}>
        {config.helloText}
      </div>
    );
  }
}

export default Greeter