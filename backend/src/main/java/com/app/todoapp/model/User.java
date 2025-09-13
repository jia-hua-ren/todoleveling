package com.app.todoapp.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")

public class User {
    @Id
    private String id; // Google sub

    private String name;
    private String email;
    private String picture;

    @Builder.Default
    private Instant createdAt = Instant.now();

    @Builder.Default
    private int level = 1;

    @Builder.Default
    private int exp = 0;

    // Optional: see all tasks owned by this user
    // @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval =
    // true)
    // private List<Task> tasks = new ArrayList<>();
}