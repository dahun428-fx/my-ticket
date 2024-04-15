package com.myticket.myticket.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MovieDTO {
    private Long movieid;
    private Long likeCount;
}
