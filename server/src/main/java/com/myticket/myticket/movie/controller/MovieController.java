package com.myticket.myticket.movie.controller;

import java.net.http.HttpHeaders;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myticket.myticket.movie.dto.MovieDTO;
import com.myticket.myticket.movie.dto.MovieLikeDTO;
import com.myticket.myticket.movie.service.MovieService;
import com.myticket.myticket.user.vo.User;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(value = "api/v1/movie")
@AllArgsConstructor
public class MovieController {

    protected final Logger logger = LoggerFactory.getLogger(MovieController.class);
    
    private final MovieService movieService;

    @GetMapping(value = "/get/like")
    public ResponseEntity<List<MovieLikeDTO>> getMovieLikeList(){
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("getMovieLikeList user : {}", user);
        if(user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        String currentUserId = user.getUsername();
        List<MovieLikeDTO> dto = movieService.findMovieLikeList(currentUserId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping(value = "/get/like/{movieId}")
    public ResponseEntity<MovieLikeDTO> getMovieLikeOne(@PathVariable("movieId") Long movieId){
        System.out.println("getMovieLikeOne :: "+SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        logger.info("getMovieLikeOne user : {}", user);
        if(user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        String currentUserId = user.getUsername();
        MovieLikeDTO dto = movieService.findMovieLikeOne(movieId, currentUserId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping(value = "/add/like/{movieId}")
    public ResponseEntity<MovieLikeDTO> saveMovieLike(@PathVariable("movieId") Long movieId){
         UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       
        logger.info("/add/like/ user => {}", userDetails);
        if(userDetails == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        MovieLikeDTO dto = movieService.saveMovieLike(movieId, userDetails.getUsername());
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping(value = "/get/movie")
    public ResponseEntity<List<MovieDTO>> getMovieList(@RequestBody List<MovieDTO> list){

        List<MovieDTO> dto = movieService.foundMovieList(list);

        return new ResponseEntity<List<MovieDTO>>(dto, HttpStatus.OK);
    }
}
