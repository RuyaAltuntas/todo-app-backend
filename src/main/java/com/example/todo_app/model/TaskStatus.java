package com.example.todo_app.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class TaskStatus extends BaseEntity {

    private String status;

    @Column(name = "is_active")
    private boolean isActive;

    // Getters and setters
    public String getStatus() {
        return status;
    }

    @PrePersist
    protected void onCreate() {
        this.isActive = true; // Ensure new TaskStatus is active by default
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
