package com.myticket.myticket.common.util;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@Component
public class Utils {

    private final ModelMapper modelMapper;

    private static ModelMapper mapper;

    @PostConstruct
    public void init(){
        mapper = this.modelMapper;
    }

    public static <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source.stream()
          .map(element -> mapper.map(element, targetClass))
          .collect(Collectors.toList());
    }

    public static <S, T> T mapOne(Object source, Class<T> targetClass) {
        return mapper.map(source, targetClass);
    }
}
