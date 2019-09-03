<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Tracking
{
  function trackingGetWorkoutRoutines($id,$start=NULL,$end=NULL){
    $CI =& get_instance();
    if($start==NULL || $end==NULL){
      $SQL = "SELECT fwrl.weight,fwe.exercise_name,fwrl.date,fwe.exercise_type FROM fitness_workout_routine_log fwrl ".
      "INNER JOIN fitness_workout_exercise fwe ON fwrl.exercise_id = fwe.id ".
      "WHERE fwrl.user_id = ".$CI->db->escape($id);
    }else{
      $SQL = "SELECT fwrl.weight,fwe.exercise_name,fwrl.date,fwe.exercise_type FROM fitness_workout_routine_log fwrl ".
      "INNER JOIN fitness_workout_exercise fwe ON fwrl.exercise_id = fwe.id ".
      "WHERE fwrl.user_id = ".$CI->db->escape($id)." AND fwrl.date BETWEEN ".$CI->db->escape($start)
        ." AND ".$CI->db->escape($end)." ";
    }

    return $CI->db->query($SQL)->result();
  }

  function trackingGetBodyMeasurments($id,$start=NULL,$end=NULL,$body){
    if($body == 'body_fat'){
      return $this->getBodyFat($id,$start,$end);
    }else{
      return $this->getBMI($id,$start,$end);
    }
  }
  function getBMI($id,$start=NULL,$end=NULL){
    $CI =& get_instance();
    if($start==NULL || $end==NULL){
      $SQL = "SELECT fbmi.date,fbmi.mass_index as measure FROM fitness_body_mass_index_log fbmi ".
      "WHERE fbmi.user_id = ".$CI->db->escape($id);
    }else{
      $SQL = "SELECT fbmi.date,fbmi.mass_index as measure FROM fitness_body_mass_index_log fbmi ".
      "WHERE fbmi.user_id = ".$CI->db->escape($id)." AND fbmi.date BETWEEN ".$CI->db->escape($start)
        ." AND ".$CI->db->escape($end)." ";
    }

    return $CI->db->query($SQL)->result();
  }
  function getBodyFat($id,$start=NULL,$end=NULL){
    $CI =& get_instance();

    if($start==NULL || $end==NULL){
      $SQL = "SELECT fbf.date,fbf.body_fat as measure FROM fitness_body_fat_log fbf ".
      "WHERE fbf.user_id = ".$CI->db->escape($id);
    }else{
      $SQL = "SELECT fbf.date,fbf.body_fat as measure FROM fitness_body_fat_log ".
      "WHERE fbf.user_id = ".$CI->db->escape($id)." AND fbf.date BETWEEN ".$CI->db->escape($start)
        ." AND ".$CI->db->escape($end)." ";
    }
    return $CI->db->query($SQL)->result();
  }
}
