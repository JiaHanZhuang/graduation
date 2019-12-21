package com.zjh.graduationproject.pojo;

import javax.persistence.*;

/**
 * @author zjh
 * @date 2019/10/12
 */
@Entity
@Table(name = "movie_similarity")
public class MovieSimilarity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Basic
    @Column(nullable = false)
    private Float similarity;

    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)
    @JoinColumn(name = "movie1_id")
    private Movie movie1;

    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)
    @JoinColumn(name = "movie2_id")
    private Movie movie2;

    public MovieSimilarity(){}

    public MovieSimilarity(Float similarity, Movie movie1, Movie movie2) {
        this.similarity = similarity;
        this.movie1 = movie1;
        this.movie2 = movie2;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getSimilarity() {
        return similarity;
    }

    public void setSimilarity(Float similarity) {
        this.similarity = similarity;
    }

    public Movie getMovie1() {
        return movie1;
    }

    public void setMovie1(Movie movie1) {
        this.movie1 = movie1;
    }

    public Movie getMovie2() {
        return movie2;
    }

    public void setMovie2(Movie movie2) {
        this.movie2 = movie2;
    }
}
