package com.example.todo_app.dto;

public class UserTaskUpdateRequest {
    private Long userId;
    private Long todoItemId;
    private Long taskStatusId;
    private String taskTitle;
    private boolean isActive;

    // Getters and setters


    public Long getTodoItemId() {
        return todoItemId;
    }

    public void setTodoItemId(Long todoItemId) {
        this.todoItemId = todoItemId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTaskStatusId() {
        return taskStatusId;
    }

    public void setTaskStatusId(Long taskStatusId) {
        this.taskStatusId = taskStatusId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
