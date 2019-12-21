class MovieLogin extends React.Component {

    constructor(){
        super();
        this.state={flag:false,user:null};
    }

    componentDidMount(){
        let that = this;
        $.post("/gra/loginState",{},function (re) {
            if(re.HttpCode == "200") {
                that.setState({
                    flag:true,
                    user:re.user
                })
            }
        })
    }

    render(){
        let show;
        if(!this.state.flag) {
            show=(
                <ul>
                    <li><a href="#" className="login" data-toggle="modal" data-target="#myModal4">登陆</a></li>&nbsp;&nbsp;
                    <li><a href="#" className="login reg" data-toggle="modal" data-target="#myModal5">注册</a></li>
                </ul>
            )
        }
        return(
            <div className="col-md-6 wthree_agile_login">
                {show}
            </div>
        )
    }
}
class LoginFrom extends React.Component {

    constructor(){
        super();
        this.login = this.login.bind(this);
    }

    login(){
        let that = this;
        var email = that.refs.email.value;
        var password = that.refs.password.value;
        $.post("/gra/login",{
            email:email,
            password:password
        },function (re) {
            if(re.HttpCode == 200) {
                window.location.href="/gra/index"
            } else {
                alert(re.message)
            }
        })
    }

    render(){
        return(
            <div className="modal fade" id="myModal4" tabIndex="-1" role="dialog">

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4>登陆</h4>
                            <div className="login-form">
                                <form>
                                    <input type="email" name="email" placeholder="邮箱" required="" ref="email"/>
                                        <input type="password" name="password" placeholder="密码" required="" ref="password"/>
                                            <div className="tp">
                                                <input type="button" value="登陆" onClick={this.login}/>
                                            </div>
                                            <div className="forgot-grid">
                                                <div className="forgot">
                                                    <a href="#" data-toggle="modal" data-target="#myModal2">忘记密码？</a>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Register extends React.Component {

    constructor(){
        super();
        this.register = this.register.bind(this);
    }
    

    register(){
        let that = this;
        var name = that.refs.name.value;
        var email = that.refs.email.value;
        var phone = that.refs.phone.value;
        var password = that.refs.password.value;
        var conform = that.refs.conform.value;

        let flag = $("input[type='checkbox']").is(':checked');

        if(!flag) {
            alert("未同意本网站政策");
            return false;
        }

        if(!(/^1[3456789]\d{9}$/.test(phone))){
            alert("手机号码有误，请重填");
            return false;
        }
        if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email))) {
            alert("邮箱格式有误，请重填");
            return false;
        }
        if(password != conform) {
            alert("密码不一致");
            return false;
        }
        $.post("/gra/register",{
            name:name,
            email:email,
            phone:phone,
            password:password
        },function (re) {
            alert(re.message);
        })
    }

    render(){
        return(
            <div className="modal fade" id="myModal5" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4>Register</h4>
                            <div className="login-form">
                                <form action="#" method="post">
                                    <input type="text" name="name" placeholder="姓名" required="" ref="name"/>
                                    <input type="email" name="email" placeholder="邮箱" required="" ref="email"/>
                                    <input type="text" name="phone" placeholder="手机号码" required="" ref="phone"/>
                                    <input type="password" name="password" placeholder="密码" required="" ref="password" />
                                    <input type="password" name="conform password" placeholder="确认密码" ref="conform"
                                           required=""/>
                                    <div className="signin-rit">
													<span className="agree-checkbox">
														<label className="checkbox"><input type="checkbox"
                                                                                           name="checkbox"/>我同意<a
                                                            className="w3layouts-t" href="#"
                                                            target="_blank">网站</a> 所有 <a className="w3layouts-t"
                                                                                         href="#" target="_blank">政策</a></label>
													</span>
                                    </div>
                                    <div className="tp">
                                        <button type="button" value="注册" onClick={this.register}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}