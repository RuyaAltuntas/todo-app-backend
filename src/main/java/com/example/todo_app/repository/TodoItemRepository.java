package com.example.todo_app.repository;

import com.example.todo_app.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
    Optional<TodoItem> findByTitle(String title);
}