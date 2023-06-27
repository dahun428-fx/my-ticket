package com.myticket.myticket.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.myticket.myticket.movie.vo.MovieLike;

public interface MovieLikeRepository extends CrudRepository<MovieLike, Long> {
    
    List<MovieLike> findByUser_id(String userid);
    @Query(value="SELECT * FROM movie_like m WHERE m.user_id = :userid AND m.status = 1", nativeQuery=true)
    List<MovieLike> findByUser_idAndMovieLike_statusTrue(@Param("userid") String userid);
    MovieLike findByMovie_movieid(Long movieid);
    MovieLike findByUser_idAndMovie_movieid(String userid, Long movieid);

}
