package com.app.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.todoapp.model.User;

public interface UserRepository extends JpaRepository<User, String> {
}