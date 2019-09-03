<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Createexercise
{
  function onCreateExercise($user_id,$exe){
    $CI =& get_instance();

    $SQL = "INSERT INTO fitness_workout_exercise VALUES(NULL,"
      .$user_id.
      ",'".
      $exe['exercise_name']
      ."','".
      $exe['exercise_type']
      ."','".
      $exe['exercise_sets']
      ."','".
      $exe['exercise_reps']
      ."','".
      $exe['exercise_weight']
      ."','".
      $exe['exercise_weight_type']
      ."',0)";
      $CI->db->query($SQL);
      return TRUE;
  }
  function onCreateCardio($user_id,$exe){
    $CI =& get_instance();

    $SQL = "INSERT INTO fitness_workout_exercise VALUES(NULL,"
      .$user_id.
      ",'".
      $exe['exercise_name']
      ."','".
      $exe['exercise_type']
      ."','".
      $exe['cardio_distance']
      ."',".
      $exe['cardio_speed']
      .",'".
      $exe['cardio_time']
      ."','".
      $exe['cardio_distance_type']
      ."',".
      $exe['cardio_incline']
      .")";
      $CI->db->query($SQL);
      return TRUE;
  }

  function onGetExercise($user_id){
    $SQL = "SELECT * FROM fitness_workout_exercise WHERE user_id =".$user_id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function onGetCardio($user_id){
    $SQL = "SELECT * FROM fitness_workout_cardio WHERE user_id =".$user_id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function getMuscleGroups($user_id,$id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_workout_routine_exercises fwe ".
    "INNER JOIN fitness_workout_exercise fe ON fwe.exercise_id = fe.id ".
    "WHERE workout_routine_id = ".$id;
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
}
