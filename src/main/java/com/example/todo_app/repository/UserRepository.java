package com.example.todo_app.repository;

import com.example.todo_app.model.TodoItem;
import com.example.todo_app.model.User;
import com.example.todo_app.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todo_app.model.UserTask; // Replace with the actual package path


import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByName(String name);

    //filtreleme için
   // List<UserTask> findByUserIdAndStatusId(Long userId, Long statusId);

}
