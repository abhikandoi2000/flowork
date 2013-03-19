<?php
  /*
   * ajax / user / logout.php
   * logout the user and respond with json
   *
  */
  //try starting the session
  if( session_start() ) {
    if( isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true ) {
      //user logged in
      if(session_destroy()) {
        $json = array("status" => "loggedout", "status_code" => 1, "msg" => "You have been successfully logged out.");
        echo json_encode($json);
      } else {
        $json = array("status" => "error", "status_code" => 0, "msg" => "A problem occured while performing the request, try deleting your cookies in case the problem persists.", "error_msg" => "Session destroy failed");
        echo json_encode($json);
      }
      
    } else {
      //user not logged in already, so ask or notify him to login
      $json = array("status" => "error", "status_code" => 0, "msg" => "You are logged out already.", "error_msg" => "User not logged in, hence cannot logout.");
      echo json_encode($json);
    }
  } else {
    $json = array("status" => "error", "status_code" => 0, "msg" => "It seems that a problem has occured, try again later.", "error_msg" => "Session could not be started");
    echo json_encode($json);
    exit(1);    //exit with error
  }
?>
