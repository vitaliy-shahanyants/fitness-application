<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Login
{
    /* Login Authentication */
    function checkUserLogin($username,$password)
    {
      $CI =& get_instance();
      $row = $CI->db->query('SELECT * FROM fitness_user WHERE username = "'.$username.'" AND password = "'.$password.'" AND enabled = "yes"');
      return ($row->num_rows() > 0 ? TRUE:FALSE);
    }
    function loginSession($username,$password,&$errorLog){
      $errorLog = [];
      if(!preg_match('/^[a-zA-Z0-9]{5,}$/', $username)) {
        $errorLog[] = array('username' => 'Invalid username or password');
      }else{
        if(!preg_match('/^[a-zA-Z0-9!@#$%^&*()-\_+=]{5,20}$/', $password)) {
          $errorLog[] = array('password' => 'Invalid username or password');
        }
      }
      if(count($errorLog) > 0){
        return FALSE;
      }else{
        if($this->checkUserLogin($username,$password))
          return TRUE;
        else
          return FALSE;
      }
    }
    function getUserID($username){
      $CI =& get_instance();
      $SQL = 'SELECT * FROM fitness_user WHERE username = "'.$username.'"';
      $result = $CI->db->query($SQL);
      if($result->num_rows() > 0){
        $user_id = $result->result()[0]->user_id;
      }else{
        return NULL;
      }
      return $user_id;
    }
    function checkUsername($username){
      $CI =& get_instance();
      $row = $CI->db->query('SELECT * FROM fitness_user WHERE username = "'.$username.'"');
      return ($row->num_rows() > 0 ? TRUE:FALSE);
    }
    function getQuestion($username){
      $CI =& get_instance();
      $user_id = $this->getUserID($username);
      $SQL = "SELECT * FROM fitness_account_detail WHERE user_id = ".$user_id;
      $result = $CI->db->query($SQL)->result()[0];
      $random_number = rand(0,100);
      if($random_number <= 50 ){
        return $result->security_question_one;
      }else{
        return $result->security_question_one;
      }
    }
    function newPasswordEntry($username,$password,$security_question){
      if(!preg_match('/^[a-zA-Z0-9!@#$%^&*()-\_+=]{5,20}$/', $password)) {
        return FALSE;
      }
      if($this->checkSecurityQuestion($username,$security_question)){
        $SQL = "UPDATE user SET password = '".$password."' WHERE username = '".$username."'";
        $CI =& get_instance();
        $CI->db->query($SQL);
        return TRUE;
      }
      return FALSE;
    }
    function checkSecurityQuestion($username,$answer){
      $CI =& get_instance();
      $user_id = $this->getUserID($username);
      $SQL = "SELECT * FROM `fitness_account_detail` WHERE user_id = ".$user_id." and (security_answer_one = '".$answer."' or security_answer_two = '".$answer."')";
      $row = $CI->db->query($SQL);
      return ($row->num_rows() > 0 ? TRUE:FALSE);
    }
    /* Registration */
    function registerToUserTable($collection){
      $CI =& get_instance();
      $row = $CI->db->query("INSERT INTO fitness_user VALUES(NULL,'user','".$collection['username']."',".
      "'".$collection['password']."','yes')");
      $this->registerToAccountDetail($collection);
      $user_id = $this->getUserID($collection['username']);
      $CI->db->query("INSERT INTO fitness_profile VALUES(".$user_id.",'Please enter something about yourself','avatar_2x.png')");
      $CI->db->query("INSERT INTO fitness_body_weight VALUES(NULL,".$user_id.",0,'lb')");
      $CI->db->query("INSERT INTO fitness_body_fat VALUES(NULL,".$user_id.",0,0,0,0)");
      $CI->db->query("INSERT INTO fitness_body_mass_index VALUES(NULL,".$user_id.",0)");
    }
    function registerToAccountDetail($collection){
      $CI =& get_instance();
      $SQL = "SELECT user_id FROM fitness_user WHERE username = '".$collection['username']."'";
      $user_id = $CI->db->query($SQL)->result()[0]->user_id;

      $SQL = "INSERT INTO fitness_account_detail VALUES(NULL,".$user_id.",".
        "'".$collection['email']."',".
        "'".$collection['firstname']."',".
        "'".$collection['lastname']."',".
        "'".$collection['gender']."',".
        "".$collection['age'].",".
        "'".date('Y/m/d')."',".
        "'".$collection['security_question_one']."',".
        "'".$collection['security_answer_one']."',".
        "'".$collection['security_question_two']."',".
        "'".$collection['security_answer_two']."'".
        ")";
        $CI->db->query($SQL);
    }
    function registerSecurityQuestion($collection){

    }
    /* Security */
    function getSecurityQuestions(){
      $CI =& get_instance();
      $row = $CI->db->query('SELECT security_question FROM fitness_security_questions');
      return $row->result();
    }

    /* Validation */
    function validateInputFields($collection,&$errorLog){
      $errorLog = [];
      if(!preg_match('/^[a-zA-Z0-9]{5,}$/', $collection['username'])) {
        $errorLog[] = array('username' => 'Invalid username. Username must be more than 3 characters alphanumeric characters');
      }else{
        if($this->checkIFUsernameExists($collection['username'])){
          $errorLog[] = array('usernameExist' => 'Sorry but this username already exists');
        }
      }
      if(!preg_match('/^[a-zA-Z0-9!@#$%^&*()-\_+=]{5,20}$/', $collection['password'])) {
        $errorLog[] = array('password' => 'Invalid password. Password must be more than 5, and less than 20. No quotations');
      }
      if(!preg_match('/^[a-zA-Z]{2,20}$/', $collection['firstname'])) {
        $errorLog[] = array('firstname' => 'Invalid firstname. Firstname must be more than 3 characters alpha characters');
      }
      if(!preg_match('/^[a-zA-Z]{5,20}$/', $collection['lastname'])) {
        $errorLog[] = array('lastname' => 'Invalid lastname. Lastname must be more than 3 characters alpha characters');
      }
      if (!filter_var($collection['email'], FILTER_VALIDATE_EMAIL)) {
        $errorLog[] = array('email' => 'Invalid email.');
      }

      if(!preg_match('/^[a-zA-Z\ ]{2,}$/', $collection['security_answer_one'])) {
        $errorLog[] = array('security_answer_one' => 'You can only type alpha characters');
      }
      if(!preg_match('/^[a-zA-Z\ ]{2,}$/', $collection['security_answer_two'])) {
        $errorLog[] = array('security_answer_two' => 'You can only type alpha characters');
      }

      if(count($errorLog) > 0){
        return FALSE;
      }else{
        return TRUE;
      }
    }
    function checkIFUsernameExists($username){
      $CI =& get_instance();
      $row = $CI->db->query('SELECT * FROM fitness_user WHERE username = "'.$username.'"');
      return ($row->num_rows() > 0 ? TRUE:FALSE);
    }
    function checkIfAdmin($username){
      $CI =& get_instance();
      $row = $CI->db->query('SELECT * FROM fitness_user WHERE username = "'.$username.'" AND role = "admin"');
      return ($row->num_rows() > 0 ? TRUE:FALSE);
    }
}
