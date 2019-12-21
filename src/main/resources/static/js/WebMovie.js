class MovieTab1 extends React.Component {

    constructor(){
        super();
        this.state={movies:[],movie:"",typeList:[]};
    }

    componentDidMount(){
        let that = this;
        $.post("/gra/webMovieTab",{},function (re) {
            that.setState({
                movies:re.movies,
                typeList:re.movies[0].movieTypeList,
                movie: re.movies.shift()
            })
        })
    }

    render(){
        const typeShow = this.state.typeList.map((type,index)=>{
            return (
                <a href="javascript:void(0);">{type.type+"  "}</a>
            );

        });
        const movieShow = this.state.movies.map((mo,index)=>{
           return(
               <div className="w3l-movie-gride-agile">
                   <a href={"/gra/oneMoive?id=" + mo.id} className="hvr-sweep-to-bottom"><img src={"/image/"+mo.image}
                                                                              title="Movies Pro"
                                                                              className="img-responsive"
                                                                              alt=" "/>
                       <div className="w3l-action-icon"><i className="fa fa-play-circle-o"
                                                           aria-hidden="true"></i></div>
                   </a>
                   <div className="mid-1 agileits_w3layouts_mid_1_home">
                       <div className="w3l-movie-text">
                           <h6><a href={"/gra/oneMoive?id=" + mo.id}>{mo.name}</a></h6>
                       </div>
                       <div className="mid-2 agile_mid_2_home">
                           <p>{mo.releaseDate}</p>
                           <div className="block-stars">
                               <a>{mo.score}</a>
                           </div>
                           <div className="clearfix"></div>
                       </div>
                   </div>
                   <div className="ribben">
                       <p>NEW</p>
                   </div>
               </div>
           );
        });
        return(
            <div className="tab1">
                <div className="tab_movies_agileinfo">
                    <div className="w3_agile_featured_movies">
                        <div className="col-md-5 video_agile_player">
                            <div className="video-grid-single-page-agileits">
                                <div data-video="f2Z65fobH2I" id="video"><img src={"/image/"+this.state.movie.image} alt=""
                                                                              className="img-responsive"/></div>
                            </div>
                            <div className="player-text">
                                <p className="fexi_header">{this.state.movie.name}</p>
                                <p className="fexi_header_para"><span>上映日期<label>:</label></span>{this.state.movie.releaseDate}</p>
                                <p className="fexi_header_para">
                                    <span>类型<label>:</label> </span>
                                    {typeShow}
                                </p>
                                <p className="fexi_header_para fexi_header_para1">
                                    <span>分数<label>:</label></span>
                                    <a>{this.state.movie.score}</a>
                                </p>
                                <p className="fexi_header_para"><span
                                    className="conjuring_w3">介绍<label>:</label></span>{this.state.movie.content}</p>
                            </div>
                        </div>
                        <div className="col-md-7 wthree_agile-movies_list">
                            {movieShow}

                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="cleafix"></div>
                </div>
            </div>
        );
    }

}

class  NewMovie extends React.Component {

    constructor(){
        super();
        this.state={item:[]};
    }

    componentDidMount(){
        let that = this;
        $.post("/gra/webMovieNew",{
            page:0,
            size:9
        },function (re) {
            that.setState({
                item:re.movies,
            })
            $("#owl-demo").owlCarousel({
                autoPlay: 3000,
                autoPlay : true,
                navigation :true,

                items : 5,
                itemsDesktop : [640,4],
                itemsDesktopSmall : [414,3]

            });
        });
    }

    render(){
        const movieShow = this.state.item.map((mo,index)=>{
            return(
                <div className="item">
                    <div className="w3l-movie-gride-agile w3l-movie-gride-slider ">
                        <a href={"/gra/oneMoive?id=" + mo.id} className="hvr-sweep-to-bottom"><img src={"/image/"+mo.image}
                                                                                   title="Movies Pro"
                                                                                   className="img-responsive"
                                                                                   alt=" "/>
                            <div className="w3l-action-icon"><i className="fa fa-play-circle-o"
                                                                aria-hidden="true"></i></div>
                        </a>
                        <div className="mid-1 agileits_w3layouts_mid_1_home">
                            <div className="w3l-movie-text">
                                <h6><a href={"/gra/oneMoive?id=" + mo.id}>{mo.name}</a></h6>
                            </div>
                            <div className="mid-2 agile_mid_2_home">
                                <p>{mo.releaseDate}</p>
                                <div className="block-stars">
                                    <a>{mo.score}</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="ribben one">
                            <p>NEW</p>
                        </div>
                    </div>
                </div>
            );
        });

        return(
            <div className="w3_agile_latest_movies">
                <div id="owl-demo" className="owl-carousel owl-theme">
                    {movieShow}
                </div>
            </div>
        );
    }
}

class MoiveScore extends React.Component {

    constructor(){
        super();
        this.state={movies:[]};
    }

    componentDidMount(){
        let that = this;
        $.post("/gra/webMovieScore",{
            page:0,
            size:10
        },function (re) {
            that.setState({
                movies:re.movies
            })
        })
    }

    render(){

        const movieShow = this.state.movies.map((mo,index)=>{
           return(
               <div className="col-md-2 w3l-movie-gride-agile requested-movies">
                   <a href={"/gra/oneMoive?id=" + mo.id} className="hvr-sweep-to-bottom"><img src={"/image/"+mo.image} title="Movies Pro"
                                                                              className="img-responsive" alt=" "/>
                       <div className="w3l-action-icon"><i className="fa fa-play-circle-o" aria-hidden="true"></i></div>
                   </a>
                   <div className="mid-1 agileits_w3layouts_mid_1_home">
                       <div className="w3l-movie-text">
                           <h6><a href={"/gra/oneMoive?id=" + mo.id}>{mo.name}</a></h6>
                       </div>
                       <div className="mid-2 agile_mid_2_home">
                           <p>{mo.score}</p>
                           <div className="block-stars">
                               <a>{mo.score}</a>
                           </div>
                           <div className="clearfix"></div>
                       </div>
                   </div>
                   <div className="ribben one">
                       <p>NEW</p>
                   </div>
               </div>
           );
        });

        return(
            <div class="wthree_agile-requested-movies">
                {movieShow}
                <div class="clearfix"></div>
            </div>
        );
    }

}

class MovieShow extends React.Component {

    constructor(){
        super();
        this.state={
            type:"",
            key:"",
            page:0,
            size:6,
            movies:[],
            movieScore:[],
            movieScoreType:[],
            movieOne:"",
            pageMessage:""
        };
        this.GetRequest = this.GetRequest.bind(this);
        this.movieShow = this.movieShow.bind(this);
        this.movieScoreShow = this.movieScoreShow.bind(this);
    }

    /**
     * [获取URL中的参数名及参数值的集合]
     * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
     * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
     * @return {[string]}       [参数集合]
     */
    GetRequest(urlStr) {
        if (typeof urlStr == "undefined") {
            var url = decodeURI(location.search); //获取url中"?"符后的字符串
        } else {
            var url = "?" + urlStr.split("?")[1];
        }
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    movieShow(page){
        let that = this;
        var theRequest = that.GetRequest();
        var type = theRequest['type'];
        if(type == "undefined") {
            type = that.state.type
        }
        var url ="";
        var data={};
        if(type == 'date') {
            url = "/gra/webMovieNew";
            data = {
                page:page,
                size:that.state.size
            };
        } else if(type == 'type') {
            url = "/gra/webMovieType";
            data = {
                page:page,
                size:that.state.size,
                key:theRequest['key']
            }
        } else if(type == 'state') {
            url = "/gra/webMovieDerivation";
            data = {
                page:page,
                size:that.state.size,
                key:theRequest['key']
            }
        }
        that.setState({
            page:page
        })
        $.post(url,data,function (re) {
            that.setState({
                movies:re.movies,
                pageMessage:re.pageMessage
            })
        })
    }

    movieScoreShow(){
        let that = this;
        $.post("/gra/webMovieScore",{
            page:0,
            size:4
        },function (re) {
            that.setState({
                movieScore:re.movies,
                movieScoreType:re.movies[0].movieTypeList,
                movieOne: re.movies.shift()
            })
        })
    }


    componentDidMount(){
        this.movieShow(0);
        this.movieScoreShow();
    }

    render(){

        let that = this;

        const movieShow = this.state.movies.map((mo,index)=>{
           return(
               <div className="w3-agileits-news-one">
                   <div className="wthree-news-img">
                       <a href={"/gra/oneMoive?id=" + mo.id}><img src={"/image/"+mo.image} alt=""/></a>
                   </div>
                   <div className="wthree-news-info">
                       <h5><a href={"/gra/oneMoive?id=" + mo.id}>{mo.name}</a></h5>
                       <div className="agile-post">
                           <a>{"上映于"+mo.releaseDate}</a>
                       </div>
                       <p>{mo.content}</p>
                       <a className="new-more" href={"/gra/oneMoive?id=" + mo.id}>Read More</a>
                   </div>
                   <div className="clearfix"></div>
               </div>
           );
        });

        const typeShow = this.state.movieScoreType.map((type,index)=>{
            return (
                <a href="javascript:void(0);">{type.type+"  "}</a>
            );
        });

        const scoreMovieShow = this.state.movieScore.map((smo,index)=>{
           return(
               <div className="w3l-recent-grid">
                   <div className="wom">
                       <a href={"/gra/oneMoive?id=" + smo.id}><img src={"/image/"+smo.image} alt=" "
                                                       className="img-responsive"/></a>
                   </div>
                   <div className="wom-right">
                       <h5><a href={"/gra/oneMoive?id=" + smo.id}>{smo.name}</a></h5>
                       <p>{smo.content}</p>
                       <ul className="w3l-sider-list">
                           <li><i className="fa fa-clock-o" aria-hidden="true"></i>{smo.releaseDate}</li>
                       </ul>
                   </div>
                   <div className="clearfix"></div>
               </div>
           );
        });

        let last;
        if(this.state.pageMessage.lastPage) {
            last=(
                <li><a className="frist" href="javascript:void(0);" onClick={this.movieShow.bind(this,that.state.page-1)}>Prev</a></li>
            )
        }

        let next;
        if(this.state.pageMessage.nextPage) {
            next=(
                <li><a className="last" href="javascript:void(0);" onClick={this.movieShow.bind(this,that.state.page+1)}>Next</a></li>
            )
        }

        let pageShow = [];

        //当前页码数
        let pageNow = this.state.pageMessage.pageNow+1;

        if(pageNow ==1 )  {
            pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow-1)}>{pageNow}</a></li>)
            if(pageNow + 1 <= this.state.pageMessage.pageNumber) {
                pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow)}>{pageNow+1}</a></li>)
            }
            if(pageNow + 2 <= this.state.pageMessage.pageNumber) {
                pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow+1)}>{pageNow+2}</a></li>)
            }
        } else if(pageNow == this.state.pageMessage.pageNumber) {
            if(pageNow - 2 > 0) {
                pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow-3)}>{pageNow-2}</a></li>)
            }
            if(pageNow - 1 > 0) {
                pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow-2)}>{pageNow-1}</a></li>)
            }
            pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow-1)}>{pageNow}</a></li>)
        } else {
            if(pageNow - 1 > 0) {
                pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow-2)}>{pageNow-1}</a></li>)
            }
            pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow-1)}>{pageNow}</a></li>)
            if(pageNow + 1 <= this.state.pageMessage.pageNumber) {
                pageShow.push(<li><a href="javascript:void(0);" onClick={this.movieShow.bind(this,pageNow)}>{pageNow+1}</a></li>)
            }
        }

        return(
            < div className = "w3_content_agilleinfo_inner" >
            < div className = "agile_featured_movies" >

                <div className="latest-news-agile-info">

                    <div className="col-md-8 latest-news-agile-left-content">
                        {movieShow}
                    </div>

                    <div className="col-md-4 latest-news-agile-right-content">
                        <h3 className="side-t-w3l-agile">评分最高 <span>电影</span></h3>
                        <div className="video_agile_player sidebar-player">
                            <div className="video-grid-single-page-agileits">
                                <div data-video="fNKUgX8PhMA" id="video1"><img src={"/image/"+that.state.movieOne.image} alt=""
                                                                               className="img-responsive"/>
                                    <div id="play"></div></div>
                            </div>


                            <div className="player-text side-bar-info">
                                <p className="fexi_header">{that.state.movieOne.name} </p>

                                <p className="fexi_header_para"><span>上映于<label>:</label></span>{that.state.movieOne.releaseDate} </p>
                                <p className="fexi_header_para">
                                    <span>类型<label>:</label> </span>
                                    {typeShow}
                                </p>
                                <p className="fexi_header_para fexi_header_para1">
                                    <span>分数<label>:</label></span>
                                    <a>{that.state.movieOne.score}</a>
                                </p>
                                <p className="fexi_header_para"><span
                                    className="conjuring_w3">介绍<label>:</label></span>{that.state.movieOne.content}</p>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="agile-info-recent">
                            <h4 className="side-t-w3l-agile">最受欢迎 <span>电影</span></h4>
                            <div className="w3ls-recent-grids">
                                {scoreMovieShow}
                            </div>
                        </div>

                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="blog-pagenat-wthree">
                    <ul>
                        {last}
                        {pageShow}
                        {next}
                    </ul>
                </div>
            </div>
    </div>
        );
    }

}

class MoiveOne extends React.Component{

    constructor(){
        super();
        this.state={movie:"",comments:[],schedules:[]};
        this.GetRequest = this.GetRequest.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    /**
     * [获取URL中的参数名及参数值的集合]
     * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
     * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
     * @return {[string]}       [参数集合]
     */
    GetRequest(urlStr) {
        if (typeof urlStr == "undefined") {
            var url = decodeURI(location.search); //获取url中"?"符后的字符串
        } else {
            var url = "?" + urlStr.split("?")[1];
        }
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    componentDidMount(){
        let that = this;
        var theRequest = that.GetRequest();
        var mid = theRequest['id'];
        $.post("/gra/findMovie",{mid:mid},function (re) {
            that.setState({
                movie:re.movie,
                comments:re.comments,
                schedules:re.schedules
            })
        })
    }

    addComment(){
        let that = this;
        var theRequest = that.GetRequest();
        var mid = theRequest['id'];
        var content = that.refs.content.value;
        var score = that.refs.score.value;
        $.post("/gra/addComment",{
            mid:mid,
            content:content,
            score:score
        },function (re) {
            if(re.HttpCode == 200) {
                $.post("/gra/findComment",{mid:mid},function (re) {
                    that.setState({
                        comments:re.comments
                    })
                    that.refs.content.value = "",
                    that.refs.score.value = ""
                })
            }
        })
    }


    render(){

        const commentShow = this.state.comments.map((comment,index)=>{
            return(
                <div className="media response-info">
                    <div className="media-body response-text-right">
                        <p>{comment.content}</p>
                        <ul>
                            <li>{comment.time}</li>
                            <li>{comment.user.name}</li>
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                </div>
            );
        });

        const scheduleShow = this.state.schedules.map((schedule,index)=>{
            return(
                <li><a href="single.html">{"场次时间："+schedule.startTime + " — " + schedule.endTime}</a>
                    <p>{"播放室："+ schedule.room.roomNumber}</p></li>
            );
        });

        return(
            <div className="w3_content_agilleinfo_inner">
                <div className="agile_featured_movies">
                    <div className="latest-news-agile-info">
                        <div className="col-md-8 latest-news-agile-left-content">
                            <div className="single video_agile_player">

                                <div className="video-grid-single-page-agileits">
                                    <div data-video="f2Z65fobH2I" id="video"><img src={"/image/"+this.state.movie.image} alt=""
                                                                                  className="img-responsive"/></div>
                                </div>
                                <h4>{this.state.movie.name}</h4>
                            </div>
                            <div className="admin-text">
                                <h5>简介</h5>
                                <div className="admin-text-right">
                                    <p>{this.state.movie.content}</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="response">
                                <h4>最新影评</h4>
                                {commentShow}
                            </div>
                            <div className="all-comments-info">
                                <h5>发表评论</h5>
                                <div className="agile-info-wthree-box">
                                    <div className="col-md-6 form-info">
                                        <input type="text" name="score" placeholder="评分" ref="score"/>
                                    </div>
                                    <div className="col-md-6 form-info">
                                        <textarea placeholder="影评" ref="content"></textarea>
                                        <input type="button" value="发表" onClick={this.addComment}/>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 latest-news-agile-right-content">
                            <h4 className="side-t-w3l-agile">购票区</h4>
                            <ul className="side-bar-agile">
                                {scheduleShow}
                            </ul>
                            <div className="agile-info-recent">
                                <h4 className="side-t-w3l-agile">Latest <span>Trailer</span></h4>
                                <div className="w3ls-recent-grids">
                                    <div className="w3l-recent-grid">
                                        <div className="wom">
                                            <a href="single.html"><img src="/mo/images/m12.jpg" alt=" "
                                                                       className="img-responsive"/></a>
                                        </div>
                                        <div className="wom-right">
                                            <h5><a href="single.html">Lorem Integer rutrum</a></h5>
                                            <p>Mauris fermentum dictum magna. Sed laoreet aliquam leo.
                                                Ut tellus dolor, dapibus eget.</p>
                                            <ul className="w3l-sider-list">
                                                <li><i className="fa fa-clock-o" aria-hidden="true"></i>On Jan 12, 2016
                                                </li>
                                                <li><i className="fa fa-eye" aria-hidden="true"></i> 2602</li>
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="w3l-recent-grid">
                                        <div className="wom">
                                            <a href="single.html"><img src="/mo/images/m13.jpg" alt=" "
                                                                       className="img-responsive"/></a>
                                        </div>
                                        <div className="wom-right">
                                            <h5><a href="single.html">Lorem Integer rutrum</a></h5>
                                            <p>Mauris fermentum dictum magna. Sed laoreet aliquam leo.
                                                Ut tellus dolor, dapibus eget.</p>
                                            <ul className="w3l-sider-list">
                                                <li><i className="fa fa-clock-o" aria-hidden="true"></i>On Mar 3, 2016
                                                </li>
                                                <li><i className="fa fa-eye" aria-hidden="true"></i> 2742</li>
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="w3l-recent-grid">
                                        <div className="wom">
                                            <a href="single.html"><img src="/mo/images/m14.jpg" alt=" "
                                                                       className="img-responsive"/></a>
                                        </div>
                                        <div className="wom-right">
                                            <h5><a href="single.html">Lorem Integer rutrum</a></h5>
                                            <p>Mauris fermentum dictum magna. Sed laoreet aliquam leo.
                                                Ut tellus dolor, dapibus eget.</p>
                                            <ul className="w3l-sider-list">
                                                <li><i className="fa fa-clock-o" aria-hidden="true"></i>On Oct 13, 2016
                                                </li>
                                                <li><i className="fa fa-eye" aria-hidden="true"></i> 2802</li>
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




