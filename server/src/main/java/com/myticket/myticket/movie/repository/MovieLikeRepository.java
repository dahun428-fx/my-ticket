package com.myticket.myticket.movie.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.myticket.myticket.movie.vo.MovieLike;

public interface MovieLikeRepository extends CrudRepository<MovieLike, Long> {
    
    List<MovieLike> findByUser_id(String userid);
    MovieLike findByMovie_movieid(Long movieid);
    MovieLike findByUser_idAndMovie_movieid(String userid, Long movieid);

}
