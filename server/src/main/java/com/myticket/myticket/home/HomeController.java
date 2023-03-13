package com.myticket.myticket.home;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "hello";
    }
}
