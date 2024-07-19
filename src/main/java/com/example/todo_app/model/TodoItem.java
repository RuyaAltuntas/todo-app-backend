package com.example.todo_app.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
public class TodoItem extends BaseEntity {

    private String title;
    private String description;

    @ManyToOne
    private TaskStatus status;

    @Column(name = "is_active")
    private boolean isActive;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        this.isActive = true;
    }
    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }
}



