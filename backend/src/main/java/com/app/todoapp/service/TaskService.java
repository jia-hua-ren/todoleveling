package com.app.todoapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.todoapp.model.Task;
import com.app.todoapp.model.User;
import com.app.todoapp.repository.TaskRepository;
import com.app.todoapp.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;

    }

    public Iterable<Task> getTasksByOwner(String ownerId) {
        return taskRepository.findByOwnerId(ownerId);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(String title, String ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(title);
        task.setOwner(owner);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public void updateTask(Long id, String newTitle) {
        taskRepository.findById(id).ifPresent(task -> {
            task.setTitle(newTitle);
            taskRepository.save(task);
        });
    }

    // TODO: implement toggle task completion

}
