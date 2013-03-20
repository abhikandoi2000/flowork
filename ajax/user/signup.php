<?php

  /*
  * / ajax / user / signup.php
  * signup a new user and reply with a json response
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
      $json = array("status" => "error", "status_code" => 0, "msg" => "You are already logged in, logout to signup for a different account.", "error_msg" => "User already logged in, thus cannot signin.");
      echo json_encode($json);
    } else {
      //user not logged in, so sign him up for a brand new account

      if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['mobile']) ) {
        //user credentials and info present

        /*<---validate info and credentials here--->*/

        //require the config file
        require('../../config/config.php');

        //obtain user credentials and info
        $username = $_POST['username'];
        $password = $_POST['password'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        //calculate sha1 hash of password
        $password_hash = sha1($password);
        //unset the password variable
        unset($password);

        //establish connection with db
        try {
          $db = new PDO("mysql:host={$host};dbname={$db_name}", $db_user, $db_pass);
          //check if user already exists
          $count_statement = $db->prepare('SELECT COUNT(*) FROM users WHERE username = ?');
          if( $count_statement->execute( array($username) ) ) {
            if( $count_statement->fetchColumn() > 0 ) {
              //username already registered
              $json = array("status" => "error", "status_code" => 0, "msg" => "Username already taken, try using a different one.", "error_msg" => "Username already present in database.");
              echo json_encode($json);
            } else {
              //signup the user to the db
              $statement = $db->prepare('INSERT INTO users (username, password, name, email, mobile) VALUES (:username, :password, :name, :email, :mobile)');
              $statement->bindParam(':username', $username);
              $statement->bindParam(':password', $password_hash);
              $statement->bindParam(':name', $name);
              $statement->bindParam(':email', $email);
              $statement->bindParam(':mobile', $mobile);
              if( $statement->execute() ) {
                //user registered successfully
                $json = array("status" => "signedup", "status_code" => 1, "msg" => "You have been signed up successfully.");
                echo json_encode($json);
              } else {
                $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => "Error executing the prepared statement.");
                echo json_encode($json);
              }
            }
          } else {
            $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured with the database, try again later.", "error_msg" => "Error executing the prepared statement to fetchColumn.");
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
        $json = array("status" => "error", "status_code" => 0, "msg" => "Fill all the fields with valid data.", "error_msg" => "User credentials and info were not posted as desired.");
        echo json_encode($json);
        //exit since user credentials were not posted as required
        exit(0);    //exit without errors
      }

    }
  } else {
    $json = array("status" => "error", "status_code" => 0, "msg" => "It seems that a problem has occured, try again later.", "error_msg" => "Session could not be started");
    echo json_encode($json);
    exit(1);    //exit with error
  }
?>
