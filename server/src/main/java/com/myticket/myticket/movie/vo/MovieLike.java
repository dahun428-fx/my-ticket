package com.myticket.myticket.movie.vo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.myticket.myticket.user.vo.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Entity
@Table(name ="movie_like")
@Data
@RequiredArgsConstructor
@ToString
@AllArgsConstructor
public class MovieLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", columnDefinition = "VARCHAR(100)")
    private User user;

    @ManyToOne(targetEntity = Movie.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id")
    private Movie movie;

    @Column
    private boolean status;

    @Transient
    private String userid;
    @Transient
    private Long movieid;

    @Builder
    public MovieLike(User user, Movie movie, boolean status){
        this.user = user;
        this.movie = movie;
        this.status = status;
    }

    public void updateMovieLikeStatus(boolean status) {
        this.status = status;
    }

    public Long getMovieid(){
        return this.movie.getMovieid();
    }

    public String getUserid() {
        return this.user.getId();
    }
}
