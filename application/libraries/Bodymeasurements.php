<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Bodymeasurements
{
  function getBodyDetail($id){
    $CI =& get_instance();
    $SQL = "SELECT fad.gender,fbw.body_weight,fbw.weight_type,fbt.height,fbt.weist,fbt.hip,fbt.neck,fbt.measure_type,fbt.body_fat ".
    "FROM fitness_body_weight fbw ".
    "INNER JOIN fitness_account_detail fad ON fbw.user_id = fad.user_id ".
    "INNER JOIN fitness_body_fat fbt ON fbw.user_id = fbt.user_id ".
    "WHERE fbw.user_id = ".$CI->db->escape($id);
    return $CI->db->query($SQL)->result()[0];
  }
  function recordBodyMeasure($id,$height,$weist,$neck,$hip,$measure_type,$body_fat,$body_weight,$weight_type){
    $CI =& get_instance();
    $SQL = "UPDATE fitness_body_fat SET ".
    "height = ".$CI->db->escape($height).",".
    "weist = ".$CI->db->escape($weist).",".
    "hip = ".$CI->db->escape($hip).",".
    "neck = ".$CI->db->escape($neck).",".
    "body_fat = ".$CI->db->escape($body_fat).",".
    "measure_type = ".$CI->db->escape($measure_type)." ".
    "WHERE user_id = ".$CI->db->escape($id);
    $CI->db->query($SQL);

    $SQL = "INSERT INTO fitness_body_fat_log VALUES(NULL,".
      $CI->db->escape($id)
    .",".
      $CI->db->escape(date('Y/m/d'))
    .",".
      $CI->db->escape($height)
    .",".
      $CI->db->escape($weist)
    .",".
      $CI->db->escape($hip)
    .",".
      $CI->db->escape($neck)
    .",".
      $CI->db->escape($measure_type)
    .",".$CI->db->escape($body_fat).")";
    $CI->db->query($SQL);

    $SQL = "UPDATE fitness_body_weight SET body_weight = ".$body_weight
      .", weight_type='".$weight_type."' WHERE user_id = ".$id;
    $CI->db->query($SQL);
  }
  function getBodyBMI($id){
    $CI =& get_instance();
    $SQL = "SELECT fad.gender,fbw.body_weight,fbw.weight_type,fbt.height,fbmi.mass_index ".
    "FROM fitness_body_weight fbw ".
    "INNER JOIN fitness_account_detail fad ON fbw.user_id = fad.user_id ".
    "INNER JOIN fitness_body_fat fbt ON fbw.user_id = fbt.user_id ".
    "INNER JOIN fitness_body_mass_index fbmi ON fbw.user_id = fbmi.user_id ".
    "WHERE fbw.user_id = ".$CI->db->escape($id);
    return $CI->db->query($SQL)->result()[0];
  }
  function recordBodyMass($id,$height,$body_weight,$weight_type,$bmi){
    $CI =& get_instance();
    $SQL = "UPDATE fitness_body_fat SET ".
    "height = ".$CI->db->escape($height)." ".
    "WHERE user_id = ".$CI->db->escape($id);
    $CI->db->query($SQL);

    $SQL = "INSERT INTO fitness_body_mass_index_log VALUES(NULL,".
      $CI->db->escape($id)
    .",".
      $CI->db->escape($bmi)
    .",".$CI->db->escape(date('Y/m/d')).")";
    $CI->db->query($SQL);

    $SQL = "UPDATE fitness_body_weight SET body_weight = ".$body_weight
      .", weight_type='".$weight_type."' WHERE user_id = ".$id;
    $CI->db->query($SQL);
  }
}
