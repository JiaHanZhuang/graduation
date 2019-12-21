class AdminLogin extends React.Component {
    constructor(){
        super();
        this.state = {username:"",password:""}
        this.checkName = this.checkName.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.submit = this.submit.bind(this);
    }

    checkName(e) {
        this.setState({
            username:e.target.value
        });
    }

    checkPass(e){
        this.setState({
            password:e.target.value
        });
    }

    submit(){
        let that = this;
        $.post("/gra/admin/logdo",{
            username:this.state.username,
            password:this.state.password
        },function (result) {
            if(result.HttpCode == '404') {
                alert(result.message)
            } else {
                window.location.href = "/gra/admin/index";
            }
        });
    }

    render(){
        return(
            <div className="container">
                <form className="form-signin" >
                    <h2 className="form-signin-heading">登录</h2>
                    <input type="text" className="input-block-level" placeholder="账户" onChange={this.checkName}/>
                    <input type="password" className="input-block-level" placeholder="密码" onChange={this.checkPass}/>
                    <input type="button" className="btn btn-large btn-primary" onClick={this.submit} value="登录"/>
                    {/*<button className="btn btn-large btn-primary"  onClick={this.submit}>登录</button>*/}
                </form>
            </div>
        );
    }
}



