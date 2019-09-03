<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Admin
{
  function grabAllUsers(){
    $CI =& get_instance();
    //$CI->db->escape($id);
    $SQL = "";
    //return $CI->db->query($SQL)->result();
  }
  function adminRemoveUser(){
    $CI =& get_instance();
    //$CI->db->escape($id);
    $SQL = "";
    //return $CI->db->query($SQL)->result();
  }
  function trackThisUser($lon,$lat,$city,$region,$country){
    $CI =& get_instance();
    //$CI->db->escape($id);
    $SQL = "INSERT INTO fitness_user_tracking VALUES(NULL,".
      $CI->db->escape($_SERVER['REMOTE_ADDR']).",".
      $CI->db->escape($lon).",".
      $CI->db->escape($lat).",".
      $CI->db->escape($city).",".
      $CI->db->escape($region).",".
      $CI->db->escape($country)
      .")";
    return $CI->db->query($SQL);
  }
}
