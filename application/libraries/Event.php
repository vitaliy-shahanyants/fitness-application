<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Event
{
  function getCurrentEventDetails($user_id,$event_id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_event WHERE event_id=".$CI->db->escape($event_id);
    //$CI->db->escape($id)
    return $CI->db->query($SQL)->result()[0];
  }
  function updateEvent($user_id,$event_id,$event_name,$event_status,
  $event_description,$event_location,$event_start_date,$event_end_date){
    $CI =& get_instance();
    $SQL = "UPDATE fitness_event SET ".
      "event_name =".$CI->db->escape($event_name).", ".
      "event_status =".$CI->db->escape($event_status).", ".
      "event_description =".$CI->db->escape($event_description).", ".
      "event_location =".$CI->db->escape($event_name).", ".
      "event_start_date =".$CI->db->escape($event_start_date).", ".
      "event_end_date =".$CI->db->escape($event_end_date).
      " WHERE event_id = ".$CI->db->escape($event_id)." AND user_id = ".$CI->db->escape($user_id);
    //$CI->db->escape($id)
    $CI->db->query($SQL);
  }
  function createMyEvent($user_id,$event_name,$event_status,
  $event_description,$event_location,$event_start_date,$event_end_date){
    $CI =& get_instance();
    $SQL = "INSERT INTO fitness_event VALUES(NULL,".
      $CI->db->escape($user_id).",".
      $CI->db->escape($event_name).",".
      $CI->db->escape($event_status).",".
      $CI->db->escape($event_description).",".
      $CI->db->escape($event_location).",".
      $CI->db->escape($event_start_date).",".
      $CI->db->escape($event_end_date).
      ")";
    //$CI->db->escape($id)
    $CI->db->query($SQL);
  }
  function searchForEvent($user_id,$search_for){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_event WHERE event_name LIKE ".$CI->db->escape("%".$search_for."%")." ".
      "OR event_description LIKE ".$CI->db->escape("%".$search_for."%")." AND event_status = 'public'";
    //$CI->db->escape($id)
    return $CI->db->query($SQL)->result();
  }
  function joinEvent($user_id,$event_id){
    $CI =& get_instance();
    $SQL = "INSERT INTO fitness_joined_events VALUES(NULL,".$CI->db->escape($user_id).",".$CI->db->escape($event_id).")";
    //$CI->db->escape($id)
     $CI->db->query($SQL);
  }
  function getAllMyEvents($user_id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_event WHERE user_id = ".$CI->db->escape($user_id);
    //$CI->db->escape($id)
     return $CI->db->query($SQL)->result();
  }
  function deleteEvent($user_id,$event_id){
    $CI =& get_instance();
    $SQL = "DELETE FROM fitness_event WHERE event_id = ".$CI->db->escape($event_id). " AND user_id=".$CI->db->escape($user_id);
    //$CI->db->escape($id)
     return $CI->db->query($SQL);
  }
  function getAllOfTheEvents($user_id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_joined_events fje ".
    "INNER JOIN fitness_event fe ON fje.user_id = fe.user_id "
    ." WHERE fje.user_id = ".$CI->db->escape($user_id);
    //$CI->db->escape($id)
     return $CI->db->query($SQL)->result();
  }
}
