package com.myticket.myticket.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class MovieLikeDTO {
    private Long no;
    private String userid;
    private Long movieid;
    private boolean status;
}

