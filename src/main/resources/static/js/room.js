class AddRoom extends React.Component {
    constructor(){
        super();
        this.addRoom = this.addRoom.bind(this);
    }

    addRoom(){
        let that = this;
        let state = $("input[type='checkbox']").is(':checked');
        if(state == true) {
            state = 1
        } else {
            state = 0
        }
        let roomNumber = that.refs.number.value;
        $.post("/gra/admin/addRoomDo",{
            state :state,
            roomNumber:roomNumber
        },function (re) {
            alert(re.message);
        })
    }

    render(){
        let that = this;
        const style = {
            width: '810px',
            height: '200px'
        };
        return(
            <div className="span10" id="content">

                <div className="row-fluid">

                    <div className="block">
                        <div className="navbar navbar-inner block-header">
                            <div className="muted pull-left">添加页面</div>
                        </div>
                        <div className="block-content collapse in">
                            <div className="span12">
                                <div className="form-horizontal">
                                    <fieldset>
                                        <legend>添加播放室</legend>
                                        <div className="control-group">
                                            <label className="control-label" >播放室编号 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" ref="number"/>播放室
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="optionsCheckbox">是否可用</label>
                                            <div className="controls">
                                                <label className="uniform">
                                                    <input className="uniform_on" type="checkbox" id="optionsCheckbox"
                                                           ref="releaseState"/>可以使用
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-actions">
                                            <button type="button" className="btn btn-primary" onClick={this.addRoom}>添加播放室</button>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class ShowRoom extends React.Component {

    constructor(){
        super();
        this.state={rooms:[]}
        this.showRoom = this.showRoom.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
    }

    showRoom(){
        let that = this;
        $.post("/gra/admin/showRoom",{},function (re) {
            that.setState({
                rooms:re.rooms
            })
        })
    }

    updateRoom(id,state){
        let that = this;
        $.post("/gra/admin/updateRoomState",{
            id:id,
            state:state
        },function (re) {
            if(re.HttpCode == 200) {
                that.setState({
                    rooms:re.rooms
                })
            }
        })
    }

    componentDidMount(){
        this.showRoom();
    }

    render(){
        const serviceShows = this.state.rooms.map((service,index)=>{
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{service.roomNumber}</td>
                    <td>{service.state == 1 ? '可用':'不可用'}</td>
                    <td>
                        <a href="javascript:void(0);" onClick={this.updateRoom.bind(this,service.id,service.state)}>{service.state == 1 ? '设为不可用':'设为可用'}</a>
                    </td>
                </tr>
            );

        });
        return(
            <div className="row-fluid">
                <div className="block">
                    <div className="navbar navbar-inner block-header">
                        <div className="muted pull-left">播放室信息一览</div>
                    </div>
                    <div className="block-content collapse in">
                        <div className="span12">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>播放室编号</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {serviceShows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}