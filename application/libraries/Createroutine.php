<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Createroutine
{
  function onCreateRoutine($user_id,$routine){
    $CI =& get_instance();
    $SQL = "INSERT INTO fitness_workout_routine VALUES(NULL,".$user_id.
    ",'".
    $routine['routine_name']
    ."','".
    $routine['public']
    ."','".
    $routine['day_of_week']
    ."','no')";
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return $CI->db->insert_id();
  }
  function ifRoutineNameExists($name,$user_id){
    $SQL = "SELECT * FROM fitness_workout_routine WHERE user_id = ".$user_id.
    " AND routine_name = '".$name."'";
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    if($result->num_rows() > 0){
      return FALSE;
    }else{
      return TRUE;
    }
  }
  function onCreateConnectRoutineToExercise($user_id,$exe){
    $SQL = "INSERT INTO fitness_workout_routine_exercises VALUES(NULL,".
      $exe['id']
    .",".
      $exe['exeID']
    .",".
      $user_id
    .")";
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
  }

  function getAllRoutines($user_id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_workout_routine WHERE user_id = ".$user_id;
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function setAsCurrent($user_id,$id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_workout_routine WHERE user_id = ".$user_id." AND chosen = 'yes'";
    $result = $CI->db->query($SQL);
    if($result->num_rows() > 0){
      $SQL = "UPDATE fitness_workout_routine SET chosen = 'no' WHERE id = ".$result->result()[0]->id;
      $result = $CI->db->query($SQL);
      $SQL = "UPDATE fitness_workout_routine SET chosen = 'yes' WHERE id = ".$id;
      $result = $CI->db->query($SQL);
    }else{
      $SQL = "UPDATE fitness_workout_routine SET chosen = 'yes' WHERE id = ".$id;
      $result = $CI->db->query($SQL);
    }
    return TRUE;
  }
  function deleteRoutine($user_id,$id){
    $CI =& get_instance();
    $SQL = "DELETE FROM fitness_workout_routine WHERE id = ".$id;
    $result = $CI->db->query($SQL);
  }
  function getRotuineNameWorkoutRoutine($user_id,$name){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_workout_routine WHERE routine_name LIKE '%".$name."%' AND user_id = ".$user_id;
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function getRoutineMuscleWorkoutRoutine($user_id,$type){
    $CI =& get_instance();
    $SQL = "SELECT fw.id,fw.user_id,fw.routine_name,fw.public,fw.day_of_week,fw.chosen ".
    "FROM fitness_workout_routine_exercises fwe ".
    "INNER JOIN fitness_workout_exercise fe ".
      "ON fwe.exercise_id = fe.id ".
    "INNER JOIN fitness_workout_routine fw ".
      "ON fwe.workout_routine_id = fw.id ".
    "WHERE fe.exercise_type = '".$type."'".
    " AND fwe.user_id = ".$user_id;
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function getSpecificRoutines($user_id,$id){
    $SQL = "SELECT * FROM fitness_workout_routine WHERE user_id = ".$user_id." AND id = ".$id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result()[0]);
  }
  function updateRoutine($user_id,$id,$rotuine_name,$day_of_week,$public){
    $SQL = "UPDATE fitness_workout_routine SET ".
    "routine_name = '".$rotuine_name."', ".
    "day_of_week = '".$day_of_week."', ".
    "public = '".$public."' ".
    "WHERE id = ".$id." AND user_id = ".$user_id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
  }
  function onDestroyConnectRoutineToExercise($user_id,$id,$exeID){
    $SQL = "DELETE FROM fitness_workout_routine_exercises ".
      "WHERE user_id = ".$user_id." AND exercise_id = ".$exeID." AND workout_routine_id = ".$id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
  }
  function updateExerciseInWorkoutRoutine($user_id,$data){
    $CI =& get_instance();
    $SQL = "UPDATE fitness_workout_exercise SET  ".
    "exercise_name = ".$CI->db->escape($data['exercise_name']).",".
    "exercise_type = ".$CI->db->escape($data['exercise_type']).",".
    "reps = ".$CI->db->escape($data['reps']).",".
    "sets = ".$CI->db->escape($data['sets']).",".
    "weight = ".$CI->db->escape($data['weight']).",".
    "weight_type = ".$CI->db->escape($data['weight_type']).",".
    "cardio_incline = ".$CI->db->escape($data['cardio_incline']).
    " WHERE id = ".$data['id'];

    $result = $CI->db->query($SQL);
  }
  function getAllExercisesOfRotuine($user_id,$id){
    $SQL = "SELECT * FROM fitness_workout_routine_exercises fwe ".
      "INNER JOIN fitness_workout_exercise fe ON fwe.exercise_id = fe.id ".
      "WHERE fwe.user_id = ".$user_id." AND fwe.workout_routine_id = ".$id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function getCurrentWorkoutRoutine($user_id){
    $CI =& get_instance();
    $SQL = "SELECT fwr.id,fwr.routine_name,fbw.body_weight,fbw.weight_type FROM fitness_workout_routine fwr".
    " INNER JOIN fitness_body_weight fbw ON fwr.user_id = fbw.user_id"
    ." WHERE fwr.user_id = ".$user_id
      ." AND fwr.chosen = ".$CI->db->escape('yes');
    $result = $CI->db->query($SQL);
    return ($result->result());
  }

  function getExercisesFprWorkoutRoutine($user_id,$id){
    $CI =& get_instance();
    $SQL = "SELECT * FROM fitness_workout_routine_exercises fwre ".
    "INNER JOIN fitness_workout_exercise fwe ON fwre.exercise_id = fwe.id ".
    "WHERE fwre.workout_routine_id = ".$id." AND fwre.user_id = ".$user_id;
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function recordExerciseInWorkoutRoutine($user_id,$exe){
    $CI =& get_instance();

    $SQL = "INSERT INTO fitness_workout_routine_log VALUES(NULL,"
      .$user_id.
      ",'".
      $exe['workout_routine_id']
      ."','".
      $exe['exercise_id']
      ."','".
      $exe['sets']
      ."','".
      $exe['reps']
      ."','".
      $exe['weight']
      ."','".
      $exe['weight_type']
      ."','".
      $exe['cardio_incline']
      ."','".$exe['exercise_type']."',".$CI->db->escape(date('Y/m/d')).")";
      $CI->db->query($SQL);
      return TRUE;
  }
  function updateMyWieght($user_id,$weight,$weight_type){
    $CI =& get_instance();
    $SQL = "UPDATE fitness_body_weight SET body_weight = ".$weight
      .", weight_type='".$weight_type."' WHERE user_id = ".$user_id;
    $CI->db->query($SQL);
  }
}
