<?php
  /*
   * ajax / view / todos.php
   * responds with users' todos in json format
   *
   * possible properties of json response
   * status [string]
   * status_code [int]
   * error_msg [string]
   * msg [string]
   * todos [array]
   * count [int]
  */

  //try starting the session
  if( session_start() ) {
    if( isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true ) {
      //user logged in

      require("../../config/config.php");

      //obtain username from session variable
      $username = $_SESSION['username'];

      try {
        $db = new PDO("mysql:host={$host};dbname={$db_name}", $db_user, $db_pass);

        $statement = $db->prepare('SELECT * FROM todos WHERE username = :username');
        $statement->bindParam(':username', $username);
        if( $statement->execute() ) {
          $todos = array();
          $count = 0;
          while( $row = $statement->fetch(PDO::FETCH_ASSOC) ) {
            $todo = array($row['id'], $row['todo'], $row['status']);
            array_push($todos, $todo);
            $count++;
          }
          $json = array("status" => "success", "status_code" => 1, "msg" => "Take a look at your todos below.", "todos" => $todos, "count" => $count);
          echo json_encode($json);
        } else {
          $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => "Error executing the prepared statement.");
          echo json_encode($json);
        }

      } catch(PDOException $e) {
        $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => $e->getMessage());
        echo json_encode($json);
        exit(1);    //exit with error
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
