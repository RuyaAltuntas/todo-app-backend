package com.example.todo_app.controller;

import com.example.todo_app.model.TaskStatus;
import com.example.todo_app.model.TodoItem;
import com.example.todo_app.repository.TaskStatusRepository;
import com.example.todo_app.repository.TodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
//ToDoItem class = Task class
@RestController
@RequestMapping("/api/todo")
public class TodoItemController {

    @Autowired
    private TodoItemRepository todoItemRepository;
    @Autowired
    private TaskStatusRepository taskStatusRepository; // Add this line


    // Return all tasks
    @GetMapping("/allTasks")
    public ResponseEntity<List<TodoItem>> getAllTasks() {
        List<TodoItem> tasks = todoItemRepository.findAll();
        return ResponseEntity.ok(tasks);
    }

    // Return 1 task by id
    @GetMapping("/getTaskById/{id}")
    public ResponseEntity<TodoItem> getTaskById(@PathVariable Long id) {
        Optional<TodoItem> task = todoItemRepository.findById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    // Add task
    @PostMapping("/addTask")
    public ResponseEntity<String> createTodoItem(@RequestBody TodoItem todoItem) {
        try {
            todoItemRepository.save(todoItem);
            return ResponseEntity.status(HttpStatus.CREATED).body("Yeni task oluşturuldu..");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
        }
    }

//idye göre task'ın statüsünü değiştirir
    @PutMapping("/changeStatus/{id}")
    public ResponseEntity<String> updateItemStatus(@PathVariable("id") Long id,
                                                   @RequestBody TodoItem todoItem) {
        Optional<TodoItem> optionalTodoItem = todoItemRepository.findById(id);

        if (optionalTodoItem.isPresent()) {
            TodoItem existingTodoItem = optionalTodoItem.get();


            if (todoItem.getStatus() != null) {
                //statü değiştiği takdirde
                TaskStatus newStatus = todoItem.getStatus();
                TaskStatus currentStatus = existingTodoItem.getStatus();

                if (!newStatus.equals(currentStatus)) {
                    // önceki statü isActive = false
                    if (currentStatus != null) {
                        currentStatus.setActive(false);
                        taskStatusRepository.save(currentStatus);
                    }

                    newStatus.setActive(true); //yeni statü için isActive true
                    taskStatusRepository.save(newStatus);  //yeni statüyü kaydet
                    existingTodoItem.setStatus(newStatus);
                    todoItemRepository.save(existingTodoItem); //updated itemi kaydet
                    return ResponseEntity.ok("Statü güncellendi..");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Statü değeri eski değer ile aynı.");
                }
            }

            else { //eksik giriş
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Statü null olamaz");
            }
        } else { //task id'si hatalı girildi
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task bulunamadı..");
        }
    }
    // Delete task
    @DeleteMapping("/deleteItem/{id}")
    public ResponseEntity<String> deleteTodoItem(@PathVariable Long id) {
        Optional<TodoItem> todoItem = todoItemRepository.findById(id);
        if (todoItem.isPresent()) {
            todoItemRepository.delete(todoItem.get());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // No content to return
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task bulunamadı..");
        }
    }
}


