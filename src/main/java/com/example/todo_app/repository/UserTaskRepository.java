/*package com.example.todo_app.repository;

import com.example.todo_app.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, Long> {
    List<UserTask> findByUserIdAndTodoItemId(Long userId, Long todoItemId);

    List<UserTask> findByUserIdAndTaskStatusId(Long userId, Long statusId);

    @Query("SELECT ut FROM UserTask ut JOIN FETCH ut.user JOIN FETCH ut.todoItem JOIN FETCH ut.taskStatus")
    List<UserTask> findAllWithUserAndStatus();

    //yeni
    List<UserTask> findByUserId(Long userId);
    List<UserTask> findByStatusId(Long statusId);
    List<UserTask> findByUserIdAndStatusId(Long userId, Long statusId);
}
*/
package com.example.todo_app.repository;

import com.example.todo_app.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, Long> {
    List<UserTask> findByUserId(Long userId);

    List<UserTask> findByUserIdAndTodoItemId(Long userId, Long todoItemId);

    List<UserTask> findByUserIdAndTaskStatus_Id(Long userId, Long statusId);

    @Query("SELECT ut FROM UserTask ut JOIN FETCH ut.user JOIN FETCH ut.todoItem JOIN FETCH ut.taskStatus")
    List<UserTask> findAllWithUserAndStatus();

    List<UserTask> findByTaskStatus_Id(Long statusId);


}






