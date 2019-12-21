class AddSchedule  extends React.Component {

    constructor(){
        super();
        this.state = {rooms:[],movies:[]};
        this.addBefore = this.addBefore.bind(this);
        this.addSchedule = this.addSchedule.bind(this);
    }

    componentDidMount(){
        $(function() {
            $("#start").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd hh:ii:00",
                todayBtn: true,
                autoclose: true,
                startView:2,
                minView: 0,//最低视图 小时视图
                maxView: 4, //最高视图 十年视图
                showSecond : true,
                showHours : true,
                minuteStep:1
            });
            $("#end").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd hh:ii:00",
                todayBtn: true,
                autoclose: true,
                startView:2,
                minView: 0,//最低视图 小时视图
                maxView: 4, //最高视图 十年视图
                showSecond : true,
                showHours : true,
                minuteStep:1
            });
        });
        this.addBefore();
    }

    addBefore(){
        let that = this;
        $.post("/gra/admin/addScheduleBefore",{},function (re) {
            that.setState({
                rooms:re.rooms,
                movies:re.movies
            })
            $("#movie").chosen();
            $("#room").chosen();
        })
    }

    addSchedule(){
        let that = this;
        let start = that.refs.start.value;
        let end = that.refs.end.value;
        let movieId = that.refs.movie.value;
        let roomId = that.refs.room.value
        let state = $("input[type='checkbox']").is(':checked');
        let temp = 0;
        if(state == true) {
            temp = 1;
        }

        var startTime = new Date(start.replace("-", "/").replace("-", "/"));
        var endTime = new Date(end.replace("-", "/").replace("-", "/"));
        if (endTime < startTime) {
            alert("开始时间不能小于结束时间");
            return false;
        }

        $.post("/gra/admin/addScheduleDo",{
            endTime:end,
            startTime:start,
            movie:movieId,
            room:roomId,
            state:temp
        },function (re) {
            alert(re.message)
        })

    }


    render(){
        const movieShow = this.state.movies.map((service,index)=>{
            return <option value={service.id} key={index}>{service.name}</option>
        });
        const roomShow = this.state.rooms.map((service,index)=>{
            return <option value={service.id} key={index}>{service.roomNumber}</option>
        });
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
                                        <legend>添加排期</legend>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="date01">开始时间</label>
                                            <div className="controls">
                                                <input type="text" className="input-xlarge datepicker" id="start"
                                                       ref="start"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="date01">结束时间</label>
                                            <div className="controls">
                                                <input type="text" className="input-xlarge datepicker" id="end"
                                                        ref="end"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="optionsCheckbox">是否开始售票</label>
                                            <div className="controls">
                                                <label className="uniform">
                                                    <input className="uniform_on" type="checkbox" id="optionsCheckbox"
                                                           ref="state"/>
                                                    开始售票
                                                </label>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="select01">电影</label>
                                            <div className="controls">
                                                <select id="movie" className="chzn-select" ref="movie">
                                                    {movieShow}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="select01">播放室</label>
                                            <div className="controls">
                                                <select id="room" className="chzn-select" ref="room">
                                                    {roomShow}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-actions">
                                            <button type="button" className="btn btn-primary" onClick={this.addSchedule}>添加排期</button>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ShowSchedule extends React.Component {

    constructor(){
        super();
        this.state={schedules:[]};
        this.showSchedule = this.showSchedule.bind(this);
        this.updateState = this.updateState.bind(this);
        this.deleteSchedule = this.deleteSchedule.bind(this);
    }

    showSchedule(){
        let that = this;
        $.post("/gra/admin/showSchedule",{},function (re) {
            that.setState({
                schedules:re.schedules
            });

            $.extend( true, $.fn.dataTable.defaults, {
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ 页信息数"
                }
            } );



            $.extend( $.fn.dataTableExt.oStdClasses, {
                "sWrapper": "dataTables_wrapper form-inline"
            } );



            $.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
            {
                return {
                    "iStart":         oSettings._iDisplayStart,
                    "iEnd":           oSettings.fnDisplayEnd(),
                    "iLength":        oSettings._iDisplayLength,
                    "iTotal":         oSettings.fnRecordsTotal(),
                    "iFilteredTotal": oSettings.fnRecordsDisplay(),
                    "iPage":          oSettings._iDisplayLength === -1 ?
                        0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
                    "iTotalPages":    oSettings._iDisplayLength === -1 ?
                        0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
                };
            };



            $.extend( $.fn.dataTableExt.oPagination, {
                "bootstrap": {
                    "fnInit": function( oSettings, nPaging, fnDraw ) {
                        var oLang = oSettings.oLanguage.oPaginate;
                        var fnClickHandler = function ( e ) {
                            e.preventDefault();
                            if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
                                fnDraw( oSettings );
                            }
                        };

                        $(nPaging).addClass('pagination').append(
                            '<ul>'+
                            '<li class="prev disabled"><a href="#">&larr; '+oLang.sPrevious+'</a></li>'+
                            '<li class="next disabled"><a href="#">'+oLang.sNext+' &rarr; </a></li>'+
                            '</ul>'
                        );
                        var els = $('a', nPaging);
                        $(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
                        $(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
                    },

                    "fnUpdate": function ( oSettings, fnDraw ) {
                        var iListLength = 5;
                        var oPaging = oSettings.oInstance.fnPagingInfo();
                        var an = oSettings.aanFeatures.p;
                        var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

                        if ( oPaging.iTotalPages < iListLength) {
                            iStart = 1;
                            iEnd = oPaging.iTotalPages;
                        }
                        else if ( oPaging.iPage <= iHalf ) {
                            iStart = 1;
                            iEnd = iListLength;
                        } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
                            iStart = oPaging.iTotalPages - iListLength + 1;
                            iEnd = oPaging.iTotalPages;
                        } else {
                            iStart = oPaging.iPage - iHalf + 1;
                            iEnd = iStart + iListLength - 1;
                        }

                        for ( i=0, ien=an.length ; i<ien ; i++ ) {

                            $('li:gt(0)', an[i]).filter(':not(:last)').remove();


                            for ( j=iStart ; j<=iEnd ; j++ ) {
                                sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
                                $('<li '+sClass+'><a href="#">'+j+'</a></li>')
                                    .insertBefore( $('li:last', an[i])[0] )
                                    .bind('click', function (e) {
                                        e.preventDefault();
                                        oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
                                        fnDraw( oSettings );
                                    } );
                            }


                            if ( oPaging.iPage === 0 ) {
                                $('li:first', an[i]).addClass('disabled');
                            } else {
                                $('li:first', an[i]).removeClass('disabled');
                            }

                            if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
                                $('li:last', an[i]).addClass('disabled');
                            } else {
                                $('li:last', an[i]).removeClass('disabled');
                            }
                        }
                    }
                }
            } );

            if ( $.fn.DataTable.TableTools ) {
                $.extend( true, $.fn.DataTable.TableTools.classes, {
                    "container": "DTTT btn-group",
                    "buttons": {
                        "normal": "btn",
                        "disabled": "disabled"
                    },
                    "collection": {
                        "container": "DTTT_dropdown dropdown-menu",
                        "buttons": {
                            "normal": "",
                            "disabled": "disabled"
                        }
                    },
                    "print": {
                        "info": "DTTT_print_info modal"
                    },
                    "select": {
                        "row": "active"
                    }
                } );


                $.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
                    "collection": {
                        "container": "ul",
                        "button": "li",
                        "liner": "a"
                    }
                } );
            }



            $(document).ready(function() {
                $('#example').dataTable( {
                    "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
                    "sPaginationType": "bootstrap",
                    "oLanguage": {
                        "sLengthMenu": "_MENU_ 页信息数"
                    }
                } );
            } );
        })
    }

    componentDidMount(){
        this.showSchedule();
    }

    updateState(id,state){
        let that = this;
        $.post("/gra/admin/updateScheduleState",{
            id:id,
            state:state
        },function (re) {
            if(re.HttpCode == 200) {
                that.setState({
                    schedules:re.schedules
                })
                alert(re.message)
            }
        })
    }

    deleteSchedule(id) {
        let that = this;
        $.post("/gra/admin/deleteSchedule",{
            id:id
        },function (re) {
            if(re.HttpCode == 200) {
                that.setState({
                    schedules:re.schedules
                })
                alert(re.message)
            }
        })
    }

    render(){
        const serviceShows = this.state.schedules.map((service,index)=>{
            return (
                <tr className="odd gradeA">
                    <td>{service.movie.name}</td>
                    <td>{service.state == 1 ? '售票中':'停售'}</td>
                    <td>{service.room.roomNumber}</td>
                    <td className="center">{service.endTime}</td>
                    <td className="center">{service.startTime}</td>
                    <td className="center">
                        <a href="javascript:void(0);" onClick={this.updateState.bind(this,service.id,service.state)}>{service.state == 1 ? '停售':'开售'}</a>&nbsp;&nbsp;&nbsp;
                        <a href="javascript:void(0);" onClick={this.deleteSchedule.bind(this,service.id)}>删除</a>
                    </td>
                </tr>
            );
        });
        return(
            <div className="row-fluid">
                <div className="block">
                    <div className="navbar navbar-inner block-header">
                        <div className="muted pull-left">排期信息展示</div>
                    </div>
                    <div className="block-content collapse in">
                        <div className="span12">
                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-striped table-bordered"
                                   id="example">
                                <thead>
                                <tr>
                                    <th>电影名称</th>
                                    <th>状态</th>
                                    <th>播放室</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
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
        );
    }
}