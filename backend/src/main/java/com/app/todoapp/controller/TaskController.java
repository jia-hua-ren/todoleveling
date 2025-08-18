package com.app.todoapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.todoapp.model.Task;
import com.app.todoapp.service.TaskService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Iterable<Task> getTasks(Authentication auth) {
        // Object principal = auth.getPrincipal();

        // if (principal instanceof OAuth2User oAuth2User) {
        // String sub = oAuth2User.getAttribute("sub");
        // if (sub != null)
        // ownerId = sub; // stable Google user id
        // ownerEmail = oAuth2User.getAttribute("email");
        // }
        Iterable<Task> tasks = taskService.getAllTasks();
        return tasks;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestParam String title, Authentication auth) {
        String ownerId = auth.getName();
        String ownerEmail = null;

        Object principal = auth.getPrincipal();
        if (principal instanceof OAuth2User oAuth2User) {
            String sub = oAuth2User.getAttribute("sub");
            if (sub != null)
                ownerId = sub; // stable Google user id
        }

        Task saved = taskService.createTask(title, ownerId);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleTask(@PathVariable Long id) {
        taskService.toggleTask(id);
        return ResponseEntity.ok().build();
    }
}
