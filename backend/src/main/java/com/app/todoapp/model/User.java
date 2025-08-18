package com.app.todoapp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id; // Google sub

    private String name;
    private String email;
    private String picture;

    // Optional: see all tasks owned by this user
    // @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval =
    // true)
    // private List<Task> tasks = new ArrayList<>();
}