<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Router extends CI_Controller {
	private $data = array(
		 'router' => 'home'
	 );
	public function index()
	{
		redirect('/router/home');
		$data['router'] = 'home';
		$this->load->view('welcome_message',$data);
	}
	public function redirectIfNotLoggedIn(){
		if(!$this->checkIfLogedInUser()){
			redirect('/router');
			die();
		}
	}
	public function home()
	{
		$data['router'] = 'home';
		$this->load->view('welcome_message',$data);
	}
	public function logout()
	{
		$data['router'] = 'logout';
		$this->load->view('welcome_message',$data);
	}
	public function about(){
		$data['router'] = 'about';
		$this->load->view('welcome_message',$data);
	}
	public function login(){
		$data['router'] = 'login';
		$this->load->view('welcome_message',$data);
	}
	public function forgotpassword(){
		$this->redirectIfNotLoggedIn();
		$data['router'] = 'forgotpassword';
		$this->load->view('welcome_message',$data);
	}
	public function updateAccount(){
		$this->redirectIfNotLoggedIn();
		$data['router'] = 'updateAccount';
		$this->load->view('welcome_message',$data);
	}
	public function deleteAccount(){
		$this->redirectIfNotLoggedIn();
		$data['router'] = 'deleteAccount';
		$this->load->view('welcome_message',$data);
	}
	public function register(){
		$data['router'] = 'login';
		$this->load->view('welcome_message',$data);
	}
	public function profile(){
		$this->redirectIfNotLoggedIn();
		$data['router'] = 'profile';
		$this->load->view('welcome_message',$data);
	}
	public function posts(){
		$this->redirectIfNotLoggedIn();
		$data['router'] = 'posts';
		$this->load->view('welcome_message',$data);
	}
	public function inbox(){
		$data['router'] = 'inbox';
		$this->load->view('welcome_message',$data);
	}
	public function createRoutine(){
		$data['router'] = 'createRoutine';
		$this->load->view('welcome_message',$data);
	}
	public function createExercise(){
		$data['router'] = 'createExercise';
		$this->load->view('welcome_message',$data);
	}

	public function allRoutines(){
		$data['router'] = 'allRoutines';
		$this->load->view('welcome_message',$data);
	}

	public function startWorkout(){
		$data['router'] = 'startWorkout';
		$this->load->view('welcome_message',$data);
	}
	public function search(){
		$data['router'] = 'search';
		$this->load->view('welcome_message',$data);
	}
	public function bodyMeasurements(){
		$data['router'] = 'bodyMeasurements';
		$this->load->view('welcome_message',$data);
	}
	public function tracking(){
		$data['router'] = 'tracking';
		$this->load->view('welcome_message',$data);
	}

	/*Event Module*/
	public function events(){
		$data['router'] = 'events';
		$this->load->view('welcome_message',$data);
	}
	public function searchEvent(){
		$data['router'] = 'events';
		$this->load->view('welcome_message',$data);
	}
	public function createEvent(){
		$data['router'] = 'events';
		$this->load->view('welcome_message',$data);
	}
	public function allEvents(){
		$data['router'] = 'events';
		$this->load->view('welcome_message',$data);
	}
	public function allUsers(){
		$data['router'] = 'admin';
		$this->load->view('welcome_message',$data);
	}
	public function userTracking(){
		$data['router'] = 'admin';
		$this->load->view('welcome_message',$data);
	}

/*Ajax Calls*/
	public function getSecurityQuestion(){
		echo json_encode($this->login->getSecurityQuestions());
	}

	public function createNewUser(){
		$errorLog = [];
		if($this->login->validateInputFields($_POST,$errorLog)){
			$this->login->registerToUserTable($_POST);
			$collection = array(
				'username' => $_POST['username'],
				'password' => $_POST['password'],
				'logedin' => TRUE,
			);
			$this->session->set_userdata($collection);
			echo true;
		}else{
			echo json_encode($errorLog);
		}
	}
	public function checkIfLogedIn(){
		if($this->session->logedin){
			if($this->login->checkUserLogin($this->session->username,$this->session->password)){
				if($this->checkIfAdmin()){
					echo 'admin';
				}else{
					echo TRUE;
				}

			}else{
				echo FALSE;
			}
		} else{
			echo FALSE;
		}
	}
	public function checkIfAdmin(){
		if($this->checkIfLogedInUser()){
			return $this->login->checkIfAdmin($this->session->username);
		}
	}
	public function checkIfLogedInUser(){
		if($this->session->logedin){
			if($this->login->checkUserLogin($this->session->username,$this->session->password)){
				return TRUE;
			}else{
				return FALSE;
			}
		} else{
			return FALSE;
		}
	}
	public function logMeIn(){
		$errorLog;
		if($this->login->loginSession($_POST['username'],$_POST['password'],$errorLog)){
			$collection = array(
				'username' => $_POST['username'],
				'password' => $_POST['password'],
				'logedin' => TRUE,
			);
			$this->session->set_userdata($collection);
			echo TRUE;
		}else{
			echo FALSE;
		}
	}
	public function logMeOut(){
		$collection = array(
			'username' => NULL,
			'password' => NULL,
			'logedin' => FALSE,
		);
		$this->session->set_userdata($collection);
		$this->session->sess_destroy();
	}
	public function checkUsername(){
		echo $this->login->checkUsername($_POST['username']);
	}
	public function getQuestion(){
		echo $this->login->getQuestion($_POST['username']);
	}
	public function checkSecurityQuestion(){
		echo $this->login->checkSecurityQuestion($_POST['username'],$_POST['security_answer']);
	}
	public function newPasswordEntry(){
		echo $this->login->newPasswordEntry($_POST['username'],$_POST['newPassword'],$_POST['security_answer']);
	}
	//deleteMyAccount
	public function deleteMyAccount(){
		if($this->checkIfLogedInUser()){
			$this->accountdetails->deleteAccount($this->session->username,
			$this->login->getUserID($this->session->username),$_POST['feedback']);
			$this->logMeOut();
		}
	}

	/* Account Details */
	public function getAccountDetails(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->accountdetails->getAccountDetails($this->session->username));
		}else{
			echo False;
		}
	}
	public function updateAccountDetails(){
		$errorLog = [];
		if($this->checkIfLogedInUser()){
			if($this->accountdetails->updateAccountDetails($_POST,$errorLog)){
				echo TRUE;
			}else{
				echo json_encode(array(
					'error' => $errorLog,

				));
			}
		}else{
			echo False;
		}
	}
	/*Profile*/
	public function getUserProfileContent(){
		if($this->checkIfLogedInUser()){
			$this->profile->getUserProfileContent($this->session->username);
		}
	}
	public function updateProfile(){
		if($this->checkIfLogedInUser()){
			$errorLog = array();
			$id = $this->login->getUserID($this->session->username);
			if(!$this->profile->updateProfile($this->session->username,$errorLog,$id)){
				echo json_encode($errorLog);
			}else{
				echo json_encode(TRUE);
			}
		}
	}
	/*Inbox*/
	public function refreshInbox(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->inbox->getMessages($this->login->getUserID($this->session->username)));
		}
	}
	public function getInboxFrom(){
		if($this->checkIfLogedInUser()){
				$user_to = $this->login->getUserID($_POST['username']);
				if($user_to != NULL){
					echo json_encode($this->inbox->getInboxFrom($this->login->getUserID($this->session->username),
					$user_to));
				}else{
					echo json_encode(NULL);
				}
		}
	}
	public function deleteMessages(){
		if($this->checkIfLogedInUser()){
			if($this->inbox->deleteMessages($_POST['id'],$this->login->getUserID($this->session->username))){

			}
		}
	}
	public function getListOfUsers($like_username=null){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->inbox->getLikeUsers($like_username));
		}
	}
	public function sendMessage(){
		if($this->checkIfLogedInUser()){
			$this->inbox->sendMessage($this->login->getUserID($this->session->username),
				$this->login->getUserID($_POST['send_to']),
				$_POST['message_content']);
		}
	}

	/* Post Module */
	public function postGetUser(){
		if($this->checkIfLogedInUser()){
			if(strlen($_REQUEST['username']) > 0){
				echo json_encode($this->post->getUser($_REQUEST['username']));
			}else{
				echo json_encode($this->post->getUser($this->session->username));
			}
		}
	}
	public function addNewThread(){
		if($this->checkIfLogedInUser()){
			if(strlen($_REQUEST['username']) > 0){
				if(strlen($_REQUEST['topic']) > 0)
					$this->post->addNewThread($this->login->getUserID($_REQUEST['username']),$_REQUEST['topic']);
			}else{
				if(strlen($_REQUEST['topic']) > 0)
					$this->post->addNewThread($this->login->getUserID($this->session->username),$_REQUEST['topic']);
			}
		}
	}
	public function getThreads(){
		if($this->checkIfLogedInUser()){
			if(strlen($_REQUEST['username']) > 0){
				echo json_encode($this->post->getThreads($this->login->getUserID($_REQUEST['username'])));
			}else{
				echo json_encode($this->post->getThreads($this->login->getUserID($this->session->username)));
			}
		}
	}
	public function getAllPosts(){
		if($this->checkIfLogedInUser()){
			if(strlen($_REQUEST['id']) > 0){
				echo json_encode($this->post->getAllPosts($_REQUEST['id']));
			}
		}
	}
	public function makePost(){
		if($this->checkIfLogedInUser()){
			//echo $this->login->getUserID($this->session->username);
			$this->post->makePost($_REQUEST['thread_id'],
			$_REQUEST['post_content'],
			$this->login->getUserID($this->session->username));
		}
	}
	/*Workout Module*/
	public function onCreateExercise(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createexercise->onCreateExercise(
				$this->login->getUserID($this->session->username),
				$_POST));
		}
	}
	public function onCreateCardio(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createexercise->onCreateCardio(
				$this->login->getUserID($this->session->username),
				$_POST));
		}
	}
	public function onGetExercise(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createexercise->onGetExercise(
				$this->login->getUserID($this->session->username)));
		}
	}
	public function onGetCardio(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createexercise->onGetCardio(
				$this->login->getUserID($this->session->username)));
		}
	}
	public function onCreateRoutine(){
		if($this->checkIfLogedInUser()){
			if($this->createroutine->ifRoutineNameExists($_POST['routine_name'],
				$this->login->getUserID($this->session->username)))
			{
				echo json_encode($this->createroutine->onCreateRoutine(
					$this->login->getUserID($this->session->username),$_POST));
			}else{
				return FALSE;
			}
		}
	}
	public function onCreateConnectRoutineToExercise(){
		if($this->checkIfLogedInUser()){
			$this->createroutine->onCreateConnectRoutineToExercise(
				$this->login->getUserID($this->session->username),
				$_POST);
		}
	}
	public function getAllRoutines(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getAllRoutines(
				$this->login->getUserID($this->session->username)
			));
		}
	}
	public function getMuscleGroups(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createexercise->getMuscleGroups(
				$this->login->getUserID($this->session->username),
				$_POST['id']
			));
		}
	}
	public function setAsCurrent(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->setAsCurrent(
				$this->login->getUserID($this->session->username),
				$_POST['id']
			));
		}
	}
	public function deleteRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->deleteRoutine(
				$this->login->getUserID($this->session->username),
				$_POST['id']
			));
		}
	}
	public function getRotuineNameWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getRotuineNameWorkoutRoutine(
				$this->login->getUserID($this->session->username),
				$_POST['routine_name']
			));
		}
	}
	public function getRoutineMuscleWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getRoutineMuscleWorkoutRoutine(
				$this->login->getUserID($this->session->username),
				$_POST['searh_muscle_type']
			));
		}
	}
	public function getSpecificRoutines(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getSpecificRoutines(
				$this->login->getUserID($this->session->username),
				$_POST['id']
			));
		}
	}
	public function updateRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->updateRoutine(
				$this->login->getUserID($this->session->username),
				$_POST['id'],
				$_POST['routine_name'],
				$_POST['day_of_week'],
				$_POST['public']
			));
		}
	}
	public function onDestroyConnectRoutineToExercise(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->onDestroyConnectRoutineToExercise(
				$this->login->getUserID($this->session->username),
				$_POST['id'],
				$_POST['exeID']
			));
		}
	}
	public function getAllExercisesOfRotuine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getAllExercisesOfRotuine(
				$this->login->getUserID($this->session->username),
				$_POST['id']
			));
		}
	}
	public function updateExerciseInWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->updateExerciseInWorkoutRoutine(
				$this->login->getUserID($this->session->username),
				$_POST));
		}
	}

	/* Start Worlout Routine*/

	public function getCurrentWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getCurrentWorkoutRoutine(
				$this->login->getUserID($this->session->username)));
		}
	}
	public function getExercisesFprWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->createroutine->getExercisesFprWorkoutRoutine(
				$this->login->getUserID($this->session->username), $_POST['id'] ) );
		}
	}
	public function recordExerciseInWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			$this->createroutine->updateExerciseInWorkoutRoutine(
				$this->login->getUserID($this->session->username),
				$_POST);
			$this->createroutine->recordExerciseInWorkoutRoutine(
				$this->login->getUserID($this->session->username),
				$_POST);
			$this->createroutine->updateMyWieght(
				$this->login->getUserID($this->session->username),
				$_POST['my_weight'],$_POST['my_weight_type']
			);
		}
	}

	/*
	------------  Search Module ---------------------
	*/
	public function searchByRoutineName(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->searchByRoutineName($_POST['searchFor']));
		}
	}
	public function searchByUsername(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->searchByUsername($_POST['searchFor']));
		}
	}
	public function searchByMuscleGroup(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->searchByMuscleGroup($_POST['searchFor']));
		}
	}
	public function rateRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->rateRoutine($this->login->getUserID($this->session->username),
			$_POST['routine_rate'],$_POST['routine_id']));
		}
	}
	public function getProfile(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->getProfile($_POST['id']));
		}
	}
	public function getRoutineExercises(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->getRoutineExercises($_POST['userID'],$_POST['routineID']));
		}
	}
	public function createRotuinePost(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->createRotuinePost($this->login->getUserID($this->session->username),
			$_POST['routineID'],$_POST['postText']));
		}
	}
	public function getRoutinePosts(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->getRoutinePosts($_POST['routineID']));
		}
	}
	public function addToMeWorkoutRoutine(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->search->addToMeWorkoutRoutine(
				$this->login->getUserID($this->session->username),
				$_POST['routineID']));
		}
	}

	/* Body Measurments  */

	public function getBodyDetail(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->bodymeasurements->getBodyDetail(
				$this->login->getUserID($this->session->username)));
		}
	}
	public function recordBodyMeasure(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->bodymeasurements->recordBodyMeasure(
				$this->login->getUserID($this->session->username),
				$_POST['height'],
				$_POST['weist'],
				$_POST['neck'],
				$_POST['hip'],
				$_POST['measure_type'],
				$_POST['body_fat'],
				$_POST['body_weight'],
				$_POST['weight_type']));
		}
	}
	public function getBodyBMI(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->bodymeasurements->getBodyBMI(
				$this->login->getUserID($this->session->username)));
		}
	}
	public function recordBodyMass(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->bodymeasurements->recordBodyMass(
				$this->login->getUserID($this->session->username),
				$_POST['height'],
				$_POST['body_weight'],
				$_POST['weight_type'],
				$_POST['mass_index']));
		}
	}

	/* Tracking Module */
	public function trackingGetWorkoutRoutines(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->tracking->trackingGetWorkoutRoutines(
				$this->login->getUserID($this->session->username),
				$_POST['start_date'],
				$_POST['end_date']
			));
		}
	}
	public function trackingGetBodyMeasurments(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->tracking->trackingGetBodyMeasurments(
				$this->login->getUserID($this->session->username),
				$_POST['start_date'],
				$_POST['end_date'],
				$_POST['body_measurments_type']
			));
		}
	}

	/* Event Ajax Calls */
	public function getCurrentEventDetails(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->getCurrentEventDetails(
				$this->login->getUserID($this->session->username),
				$_POST['event_id']
			));
		}
	}
	public function updateEvent(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->updateEvent(
				$this->login->getUserID($this->session->username),
				$_POST['event_id'],
				$_POST['event_name'],
				$_POST['event_status'],
				$_POST['event_description'],
				$_POST['event_location'],
				$_POST['event_start_date'],
				$_POST['event_end_date']
			));
		}
	}
	public function createMyEvent(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->createMyEvent(
				$this->login->getUserID($this->session->username),
				$_POST['event_name'],
				$_POST['event_status'],
				$_POST['event_description'],
				$_POST['event_location'],
				$_POST['event_start_date'],
				$_POST['event_end_date']
			));
		}
	}
	public function searchForEvent(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->searchForEvent(
				$this->login->getUserID($this->session->username),
				$_POST['search_for']
			));
		}
	}
	public function joinEvent(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->joinEvent(
				$this->login->getUserID($this->session->username),
				$_POST['event_id']
			));
		}
	}
	public function getAllMyEvents(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->getAllMyEvents(
				$this->login->getUserID($this->session->username)
			));
		}
	}
	public function deleteEvent(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->deleteEvent(
				$this->login->getUserID($this->session->username),
				$_POST['event_id']
			));
		}
	}
	public function getAllOfTheEvents(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->event->getAllOfTheEvents(
				$this->login->getUserID($this->session->username)
			));
		}
	}

	/*Admin Module*/
	public function grabAllUsers(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->admin->grabAllUsers(
				$this->login->getUserID($this->session->username)
			));
		}
	}
	public function adminRemoveUser(){
		if($this->checkIfLogedInUser()){
			echo json_encode($this->admin->grabAllUsers(
				$this->login->getUserID($this->session->username)
			));
		}
	}
	public function trackThisUser(){
		echo json_encode($this->admin->trackThisUser(
			$_POST['lon'],
			$_POST['lat'],
			$_POST['city'],
			$_POST['region'],
			$_POST['country']
		));
	}
}
