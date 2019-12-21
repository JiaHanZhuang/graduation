class BaseTop extends React.Component {

    constructor(){
        super();
    }

    render(){
        return(
            <div className="navbar navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container-fluid">
                        <a className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </a>
                        <a className="brand" href="#">后台管理</a>
                        <div className="nav-collapse collapse">
                            <ul className="nav pull-right">
                                <li className="dropdown">
                                    <a href="#" role="button" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-user"></i>管理员<i className="caret"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a tabIndex="-1" href="/gra/admin/logout">退出</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav">
                                <li className="active">
                                    <a href="#">首页</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class BaseFluid extends React.Component {

    constructor(){
        super();
        this.install = this.install.bind(this);
    }

    install(){
        $.post('/gra/admin/install',{},function(result) {
            alert(result.message);
        })
    }

    render(){
        return(
                    <div className="span2" id="sidebar">
                        <ul className="nav nav-list bs-docs-sidenav nav-collapse collapse">
                            <li >
                                <a href="/gra/admin/index"><i className="icon-chevron-right"></i> 首页</a>
                            </li>
                            <li>
                                <a href="/gra/admin/movieAction"><i className="icon-chevron-right"></i> 添加电影</a>
                            </li>
                            <li>
                                <a href="/gra/admin/addRoom"><i className="icon-chevron-right"></i> 添加播放室</a>
                            </li>
                            <li>
                                <a href="/gra/admin/addSchedule"><i className="icon-chevron-right"></i> 添加排期</a>
                            </li>
                            <li>
                                <a href="/gra/admin/showScheduleBefore"><i className="icon-chevron-right"></i>查看排期信息</a>
                            </li>
                            <li>
                                <a href="buttons.html"><i className="icon-chevron-right"></i> 按钮 & 图标</a>
                            </li>
                            <li>
                                <a href="editors.html"><i className="icon-chevron-right"></i> 编辑器</a>
                            </li>
                            <li>
                                <a href="interface.html"><i className="icon-chevron-right"></i> UI界面</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-success pull-right">731</span> 订单</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-success pull-right">812</span> 清单</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-info pull-right">27</span> 客户</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-info pull-right">1,234</span> 用户</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-info pull-right">2,221</span> 消息</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-info pull-right">11</span> 报告</a>
                            </li>
                            <li>
                                <a href="#"><span className="badge badge-important pull-right">83</span> 错误</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" onClick={this.install}> 安装电影类型</a>
                            </li>
                        </ul>
                    </div>
        );
    }
}


class BaseWebTop extends React.Component {

    constructor(){
        super();
    }

    render(){
        return(

            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <h1><a href="/gra/index"><span>M</span>ovies <span>P</span>ro</a></h1>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="/gra/index">首页</a></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">类型 <b className="caret"></b></a>
                            <ul className="dropdown-menu multi-column columns-3">
                                <li>
                                    <div className="col-sm-4">
                                        <ul className="multi-column-dropdown">
                                            <li><a href="/gra/movieShow?type=type&key=action">动作</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=biography">传记</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=crime">犯罪</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=family">亲情</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=terror">恐怖</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=romance">浪漫</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=sports">体育</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=war">战争</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <ul className="multi-column-dropdown">
                                            <li><a href="/gra/movieShow?type=type&key=adventure">冒险</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=comedy">喜剧</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=record">记录</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=fantasy">玄幻</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=panic">惊悚</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <ul className="multi-column-dropdown">
                                            <li><a href="/gra/movieShow?type=type&key=cartoon">卡通</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=ancient">古装</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=drama">戏剧</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=history">历史</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=music">音乐</a></li>
                                            <li><a href="/gra/movieShow?type=type&key=mentality">心理</a></li>
                                        </ul>
                                    </div>
                                    <div className="clearfix"></div>
                                </li>
                            </ul>
                        </li>
                        <li><a href="series.html">电视剧</a></li>
                        <li><a href="/gra/movieShow?type=date">新片</a></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">国家/地区 <b
                                className="caret"></b></a>
                            <ul className="dropdown-menu multi-column columns-3">
                                <li>
                                    <div className="col-sm-4">
                                        <ul className="multi-column-dropdown">
                                            <li><a href="/gra/movieShow?type=state&key=Russia">俄罗斯</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=France">法国</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=England">英国</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=USA">美国</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <ul className="multi-column-dropdown">
                                            <li><a href="/gra/movieShow?type=state&key=China">中国</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=Hongkong">中国香港</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=Japan">日本</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=Thailand">泰国</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <ul className="multi-column-dropdown">
                                            <li><a href="/gra/movieShow?type=state&key=Italy">意大利</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=India">印度</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=Korea">韩国</a></li>
                                            <li><a href="/gra/movieShow?type=state&key=Germany">德国</a></li>
                                        </ul>
                                    </div>
                                    <div className="clearfix"></div>
                                </li>
                            </ul>
                        </li>
                        <li><a href="list.html">排行榜</a></li>
                        <li><a href="contact.html">联系</a></li>
                    </ul>
                </div>
                <div className="clearfix"></div>
            </nav>
        );
    }

}