package com.example.todo_app.controller;

import com.example.todo_app.dto.AddTaskRequest;
import com.example.todo_app.dto.UserTaskUpdateRequest;
import com.example.todo_app.exception.ResourceNotFoundException;
import com.example.todo_app.model.TaskStatus;
import com.example.todo_app.model.TodoItem;
import com.example.todo_app.model.User;
import com.example.todo_app.model.UserTask;
import com.example.todo_app.repository.TaskStatusRepository;
import com.example.todo_app.repository.TodoItemRepository;
import com.example.todo_app.repository.UserRepository;
import com.example.todo_app.repository.UserTaskRepository;

import com.example.todo_app.service.UserTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/userTask")
public class UserTaskController {


    @Autowired
    private TodoItemRepository todoItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskStatusRepository taskStatusRepository;

    @Autowired
    private UserTaskService userTaskService;

    @Autowired
    private UserTaskRepository userTaskRepository;

    //JOİNLENEN tablodan tüm datayı çek
    @GetMapping("/allTasks")
    public List<UserTask> getAllUserTasks() {
        return userTaskService.getAllUserTasks();
    }

    @GetMapping("/getTaskById/{id}")
    public ResponseEntity<UserTask> getUserTaskById(@PathVariable Long id) {
        return userTaskService.getUserTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //sil
    @DeleteMapping("/deleteUserTask/{id}")
    public ResponseEntity<String> deleteUserTask(@PathVariable Long id) {
        return userTaskService.deleteUserTask(id)
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).body("User-task relationship deleted successfully.")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("User-task relationship not found.");
    }


@PostMapping("/addUserTask")
public ResponseEntity<UserTask> addUserTask(@RequestBody UserTask userTask) {
    UserTask createdTask = userTaskService.addUserTask(userTask);
    return ResponseEntity.ok(createdTask);
}

//filtreleme butonu için
@GetMapping("/filter")
public ResponseEntity<List<UserTask>> filterTasks(
        @RequestParam(required = false) Long userId,
        @RequestParam(required = false) Long statusId) {

    List<UserTask> tasks;
    if (statusId == null || statusId == 0) { // Using 0 to represent "All"
        if (userId != null) {
            tasks = userTaskService.findByUserId(userId);
        } else {
            tasks = userTaskService.findAllTasks();
        }
    } else if (userId != null) {
        tasks = userTaskService.filterTasks(userId, statusId);
    } else {
        tasks = userTaskService.findByStatusId(statusId);
    }

    return ResponseEntity.ok(tasks);
}


    @PostMapping("/addTask")
    public ResponseEntity<TodoItem> addTask(@RequestBody AddTaskRequest request) {
        // Find the user and task status
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        TaskStatus taskStatus = taskStatusRepository.findById(request.getTaskStatusId())
                .orElseThrow(() -> new RuntimeException("Task status not found"));

        // Create and save the TodoItem
        TodoItem todoItem = new TodoItem();
        todoItem.setTitle(request.getTaskTitle());
        todoItem.setStatus(taskStatus);
        todoItem.setActive(true);
        TodoItem savedTodoItem = todoItemRepository.save(todoItem);

        // Create and save the UserTask
        UserTask userTask = new UserTask();
        userTask.setUser(user);
        userTask.setTodoItem(savedTodoItem);
        userTask.setTaskStatus(taskStatus);
        userTask.setActive(true);
        userTask.setCreationTime(LocalDateTime.now());
        userTask.setUpdatedTime(LocalDateTime.now());
        userTaskRepository.save(userTask);

        return ResponseEntity.ok(savedTodoItem);
    }

    //task title update et
    @PutMapping("/updateUserTask/{id}")
    public ResponseEntity<?> updateTaskTitle(@PathVariable("id") Long id, @RequestBody UserTask request) {
        Optional<UserTask> existingTask = userTaskRepository.findById(id);
        if (existingTask.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }

        UserTask task = existingTask.get();
        String taskTitle = request.getTaskTitle();
        task.setTaskTitle(taskTitle);
        userTaskRepository.save(task);

        return ResponseEntity.ok("Task title updated successfully");
    }








}







