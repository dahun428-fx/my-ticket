package com.myticket.myticket.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.myticket.myticket.movie.vo.Movie;

public interface MovieRepository extends CrudRepository<Movie, Long> {

    @Query(nativeQuery = true, value="SELECT * FROM Movie as m WHERE m.movie_id IN (:movieids)")
    List<Movie> findMovieByMovieids(@Param("movieids") List<Long> movieids);
}
