package com.app.todoapp.dto;

import com.app.todoapp.model.User;

public record UserDto(String id, String name, String email, String picture, int exp, int level) {
    // Factory method to map entity -> DTO
    public static UserDto from(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPicture(),
                user.getExp(),
                user.getLevel());
    }
}