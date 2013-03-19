<?php

  /*
  * ajax / user / login.php
  * log the user in and reply with a json response
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
      //user already logged in
      $json = array("status" => "loggedin", "status_code" => 1, "msg" => "You are already logged in, try to logout and then relogin.");
      echo json_encode($json);
    } else {
      //user not logged in already, so log him in if a valid user

      if(isset($_POST['username']) && isset($_POST['password'])) {
        //user credentials present
        
        //require the config file
        require('../../config/config.php');

        //obtain user credentials
        $username = $_POST['username'];
        $password = $_POST['password'];
        //calculate sha1 hash of password
        $password_hash = sha1($password);
        //unset the password variable
        unset($password);

        //establish connection with db
        try {
          $db = new PDO("mysql:host={$host};dbname={$db_name}", $db_user, $db_pass);
          $statement = $db->prepare('SELECT username, password FROM users WHERE username = ?');
          if( $statement->execute(array($username)) ) {
            $row = $statement->fetch(PDO::FETCH_ASSOC);
            if($row['username'] == $username && $row['password'] == $password_hash) {
              //user present in db
              //set session variables for the user
              $_SESSION['loggedin'] = true;
              $_SESSION['username'] = $username;
              //json response
              $json = array("status" => "loggedin", "status_code" => 1, "msg" => "You have been successfully logged in.");
              echo json_encode($json);
            } else {
              $json = array("status" => "error", "status_code" => 0, "msg" => "Username or password is incorrect.", "error_msg" => "User credentials do not match with one in the database.");
              echo json_encode($json);
            }
          } else {
            $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => "Error executing the prepared statement.");
            echo json_encode($json);
          }

          //close the connection to db
          $db = null;
        } catch(PDOException $e) {
          $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => $e->getMessage());
          echo json_encode($json);
          exit(1);    //exit with error
        }

      } else {
        $json = array("status" => "error", "status_code" => 0, "msg" => "Username and (or) password not provided.", "error_msg" => "User credentials were not posted as desired.");
        echo json_encode($json);
        //exit since no user credentials were posted
        exit(0);    //exit without errors
      }

    }
  } else {
    $json = array("status" => "error", "status_code" => 0, "msg" => "It seems that a problem has occured, try again later.", "error_msg" => "Session could not be started");
    echo json_encode($json);
    exit(1);    //exit with error
  }
?>
