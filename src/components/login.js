import React from 'react';

import { requestPostData } from '../config/api';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      phone: '',
      password: '',
      phoneError: '',
      passwordError: '',
    };
  }

  componentWillMount() {

  }

  actionLogin() {
    const { phone, password } = this.state;
    if (phone && password) {
      this.handleLogin(phone, password);
    } else {
      this.setState({
        phoneError: phone ? '' : '必填',
        passwordError: password ? '' : '必填',
      });
    }
  }

  handleLogin(phone, password) {
    const data = { phone, password };
    const self = this;
    requestPostData('users', 'login', data)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('isLogined', true);
          sessionStorage.setItem('user_id', res.data._id);
          sessionStorage.setItem('token', res.data.token);
          location.href = "/#/foodlist";
          location.reload();
          self.setState({
            passwordError: '',
          });
        } else {
          this.setState({
            passwordError: '验证不通过',
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  changePhone(e, val) {
    this.setState({ 
      phone: val,
      phoneError: val ? '' : '必填',
    });
  }

  changePassword(e, val) {
    this.setState({ 
      password: val,
      passwordError: val ? '' : '必填',
    });
  }

  render() {
    return (
      <div>
        <Paper className="clearfix" style={styles.paper} zDepth={1} >
          <div className="pullLeft" style={styles.showArea}>
            <img src={ require("../static/login-bg.jpg") } style={styles.img} />
          </div>
          <div className="pullRight" style={styles.operation}>
            <div style={styles.avatar}>
              <img src={ require("../static/avatar.png") } style={styles.img} />
            </div>
            <div>
              <TextField 
                hintText="请输入手机号" 
                style={styles.textInput}
                value={this.state.phone}
                errorText={this.state.phoneError}
                onChange={(e, val) => this.changePhone(e, val)}
              />
              <TextField 
                hintText="请输入密码" 
                type="password"
                style={styles.textInput}
                value={this.state.password}
                errorText={this.state.passwordError}
                onChange={(e, val) => this.changePassword(e, val)}
              />
              <RaisedButton label="登录" primary={true} style={styles.btn} onClick={() => this.actionLogin()}/>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const styles = {
  paper: {
    margin: '20px 0 0 0',
    padding: '20px',
  },
  showArea: {
    width: '780px',
    // border: '1px solid #eee',
  },
  operation: {
    width: '260px',
    padding: '20px 20px 30px',
    // border: '1px solid #00BCD4',
  },
  textInput: {
    margin: '0 0 8px 0',
    fontSize: '14px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    margin: '0 auto 16px',
    // borderRadius: '50%',
  },
  btn: {
    width: '256px',
    margin: '16px 0 0 0',
  },
  img: {
    width: '100%',
  },
};

export default Login;