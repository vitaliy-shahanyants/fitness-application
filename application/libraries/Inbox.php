<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Inbox
{
  function deleteMessages($id,$username){
    $SQL = "UPDATE fitness_inbox SET deleted = 'yes' WHERE id = ".$id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
  }
  function getInboxFrom($id,$other_id){
    $SQL = "SELECT fa.first_name,fa.last_name,fi.message,fi.date,fi.id,fi.read_it FROM fitness_inbox fi ".
      "INNER JOIN fitness_account_detail fa ".
      "ON fi.user_to = fa.user_id".
      " WHERE fi.user_from = ".$id." AND fi.deleted <> \"yes\" AND fi.user_to=".$other_id;
      $CI =& get_instance();
      $result = $CI->db->query($SQL);
      return ($result->result());
  }
  function getMessages($username){
    $SQL = "SELECT fa.first_name,fa.last_name,fi.message,fi.date,fi.id,fi.read_it FROM fitness_inbox fi ".
      "INNER JOIN fitness_account_detail fa ".
      "ON fi.user_to = fa.user_id".
      " WHERE fi.user_from = ".$username." AND fi.deleted <> \"yes\"";
      $CI =& get_instance();
      $result = $CI->db->query($SQL);
      return ($result->result());
  }
  function sendMessage($user_from,$user_to,$message){
    $CI =& get_instance();
    //$message =  $CI->db->escape($message);
    $SQL = "INSERT INTO fitness_inbox VALUES (NULL,".$user_to.",".$user_from.",'no','no',".$CI->db->escape($message).",'".date('Y/m/d')."')";

    $CI->db->query($SQL);
  }
  function getLikeUsers($like_username){
    $SQL = "SELECT username, fu.user_id, first_name,last_name FROM fitness_user fu INNER JOIN fitness_account_detail fa ON fu.user_id = fa.user_id WHERE fu.username LIKE '%"
    .$like_username."%' OR fa.first_name LIKE '%".$like_username."%' OR fa.last_name LIKE '%".$like_username."%' LIMIT 5";
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    //$result = $CI->db->query($SQL,array($like_username,$like_username,$like_username));
    return ($result->result());
  }
}
