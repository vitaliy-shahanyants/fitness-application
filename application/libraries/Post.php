<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Post
{
  function getUser($username){
    $SQL = "SELECT first_name,last_name,joined_date,image FROM fitness_user fu ".
    "INNER JOIN fitness_account_detail fa ON fu.user_id = fa.user_id ".
    "INNER JOIN fitness_profile fp ON fu.user_id = fp.user_id ".
    "WHERE fu.username = '".$username."'";
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function addNewThread($id,$topic){
    $SQL = "INSERT INTO fitness_posts_threads VALUES(NULL,".$id.",'".$topic."')";
    $CI =& get_instance();
    $CI->db->query($SQL);
  }
  function getThreads($id){
    $SQL = "SELECT * FROM fitness_posts_threads WHERE user_id = ".$id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function getAllPosts($id){
    $SQL = "SELECT post,first_name,last_name,image FROM fitness_posts fp ".
    "INNER JOIN fitness_account_detail fa ON fp.user_id = fa.user_id ".
    "INNER JOIN fitness_profile fr ON fp.user_id = fr.user_id ".
    "WHERE post_thread_id = ".$id;
    $CI =& get_instance();
    $result = $CI->db->query($SQL);
    return ($result->result());
  }
  function makePost($thread_id,$post,$user_id){
    $SQL = "INSERT INTO fitness_posts VALUES(NULL,".$thread_id.",".$user_id.",'".$post."')";
    $CI =& get_instance();
    $CI->db->query($SQL);
  }
}
