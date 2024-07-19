package com.example.todo_app.service;

import com.example.todo_app.model.TaskStatus;
import com.example.todo_app.model.TodoItem;
import com.example.todo_app.model.User;
import com.example.todo_app.model.UserTask;
import com.example.todo_app.repository.TaskStatusRepository;
import com.example.todo_app.repository.TodoItemRepository;
import com.example.todo_app.repository.UserRepository;
import com.example.todo_app.repository.UserTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTaskService {

    @Autowired
    private UserTaskRepository userTaskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TodoItemRepository todoItemRepository;

    @Autowired
    private TaskStatusRepository taskStatusRepository;

    public List<UserTask> getAllUserTasks() {
        return userTaskRepository.findAllWithUserAndStatus();
    }

    public Optional<UserTask> getUserTaskById(Long id) {
        return userTaskRepository.findById(id);
    }

    public boolean deleteUserTask(Long id) {
        if (userTaskRepository.existsById(id)) {
            userTaskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UserTask save(UserTask userTask) {
        return userTaskRepository.save(userTask);
    }

    public UserTask addUserTask(UserTask userTask) {
        List<UserTask> existingTasks = userTaskRepository.findByUserIdAndTodoItemId(userTask.getUser().getId(), userTask.getTodoItem().getId());

        for (UserTask task : existingTasks) {
            if (!task.getId().equals(userTask.getId())) {
                task.setActive(false);
                userTaskRepository.save(task);
            }
        }

        userTask.setActive(true);
        return userTaskRepository.save(userTask);
    }

    public List<UserTask> getTasksByUserAndStatus(Long userId, Long statusId) {
        return userTaskRepository.findByUserIdAndTaskStatus_Id(userId, statusId);
    }

    public List<UserTask> getTasksByUserAndTodoItem(Long userId, Long todoItemId) {
        return userTaskRepository.findByUserIdAndTodoItemId(userId, todoItemId);
    }

    public Optional<UserTask> findById(Long id) {
        return userTaskRepository.findById(id);
    }

    public Optional<UserTask> updateUserTask(Long id, Long userId, Long todoItemId, Long taskStatusId, boolean isActive) {
        Optional<UserTask> userTaskOptional = userTaskRepository.findById(id);
        if (userTaskOptional.isPresent()) {
            UserTask userTask = userTaskOptional.get();

            userTask.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
            userTask.setTodoItem(todoItemRepository.findById(todoItemId).orElseThrow(() -> new RuntimeException("TodoItem not found")));
            userTask.setTaskStatus(taskStatusRepository.findById(taskStatusId).orElseThrow(() -> new RuntimeException("TaskStatus not found")));
            userTask.setActive(isActive);

            userTaskRepository.save(userTask);
            return Optional.of(userTask);
        } else {
            return Optional.empty();
        }
    }

    public List<UserTask> findByStatusId(Long statusId) {
        return userTaskRepository.findByTaskStatus_Id(statusId);
    }

    public List<UserTask> filterTasks(Long userId, Long statusId) {
        if (statusId == null || statusId == 0) { // Using 0 to represent "All"
            return userTaskRepository.findByUserId(userId);
        } else {
            return userTaskRepository.findByUserIdAndTaskStatus_Id(userId, statusId);
        }
    }

    public List<UserTask> findAllTasks() {
        return userTaskRepository.findAll();
    }
    // UserTaskService.java
    public List<UserTask> findByUserId(Long userId) {
        return userTaskRepository.findByUserId(userId);
    }

}
