package com.myticket.myticket.movie.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.myticket.myticket.common.util.Utils;
import com.myticket.myticket.movie.dto.MovieDTO;
import com.myticket.myticket.movie.dto.MovieLikeDTO;
import com.myticket.myticket.movie.repository.MovieLikeRepository;
import com.myticket.myticket.movie.repository.MovieRepository;
import com.myticket.myticket.movie.vo.Movie;
import com.myticket.myticket.movie.vo.MovieLike;
import com.myticket.myticket.user.repository.UserRepository;
import com.myticket.myticket.user.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    protected final Logger logger = LoggerFactory.getLogger(MovieService.class);

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final MovieLikeRepository likeRepository;

    @Transactional
    public List<MovieLikeDTO> findMovieLikeList(String userid){
        List<MovieLike> foundLike = likeRepository.findByUser_id(userid);
        return Utils.mapList(foundLike, MovieLikeDTO.class);
    }

    @Transactional
    public MovieLikeDTO findMovieLikeOne(Long movieid, String userid) {
        MovieLike foundLike = likeRepository.findByUser_idAndMovie_movieid(userid, movieid);
        if(foundLike == null) {
            return null;
        }

        return Utils.mapOne(foundLike, MovieLikeDTO.class);
    }

    @Transactional
    public MovieLikeDTO saveMovieLike(Long movieid, String userid) {

        User foundUser = userRepository.findById(userid);
        logger.info("found user :: {} ", foundUser);
        //user 없을때 return
        if(foundUser == null) {
            return null;
        } 

        logger.info("save movie Like excute :: movieid : {}", movieid);

        Movie movie = movieRepository.findById(movieid).orElse(null);
        //movie 없을때, 저장
        if(movie == null) {
            movie = Movie.builder().movieid(movieid).likeCount(Long.valueOf(0)).build();
            movieRepository.save(movie);
            logger.info("saved movie :: {} ", movie);
        }

        MovieLike like = likeRepository.findByUser_idAndMovie_movieid(userid, movieid);

        //like 없을때 저장
        if(like == null) {
            like = MovieLike.builder().user(foundUser).movie(movie).status(false).build();
            likeRepository.save(like);
            logger.info("saved movie like :: {} ", like);
        } 
        
        //cancle or like
        Movie foundMovie = movieRepository.findById(movieid).orElse(null);
        MovieLike foundLike = likeRepository.findByUser_idAndMovie_movieid(userid, movieid);

        if(foundLike.isStatus()) {
            foundMovie.minusLikeCount();
            foundLike.updateMovieLikeStatus(false);
        } else {
            foundMovie.plusLikeCount();
            foundLike.updateMovieLikeStatus(true);
        }


        return Utils.mapOne(foundLike, MovieLikeDTO.class);
    }

    public MovieDTO foundMovieLikeCount(Long movieid){
        Movie foundMovie = movieRepository.findById(movieid).orElse(null);
        if(foundMovie == null) {
            return null;
        }
        return Utils.mapOne(foundMovie, MovieDTO.class);
    }

    public List<MovieDTO> foundMovieList(List<MovieDTO> list) {

        List<Long> movieids = new ArrayList<>();
        for(MovieDTO m : list) {
            movieids.add(m.getMovieid());
        }

        List<Movie> foundMovieList = movieRepository.findMovieByMovieids(movieids);
        if(foundMovieList.isEmpty()) {
            return null;
        }
        return Utils.mapList(foundMovieList, MovieDTO.class);
    }
}
