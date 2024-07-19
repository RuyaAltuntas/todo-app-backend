package com.example.todo_app.controller;

import com.example.todo_app.model.TaskStatus;
import com.example.todo_app.repository.TaskStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//HTTP request for TaskStatus entitites
@RestController
@RequestMapping("/api/status")
public class TaskStatusController {

    @Autowired
    private TaskStatusRepository taskStatusRepository;

    //tüm statüleri çek
    @GetMapping("/allStatus")
    public List<TaskStatus> getAllStatuses() {
        return taskStatusRepository.findAll();
    }

    //id'ye göre bir statüs çek
    @GetMapping("/getStatusById/{id}")
    public Optional<TaskStatus> getStatusById(@PathVariable Long id) {
        return taskStatusRepository.findById(id);
    }

    //ekle
    @PostMapping("/addStatus")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createTaskStatus(@RequestBody TaskStatus taskStatus) {
        try {
            taskStatusRepository.save(taskStatus);
            return ResponseEntity.status(HttpStatus.CREATED).body("New status created.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating status.");
        }
    }
//id'ye göre statü adını değiştir
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable("id") long id, @RequestBody TaskStatus taskStatus) {
        Optional<TaskStatus> optionalTaskStatus = taskStatusRepository.findById(id);

        if (optionalTaskStatus.isPresent()) {
            TaskStatus existingTaskStatus = optionalTaskStatus.get();
            existingTaskStatus.setStatus(taskStatus.getStatus());
            taskStatusRepository.save(existingTaskStatus);
            return ResponseEntity.ok("Status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Status not found.");
        }
    }

    //id'ye göre sil
    @DeleteMapping("/deleteStatus/{id}")
    public ResponseEntity<String> deleteTaskStatus(@PathVariable Long id) {
        Optional<TaskStatus> taskStatus = taskStatusRepository.findById(id);
        if (taskStatus.isPresent()) {
            taskStatusRepository.delete(taskStatus.get());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Status deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Status not found.");
        }
    }

}
