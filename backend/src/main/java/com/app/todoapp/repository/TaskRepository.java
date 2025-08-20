package com.app.todoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.todoapp.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByOwnerId(String ownerId);
}
