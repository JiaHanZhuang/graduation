class AddMovie extends React.Component {


    constructor(){
        super();
        this.state={movieType:[]};
        this.typeAction = this.typeAction.bind(this);
        this.addMovie = this.addMovie.bind(this);
    }



    addMovie(){

        let _value = $("#multiSelect").val();
        let releaseState = $("input[type='checkbox']").is(':checked');
        let that = this;


        var fd = new FormData();
        fd.append("name",that.refs.name.value);
        fd.append("duration",that.refs.duration.value);
        fd.append("price",that.refs.price.value);
        fd.append("releaseDate",that.refs.releaseDate.value);
        fd.append("releaseState",releaseState);
        fd.append("derivation",that.refs.derivation.value);
        fd.append("types",_value);
        fd.append("content",that.refs.content.value);
        fd.append("file",$("#file")[0].files[0]);
        $.ajax({
            url: '/gra/admin/addMovie',
            type: 'post',
            processData: false,
            contentType: false,
            data: fd,
            success: function (result) {
                alert(result.message)
            }
        });

    }

    typeAction(){
        let that = this;
        $.post("/gra/admin/selectType",{},function (re) {
            that.setState({
                movieType:re.types
            });
            $(".chzn-select1").trigger("chosen:updated");
            $(".chzn-select1").chosen();
        })
    }

    componentDidMount(){
        this.typeAction();
    }

    render(){
        const serviceShows = this.state.movieType.map((service,index)=>{
            return <option value={service.id} key={index}>{service.type}</option>
        });
        const style = {
            width: '810px',
            height: '200px'
        };
        $(function() {
            $(".datepicker").datepicker();
            $(".uniform_on").uniform();
            $(".chzn-select").chosen();

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
                                        <legend>添加电影</legend>
                                        <div className="control-group">
                                            <label className="control-label" >电影名 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" ref="name"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" >时长 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" ref="duration"/>小时
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" >票价 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" ref="price"/>元
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="date01">上映日期</label>
                                            <div className="controls">
                                                <input type="text" className="input-xlarge datepicker" id="date01"
                                                       value="05/16/2019" ref="releaseDate"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="optionsCheckbox">是否上映</label>
                                            <div className="controls">
                                                <label className="uniform">
                                                    <input className="uniform_on" type="checkbox" id="optionsCheckbox"
                                                            ref="releaseState"/>
                                                        上映
                                                </label>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="select01">拍摄国家/地区</label>
                                            <div className="controls">
                                                <select id="select01" className="chzn-select" ref="derivation">
                                                    <option>俄罗斯</option>
                                                    <option>法国</option>
                                                    <option>英国</option>
                                                    <option>美国</option>
                                                    <option>中国</option>
                                                    <option>中国香港</option>
                                                    <option>日本</option>
                                                    <option>泰国</option>
                                                    <option>意大利</option>
                                                    <option>印度</option>
                                                    <option>韩国</option>
                                                    <option>德国</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="multiSelect">电影类型</label>
                                            <div className="controls">
                                                <select multiple="multiple" id="multiSelect"
                                                        className="chzn-select1 span4" ref="type">
                                                    {serviceShows}
                                                </select>
                                            </div>

                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="fileInput">电影图片</label>
                                            <div className="controls">
                                                <input className="input-file uniform_on" id="file" type="file"/>
                                            </div>
                                        </div>

                                        <div className="control-group">
                                            <label className="control-label" >电影简介</label>
                                            <div className="controls">
                                                <textarea  className="input-xlarge textarea" style={style} ref="content"/>
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <button type="button" className="btn btn-primary" onClick={this.addMovie}>添加电影</button>
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


class ShowMovie extends React.Component {

    constructor(){
        super();
        this.state={movies:[]};
        this.showMovie = this.showMovie.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    showMovie(){
        let that = this;
        $.post("/gra/admin/findMovies",{},function (re) {
            that.setState({
                movies:re.movies
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
        this.showMovie();
    }


    updateState(id,state){
        let that = this;
        $.post("/gra/admin/movieState",{
            id:id,
            releaseState:state
        },function (re) {
            if(re.HttpCode == 200) {
                that.setState({
                    movies:re.movies
                })
            }
        })
    }

    render(){
        const serviceShows = this.state.movies.map((service,index)=>{
            return (<tr className="odd gradeA">
                    <td>{service.name}</td>
                    <td>{service.releaseState == 1 ? '上映中':'下映'}</td>
                    <td>{service.derivation}</td>
                    <td className="center">{service.price}</td>
                    <td className="center">
                        <a href={"/gra/admin/movieMessage?id="+service.id}>查看</a>&nbsp;&nbsp;&nbsp;
                        <a href="javascript:void(0);" onClick={this.updateState.bind(this,service.id,service.releaseState)}>{service.releaseState == 1 ? '下映':'上映'}</a>
                    </td>
                </tr>
            );

        });
        return(
                <div className="row-fluid">
                    <div className="block">
                        <div className="navbar navbar-inner block-header">
                            <div className="muted pull-left">电影信息展示</div>
                        </div>
                        <div className="block-content collapse in">
                            <div className="span12">
                                <table cellPadding="0" cellSpacing="0" border="0" className="table table-striped table-bordered"
                                       id="example">
                                    <thead>
                                    <tr>
                                        <th>电影名称</th>
                                        <th>状态</th>
                                        <th>拍摄国家/地区</th>
                                        <th>票价</th>
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


class Movie extends React.Component{
    constructor(){
        super();
        this.state={movieType:[],message:"",dateString:""};
        this.getQueryString = this.getQueryString.bind(this);
        this.movie = this.movie.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.break = this.break.bind(this);
    }

    getQueryString()
    {
        var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    movie(){
        let that = this;
        let id = that.getQueryString();
        $.post("/gra/admin/findOne",{
            id:id
        },function (re) {
            that.setState({
                movieType:re.types,
                message:re.movie,
                dateString:re.dateString
            });
            $(".chzn-select1").trigger("chosen:updated");
            $(".chzn-select1").chosen();
        })
    }

    updateMovie(){

        let _value = $("#multiSelect").val();
        let releaseState = $("input[type='checkbox']").is(':checked');
        let that = this;


        var fd = new FormData();
        fd.append("id",that.state.message.id);
        fd.append("name",that.refs.name.value);
        fd.append("duration",that.refs.duration.value);
        fd.append("price",that.refs.price.value);
        fd.append("releaseDate",that.refs.releaseDate.value);

        fd.append("derivation",that.refs.derivation.value);

        fd.append("file",$("#file")[0].files[0]);
        fd.append("image",that.state.message.image)
        fd.append("types",_value);
        var temp= "";
        for(var i = 0;i<that.state.message.movieTypeList.length;i++) {
            if(temp == ""){
                temp = that.state.message.movieTypeList[i].id
            } else {
                temp = temp + "," + that.state.message.movieTypeList[i].id
            }
        }
        if(_value != temp) {
            fd.append("update",'update');
        }
        if(that.refs.content.value == "") {
            fd.append("content",that.state.message.content);
        } else {
            fd.append("content",that.refs.content.value);
        }
        //原电影已是上映状态，页面勾选下映
        if (that.state.message.releaseState == 1 && releaseState) {
            fd.append("releaseState",'0');
            //原电影已是下映状态，页面勾选上映
        } else if(that.state.message.releaseState == 0 && releaseState) {
            fd.append("releaseState",'1');
            //未去勾选，不改变状态
        } else {
            fd.append("releaseState",that.state.message.releaseState);
        }


        $.ajax({
            url: '/gra/admin/updateMovie',
            type: 'post',
            processData: false,
            contentType: false,
            data: fd,
            success: function (result) {
                alert(result.message)
            }
        });

    }


    break(){
        window.location.href = "/gra/admin/index";
    }

    componentDidMount(){
        this.movie();
    }

    render(){
        let that = this;
        const serviceShows = this.state.movieType.map((service,index)=>{
            let flag = false;
            that.state.message.movieTypeList.map((m,key)=>{
                if(service.id == m.id) {
                    flag = true;
                }
            })
            if(flag) {
                return <option value={service.id} key={index} selected>{service.type}</option>
            } else {
                return <option value={service.id} key={index} >{service.type}</option>
            }
        });
        const style = {
            width: '810px',
            height: '200px'
        };
        const style1 = {
            height: '200px',
            width:'405px'
        }
        $(function() {
            $(".datepicker").datepicker();
            $(".uniform_on").uniform();
            $(".chzn-select").chosen();

        });
        return(
            <div className="span10" id="content">
                <div className="row-fluid">
                    <div className="block">
                        <div className="navbar navbar-inner block-header">
                            <div className="muted pull-left">修改页面</div>
                        </div>
                        <div className="block-content collapse in">
                            <div className="span12">
                                <form className="form-horizontal">
                                    <fieldset>
                                        <legend>修改电影信息</legend>
                                        <div className="control-group">
                                            <label className="control-label">电影名 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" defaultValue={this.state.message.name} ref="name"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label">时长 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" defaultValue={this.state.message.duration} ref="duration"/>小时
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label">票价 </label>
                                            <div className="controls">
                                                <input type="text" className="span6" defaultValue={this.state.message.price} ref="price"/>元
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="date01">上映日期</label>
                                            <div className="controls">
                                                <input type="text" className="input-xlarge datepicker" id="date01"
                                                       defaultValue={this.state.dateString} ref="releaseDate"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="optionsCheckbox">当前状态</label>
                                            <div className="controls">
                                                <label className="uniform">
                                                    <input type="text" className="span6" value={this.state.message.releaseState == 1 ? '上映' : '下映' } disabled/>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="optionsCheckbox">是否{this.state.message.releaseState == 0 ? '上映' : '下映' }</label>
                                            <div className="controls">
                                                <label className="uniform">
                                                    <input className="uniform_on" type="checkbox" id="optionsCheckbox"/>{this.state.message.releaseState == 0 ? '上映' : '下映' }
                                                </label>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="select01">拍摄国家/地区</label>
                                            <div className="controls">
                                                <select id="select01" className="chzn-select" defaultValue={this.state.message.derivation} ref="derivation">
                                                    <option>俄罗斯</option>
                                                    <option>法国</option>
                                                    <option>英国</option>
                                                    <option>美国</option>
                                                    <option>中国</option>
                                                    <option>中国香港</option>
                                                    <option>日本</option>
                                                    <option>泰国</option>
                                                    <option>意大利</option>
                                                    <option>印度</option>
                                                    <option>韩国</option>
                                                    <option>德国</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="multiSelect">电影类型</label>
                                            <div className="controls">
                                                <select multiple="multiple" id="multiSelect"
                                                        className="chzn-select1 span4">
                                                    {serviceShows}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="fileInput">原图</label>
                                            <div className="controls">
                                                <img src={"/image/"+this.state.message.image} style={style1}/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label" htmlFor="fileInput">电影图片</label>
                                            <div className="controls">
                                                <input className="input-file uniform_on" id="file" type="file"/>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label">电影简介</label>
                                            <div className="controls">
                                                <textarea className="input-xlarge textarea" placeholder={this.state.message.content}
                                                          style={style} defaultValue={this.state.message.content} ref="content"/>
                                            </div>
                                        </div>
                                        <div className="form-actions">
                                            <button type="button" className="btn btn-primary" onClick={this.updateMovie}>提交修改</button>
                                            &nbsp;&nbsp;&nbsp;
                                            <button type="button" className="btn" onClick={this.break}>返回</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}