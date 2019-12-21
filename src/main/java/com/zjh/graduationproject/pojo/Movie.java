package com.zjh.graduationproject.pojo;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Date;
import java.util.List;

/**
 * @author zjh
 * @date 2019/10/12
 */
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Basic
    @Column(nullable = false,length = 50)
    private String name;

    @Basic
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    @Column(nullable = false,name = "release_date")
    private Date releaseDate;

    @Basic
    @Column(nullable = false,columnDefinition = "text")
    private String content;

    @Basic
    @Column(nullable = false,length = 30)
    private String derivation;

    @Basic
    @Column(nullable = false,length = 30)
    private String duration;

    @Basic
    @Column(nullable = false)
    private String image;

    @Basic
    @Column(nullable = false)
    private Float price;

    @Basic
    @Column(name = "release_state",nullable = false,length = 2)
    @Min(0)
    @Max(1)
    private Integer releaseState;

    @Basic
    private Float score = 2.5f;

    @ManyToMany
    @JoinTable(name = "movie_and_type",joinColumns = @JoinColumn(name = "movie_id"),
    inverseJoinColumns = @JoinColumn(name = "type_id"))
    private List<MovieType> movieTypeList;

    @JsonIgnore
    @OneToMany(mappedBy = "movie",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Schedule> scheduleList;

    @JsonIgnore
    @OneToMany(mappedBy = "movie",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<MovieReference> movieReferenceList;

    @JsonIgnore
    @OneToMany(mappedBy = "movie1",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<MovieSimilarity> compareMovie;

    @JsonIgnore
    @OneToMany(mappedBy = "movie2",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<MovieSimilarity> becomparMovie;

    @JsonIgnore
    @OneToMany(mappedBy = "movie",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Comment> commentList;

    public Movie(){}

    public Movie(Integer id,String name){
        this.id = id;
        this.name = name;
    }

    public Movie(Integer id,String name, Integer releaseState, String derivation, Float price) {
        this.id = id;
        this.name = name;
        this.releaseState = releaseState;
        this.derivation = derivation;
        this.price = price;
    }

    public Movie(Integer id,String name, Date releaseDate, String content, String derivation, String duration, String image, Float price, @Min(0) @Max(1) Integer releaseState) {
        this.id = id;
        this.name = name;
        this.releaseDate = releaseDate;
        this.content = content;
        this.derivation = derivation;
        this.duration = duration;
        this.image = image;
        this.price = price;
        this.releaseState = releaseState;
    }

    public Movie(Integer id,String name, Date releaseDate, String content, String derivation, String duration, String image, Float price, @Min(0) @Max(1) Integer releaseState, Float score) {
        this.id = id;
        this.name = name;
        this.releaseDate = releaseDate;
        this.content = content;
        this.derivation = derivation;
        this.duration = duration;
        this.image = image;
        this.price = price;
        this.releaseState = releaseState;
        this.score = score;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Schedule> getScheduleList() {
        return scheduleList;
    }

    public void setScheduleList(List<Schedule> scheduleList) {
        this.scheduleList = scheduleList;
    }

    public List<MovieReference> getMovieReferenceList() {
        return movieReferenceList;
    }

    public void setMovieReferenceList(List<MovieReference> movieReferenceList) {
        this.movieReferenceList = movieReferenceList;
    }

    public List<MovieSimilarity> getCompareMovie() {
        return compareMovie;
    }

    public void setCompareMovie(List<MovieSimilarity> compareMovie) {
        this.compareMovie = compareMovie;
    }

    public List<MovieSimilarity> getBecomparMovie() {
        return becomparMovie;
    }

    public void setBecomparMovie(List<MovieSimilarity> becomparMovie) {
        this.becomparMovie = becomparMovie;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public List<MovieType> getMovieTypeList() {
        return movieTypeList;
    }

    public void setMovieTypeList(List<MovieType> movieTypeList) {
        this.movieTypeList = movieTypeList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDerivation() {
        return derivation;
    }

    public void setDerivation(String derivation) {
        this.derivation = derivation;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getReleaseState() {
        return releaseState;
    }

    public void setReleaseState(Integer releaseState) {
        this.releaseState = releaseState;
    }

}
