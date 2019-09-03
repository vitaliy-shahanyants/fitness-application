<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Profile
{
  function getUserProfileContent($username){
    $CI =& get_instance();
    $SQL = "SELECT about_me,image,first_name,last_name,joined_date FROM fitness_user ".
    "INNER JOIN fitness_profile ON fitness_user.user_id = fitness_profile.user_id ".
    "INNER JOIN fitness_account_detail ON fitness_user.user_id = fitness_account_detail.user_id ".
    "WHERE fitness_user.username = '".$username."'";
    $result = $CI->db->query($SQL)->result()[0];
    echo json_encode($result);
  }
  function updateProfile($username,&$errorLog,$id){
    $errorLog = array();
    $collection = $_POST;
    if($_FILES != null){
      $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
      if($this->checkIfImage($ext)){
        $errorLog[] = 'Wrong image Type, We will only accept the following: git, jpeg, jpg, png';
      }
    }
    /*Check The input Boxes*/
    if(!preg_match('/^[a-zA-Z]{2,20}$/', $collection['first_name'])) {
      $errorLog[] = 'Invalid firstname. Firstname must be more than 3 characters alpha characters';
    }
    if(!preg_match('/^[a-zA-Z]{5,20}$/', $collection['last_name'])) {
      $errorLog[] = 'Invalid lastname. Lastname must be more than 3 characters alpha characters';
    }
    if(!preg_match('/^[a-zA-Z0-9_ \,\.]{10,}$/', $collection['about_me'])) {
      $errorLog[] = 'Invalid About Me. About me must be more than 10 characters alpha characters';
    }
    if(count($errorLog) > 0){
      return FALSE;
    }else{
      $this->makeUpdateProfile($username,$collection,$id);
      return TRUE;
    }
  }
  private function makeUpdateProfile($username,$collection,$id){
    if($_FILES != null){
      $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
      $image_name = $username.".".$ext;
      move_uploaded_file($_FILES['image']['tmp_name'], getcwd()."/assets/user_images/".$image_name);
      $SQL = "UPDATE fitness_profile SET about_me = '".$collection['about_me']."', image = '".$image_name."'".
        " WHERE user_id = '".$id."'";
    }else{
      $SQL = "UPDATE fitness_profile SET about_me = '".$collection['about_me']."'".
        " WHERE user_id = '".$id."'";
    }

    $CI =& get_instance();
    $CI->db->query($SQL);

    $SQL = "UPDATE fitness_account_detail SET first_name = '".$collection['first_name']."'".
      ", last_name = '".$collection['last_name']."' WHERE user_id = '".$id."'";
    $CI->db->query($SQL);
  }
  private function checkIfImage($ext){
    $supported_image = array(
        'gif',
        'jpg',
        'jpeg',
        'png'
    );
    if (in_array($ext, $supported_image)) {
        return TRUE;
    } else {
        return FALSE;
    }
  }
}
