package com.myticket.myticket.movie.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Entity
@Data
@ToString
@RequiredArgsConstructor
public class Movie {
    @Id
    @Column(name = "movie_id")
    private Long movieid;
    @Column(name = "like_count")
    private Long likeCount;

    @Builder
    public Movie(Long movieid, Long likeCount){
        this.movieid = movieid;
        this.likeCount = likeCount;
    }

    public void plusLikeCount(){
        this.likeCount = this.likeCount+1;
    }

    public void minusLikeCount(){
        this.likeCount = this.likeCount - 1;
    }

}
