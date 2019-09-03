<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Accountdetails
{
  function deleteAccount($username, $user_id,$feedback){
    $CI =& get_instance();
    // $SQL = "DELETE FROM fitness_user WHERE username = '".$username."'";
    // $CI->db->query($SQL);
    $SQL = "UPDATE fitness_user SET enabled = 'no' WHERE username = '".$username."'";
    $CI->db->query($SQL);
    $SQL = "INSERT INTO fitness_feedback VALUES(NULL,'".$user_id."','".$feedback."')";
    $CI->db->query($SQL);
  }
  function getAccountDetails($username){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_user WHERE username = '".$username."'";
    $result_user = $CI->db->query($SQL)->result()[0];
    $SQL = "SELECT * FROM fitness_account_detail WHERE user_id = ".$result_user->user_id;
    $result_account = $CI->db->query($SQL)->result()[0];
    $collection = array(
      'username' => $result_user->username,
      'password' => $result_user->password,
      'first_name' => $result_account->first_name,
      'last_name' => $result_account->last_name,
      'email' => $result_account->email,
      'gender' => $result_account->gender,
      'age' => $result_account->age,
      'security_question_one' => $result_account->security_question_one,
      'security_answer_one' => $result_account->security_answer_one,
      'security_question_two' => $result_account->security_question_two,
      'security_answer_two' => $result_account->security_answer_two,
    );
    return $collection;
  }
  function updateAccountDetails($collection,&$errorLog){
    if(!$this->validateInputFields($collection,$errorLog)){
      return FALSE;
    }
    $CI =& get_instance();
    $user_id = $this->getUserID($collection['username']);
    $SQL = "UPDATE user SET username = '".$collection['username']."', password = '"
      .$collection['password']."' WHERE username = '"
      .$collection['username']."' AND user_id = ".$user_id;
    $CI->db->query($SQL);
    $SQL = "UPDATE account_detail SET first_name = '".$collection['first_name']."', "
      ."last_name = '".$collection['last_name']."', "
      ."email = '".$collection['email']."', "
      ."gender = '".$collection['gender']."', "
      ."age = '".$collection['age']."', "
      ."security_question_one = '".$collection['security_question_one']."', "
      ."security_answer_one = '".$collection['security_answer_one']."', "
      ."security_question_two = '".$collection['security_question_two']."', "
      ."security_answer_two = '".$collection['security_answer_two']."' WHERE ".
      "user_id = ".$user_id;
      $CI->db->query($SQL);
      return TRUE;
  }
  function getUserID($username){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_user WHERE username = '".$username."'";
    $result_user = $CI->db->query($SQL)->result()[0];
    return $result_user->user_id;
  }
  /* Validation */
  function validateInputFields($collection,&$errorLog){
    $errorLog = [];
    if(!preg_match('/^[a-zA-Z0-9]{5,}$/', $collection['username'])) {
      $errorLog[] = array('username' => 'Invalid username. Username must be more than 3 characters alphanumeric characters');
    }
    if(!preg_match('/^[a-zA-Z0-9!@#$%^&*()-\_+=]{5,20}$/', $collection['password'])) {
      $errorLog[] = array('password' => 'Invalid password. Password must be more than 5, and less than 20. No quotations');
    }
    if(!preg_match('/^[a-zA-Z]{5,20}$/', $collection['first_name'])) {
      $errorLog[] = array('first_name' => 'Invalid firstname. Firstname must be more than 3 characters alpha characters');
    }
    if(!preg_match('/^[a-zA-Z]{5,20}$/', $collection['last_name'])) {
      $errorLog[] = array('last_name' => 'Invalid lastname. Lastname must be more than 3 characters alpha characters');
    }
    if (!filter_var($collection['email'], FILTER_VALIDATE_EMAIL)) {
      $errorLog[] = array('email' => 'Invalid email.');
    }
    // if(!preg_match('/^[a-zA-Z\ ]{2,}$/', $collection['security_question_one'])) {
    //   $errorLog[] = array('security_question_one' => 'Security Question One: You can only type alpha characters');
    // }
    if(!preg_match('/^[a-zA-Z\ ]{2,}$/', $collection['security_answer_one'])) {
      $errorLog[] = array('security_answer_one' => 'Security Answer One: You can only type alpha characters');
    }
    // if(!preg_match('/^[a-zA-Z\ ]{2,}$/', $collection['security_question_two'])) {
    //   $errorLog[] = array('security_question_two' => 'Security Question Two: You can only type alpha characters');
    // }
    if(!preg_match('/^[a-zA-Z\ ]{2,}$/', $collection['security_answer_two'])) {
      $errorLog[] = array('security_answer_two' => 'Security Answer Two: You can only type alpha characters');
    }

    if(count($errorLog) > 0){
      return FALSE;
    }else{
      return TRUE;
    }
  }
}
