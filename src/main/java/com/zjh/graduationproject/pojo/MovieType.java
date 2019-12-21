package com.zjh.graduationproject.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * @author zjh
 * @date 2019/10/12
 */
@Entity
@Table(name = "movie_type")
public class MovieType {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic
    @Column(nullable = false,length = 15)
    private String type;

    @JsonIgnore
    @ManyToMany(mappedBy = "movieTypeList",fetch = FetchType.EAGER)
    private List<Movie> movieList;

    public MovieType(){}


    public MovieType(String type){
        this.type = type;
    }

    public MovieType(Integer id) {
        this.id = id;
    }

    public MovieType(Integer id,String type) {
        this.id = id;
        this.type = type;
    }

    public List<Movie> getMovieList() {
        return movieList;
    }

    public void setMovieList(List<Movie> movieList) {
        this.movieList = movieList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
