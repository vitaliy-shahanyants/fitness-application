<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Search
{
  function searchByRoutineName($searchFor){
    $CI =& get_instance();
    $SQL="SELECT fwr.id,fwr.user_id,fwr.routine_name,fwr.public,fwr.day_of_week,fad.first_name,fad.last_name, ".
    "(SELECT AVG(rating) FROM `ratings_of_workout_routines` WHERE workout_routine_id = fwr.id) AS 'rating' ".
    "FROM fitness_workout_routine fwr ".
    "INNER JOIN fitness_user fu ON fwr.user_id = fu.user_id ".
    "INNER JOIN fitness_account_detail fad ON fu.user_id = fad.user_id ".
    "WHERE routine_name LIKE ".$CI->db->escape("%".$searchFor."%")." AND public = 'public'";
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function searchByUsername($searchFor){
    $CI =& get_instance();
    $SQL="SELECT fwr.id,fwr.user_id,fwr.routine_name,fwr.public,fwr.day_of_week,fad.first_name,fad.last_name, ".
    "(SELECT AVG(rating) FROM `ratings_of_workout_routines` WHERE workout_routine_id = fwr.id) AS 'rating' ".
    "FROM fitness_workout_routine fwr ".
    "INNER JOIN fitness_user fu ON fwr.user_id = fu.user_id ".
    "INNER JOIN fitness_account_detail fad ON fu.user_id = fad.user_id ".
    "WHERE fu.username = ".$CI->db->escape($searchFor)." AND fwr.public = 'public'";
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function searchByMuscleGroup($searchFor){
    $CI =& get_instance();
    $SQL="SELECT fwr.id,fwr.user_id,fwr.routine_name,fwr.public,fwr.day_of_week,fad.first_name,fad.last_name, ".
    "(SELECT AVG(rating) FROM `ratings_of_workout_routines` WHERE workout_routine_id = fwr.id) AS 'rating' ".
    "FROM fitness_workout_exercise fwe ".
    "INNER JOIN fitness_workout_routine_exercises fwre ON fwe.id = fwre.exercise_id ".
    "INNER JOIN fitness_workout_routine fwr ON fwre.workout_routine_id = fwr.id ".
    "INNER JOIN fitness_user fu ON fwr.user_id = fu.user_id ".
    "INNER JOIN fitness_account_detail fad ON fu.user_id = fad.user_id ".
    "WHERE fwe.exercise_type = ".$CI->db->escape($searchFor)." AND fwr.public = 'public'";
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function rateRoutine($user_id,$rate,$routine_id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM ratings_of_workout_routines WHERE user_id=".$CI->db->escape($user_id);
    $result = $CI->db->query($SQL);
    if($result->num_rows() > 0){
      //TODO UPDATE the rare
      $SQL = "UPDATE ratings_of_workout_routines SET rating = ".$CI->db->escape($rate)." WHERE user_id = ".$CI->db->escape($user_id);
    }else{
      //TODO INSERT the rate
      $SQL = "INSERT INTO ratings_of_workout_routines VALUES(NULL,".
      $CI->db->escape($routine_id).",".
      $CI->db->escape($user_id).",".
      $CI->db->escape($rate)
      .")";
    }
    $result = $CI->db->query($SQL);
  }
  function getProfile($id){
    $CI =& get_instance();
    $SQL = "SELECT fad.first_name,fad.last_name,fad.joined_date,fp.about_me,fp.image FROM fitness_user fu ".
    "INNER JOIN fitness_account_detail fad ON fu.user_id = fad.user_id ".
    "INNER JOIN fitness_profile fp ON fu.user_id = fp.user_id ".
    "WHERE fu.enabled = 'yes' AND fu.user_id = ".$CI->db->escape($id);
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function getRoutineExercises($userID,$routineID){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_workout_routine_exercises fwre ".
    "INNER JOIN fitness_workout_exercise fwe ON fwre.exercise_id =  fwe.id ".
    "WHERE fwre.workout_routine_id = ".$CI->db->escape($routineID)." AND fwre.user_id = ".$CI->db->escape($userID);
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function createRotuinePost($userID,$routineID,$postText){
    $CI =& get_instance();
    $SQL = "INSERT INTO fitness_workout_routine_posts VALUES(NULL, ".$CI->db->escape($routineID)
      .",".$CI->db->escape($userID).
      ",".$CI->db->escape($postText).")";
    $result = $CI->db->query($SQL);
    //return ($result->result());
  }
  function getRoutinePosts($routineID){
    $CI =& get_instance();
    $SQL = "SELECT fwrp.post,fad.first_name,fad.last_name,fp.image,rowr.rating FROM fitness_workout_routine_posts fwrp ".
    "INNER JOIN fitness_account_detail fad ON fwrp.user_id = fad.user_id ".
    "INNER JOIN fitness_profile fp ON fwrp.user_id = fp.user_id ".
    "INNER JOIN ratings_of_workout_routines rowr ON fwrp.user_id = rowr.user_id ".
    "WHERE routine_id = ".$CI->db->escape($routineID);
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function addToMeWorkoutRoutine($user_id,$routineID){
    $CI =& get_instance();
    $SQL = "INSERT INTO fitness_workout_routine (user_id,routine_name,public,day_of_week,chosen) ".
            "SELECT ".$CI->db->escape($user_id)." as user_id, routine_name,public,day_of_week,'no' as chosen ".
            "FROM fitness_workout_routine WHERE id = ".$CI->db->escape($routineID);

    $result = $CI->db->query($SQL);
    $insertId = $CI->db->insert_id();
    $SQL = "SELECT fwe.exercise_name,fwe.exercise_type,fwe.sets,fwe.reps,fwe.weight,fwe.weight_type,fwe.cardio_incline ".
    "FROM fitness_workout_routine_exercises fwre ".
    "INNER JOIN fitness_workout_exercise fwe ON fwre.exercise_id = fwe.id ".
    "WHERE workout_routine_id =  ".$CI->db->escape($routineID);
    $result = $CI->db->query($SQL);
    foreach($result->result() as $row){
      $SQL = "INSERT INTO fitness_workout_exercise VALUES(NULL,".$CI->db->escape($user_id).",".
      $CI->db->escape($row->exercise_name).",".
      $CI->db->escape($row->exercise_type).",".
      $CI->db->escape($row->sets).",".
      $CI->db->escape($row->reps).",".
      $CI->db->escape($row->weight).",".
      $CI->db->escape($row->weight_type).",".
      $CI->db->escape($row->cardio_incline).")";

      $CI->db->query($SQL);
      $insertIdExercise = $CI->db->insert_id();

      $SQL = "INSERT INTO fitness_workout_routine_exercises VALUES(NULL,".
      $insertId.",".
      $insertIdExercise.",".
      $CI->db->escape($user_id).")";
      $CI->db->query($SQL);
    }
  }
}
