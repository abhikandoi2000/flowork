<?php

  /*
  * ajax / edit / todo.php
  * modify or add a todo and reply with a json response
  * 
  * possible properties of json response
  * status [string]
  * status_code [int]
  * error_msg [string]
  * msg [string]
  */

  //try starting the session
  if( session_start() ) {
    if( isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true ) {
      //user logged in
      if(isset($_POST['task']) && isset($_POST['todo_id']) && isset($_POST['todo'])) {
        //task present in an acceptable format

        require("../../config/config.php");

        //obtain todo task and username
        $task = $_POST['task'];   //new || modify || strike || done
        $todo_id = $_POST['todo_id'];
        $todo = $_POST['todo'];
        $username = $_SESSION['username'];
        $owner = false;

        try {
          $db = new PDO("mysql:host={$host};dbname={$db_name}", $db_user, $db_pass);


          //no need to check if the user owns a todo for a new todo
          if($task == 'new') {
            $statement = $db->prepare('INSERT INTO todos (username, todo, status) VALUES (:username, :todo, :status)');
            $status = 'open';
            $statement->bindParam(':username', $username);
            $statement->bindParam(':todo', $todo);
            $statement->bindParam(':status', $status);
            //execute the statement to perform the task
            if( $statement->execute() ) {
              $json = array("status" => "done", "status_code" => 1, "msg" => "Task performed successfully.");
              echo json_encode($json);
            } else {
              $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => "Error executing the prepared statement.");
              echo json_encode($json);
            }
            $db = null;
            exit(0);    //exit without error
            /* Note: here exit was used because now we need to check if the user is the owner of the todo
             * for some task other than 'new'
            */
          }

          //check if the user owns the todo task
          $check_statement = $db->prepare('SELECT username FROM todos WHERE id = :todo_id');
          $check_statement->bindParam(':todo_id', $todo_id);
          if( $check_statement->execute() ) {
            $owner_username = $check_statement->fetchColumn();
            //echo $owner_username;
            if($owner_username == $username) {
              $owner = true;
            }
          }

          if( $owner ) {
            //user is owner of the todo
            
            if($task == 'strike') {
              $statement = $db->prepare('UPDATE todos set status = :status WHERE id = :todo_id');
              $status = 'striked';
              $statement->bindParam(':status', $status);
              $statement->bindParam(':todo_id', $todo_id);
            } elseif($task == 'modify') {
              $statement = $db->prepare('UPDATE todos set todo = :todo WHERE id = :todo_id');
              $statement->bindParam(':todo', $todo);
              $statement->bindParam(':todo_id', $todo_id);
            } elseif($task == 'done') {
              /*$statement = $db->prepare('DELETE FROM todos WHERE id = :todo_id');
              $statement->bindParam(':todo_id', $todo_id);*/
              //do not display tasks with status='done'
              $statement = $db->prepare('UPDATE todos set status = :status WHERE id = :todo_id');
              $status = 'done';
              $statement->bindParam(':status', $status);
              $statement->bindParam(':todo_id', $todo_id);
            } else {
              $json = array("status" => "error", "status_code" => 0, "msg" => "Stop playing around, snoopy.", "error_msg" => "Not a valid operation it is.");
              echo json_encode($json);
              exit(0);    //exit without error
            }

            //execute the statement to perform the task
            if( $statement->execute() ) {
              $json = array("status" => "done", "status_code" => 1, "msg" => "Task performed successfully.");
              echo json_encode($json);
            } else {
              $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => "Error executing the prepared statement.");
              echo json_encode($json);
            }
          } else {
            //user does not own this todo

            $json = array("status" => "error", "status_code" => 0, "msg" => "Sorry, but it seems like you don't own this todo.", "error_msg" => "User in not the owner of this todo.");
            echo json_encode($json);
          }

        } catch(PDOException $e) {
          $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => $e->getMessage());
          echo json_encode($json);
          exit(1);    //exit with error
        }
      } else {
        $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured while performing this operation, try again later.", "error_msg" => "Task related info was not posted as desired.");
        echo json_encode($json);
        //exit since user credentials were not posted as required
        exit(0);    //exit without errors
      }

      
    } else {
      //user not logged in already, so ask notify him to login
      $json = array("status" => "error", "status_code" => 0, "msg" => "You are not logged in to be able to do that.", "error_msg" => "User not logged in, hence does not have appropriate permissions.");
      echo json_encode($json);

    }
  } else {
    $json = array("status" => "error", "status_code" => 0, "msg" => "It seems that a problem has occured, try again later.", "error_msg" => "Session could not be started");
    echo json_encode($json);
    exit(1);    //exit with error
  }
?>