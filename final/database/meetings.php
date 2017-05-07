<?php



function getFutureMeetings($project){
    global $conn;
    $stmt = $conn->prepare('SELECT id,name,description,date FROM meeting WHERE meeting.date > CURRENT_DATE AND meeting.id_project = ?');

    $stmt->execute([$project]);
    return $stmt->fetchAll();
}

function getUserFutureMeeting($project){
    global $conn;
    $user = $_SESSION['user_id'];
    $stmt = $conn->prepare('SELECT id,name,description,date FROM meeting,user_meeting WHERE meeting.date > CURRENT_DATE AND meeting.id_project = ? AND id = user_meeting.meeting_id AND user_meeting.user_id=?');

    $stmt->execute([$project,$user]);
    return $stmt->fetchAll();
}


function scheduleMeeting($title, $description, $date, $time, $duration, $id_project){

    list($year, $month, $day) = explode('-', $date);
    list($hour, $minute, $second) = explode(':', $time);
    $timestamp = mktime($hour, $minute, $second, $month, $day, $year);
    $time = date('Y-m-d H:i:s',$timestamp);

    global $conn;
    $stmt = $conn->prepare('INSERT INTO meeting(name, duration, description, id_project, date ) values (?,?,?,?,?)');
    $stmt->execute([$title, $duration, $description, $id_project, $time]);

    $last_id_meeting = $conn->lastInsertId();
    return $last_id_meeting;
}

function getTimeFromTimestamp($timestamp){
    list($date, $time) = explode(' ', $timestamp);
    list($hours, $minutes, $seconds) = explode(':', $time);
    $meetingDate = $hours.":".$minutes."h";
    return $meetingDate;
}

function getDateFromTimestamp($timestamp){
    list($date, $time) = explode(' ', $timestamp);
    return $date;
}

function getMeetingDetails($meeting_id){

    global $conn;
    $stmt = $conn->prepare('SELECT name,description,duration,date FROM meeting WHERE meeting.id = ?');

    $stmt->execute([$meeting_id]);
    return $stmt->fetchAll();
}

function inviteUserToMeeting($meeting_id, $invited_users, $id_creator){
    global $conn;

    echo count($invited_users);

    for ($i = 0; $i < count($invited_users); $i++) {
        $stmt = $conn->prepare('INSERT INTO user_meeting(meeting_id, user_id, is_creator) values (?,?,?)');
        echo $meeting_id . " invited user ";
        echo $invited_users[$i] . " ";
        $stmt->execute([$meeting_id, $invited_users[$i],'false']);
    }

    $stmt = $conn->prepare('INSERT INTO user_meeting(meeting_id, user_id, is_creator) values (?,?,?)');
    $stmt->execute([$meeting_id,$id_creator,'true']);
}

function getInvitedUsers($meeting_id){
    global $conn;

    $stmt = $conn->prepare('SELECT user_id FROM user_meeting WHERE meeting_id = ?');
    $stmt->execute([$meeting_id]);
    return $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
}

function getInvitedUsersPhotos($meeting_id){
    global $conn;
    global $BASE_DIR;

    $stmt = $conn->prepare('SELECT photo_path FROM user_table INNER JOIN user_meeting ON user_meeting.user_id=user_table.id AND user_meeting.meeting_id=?');
    $stmt->execute([$meeting_id]);
    $result =  $stmt->fetchAll(PDO::FETCH_COLUMN, 0);;

    $photos = [];

    for($i = 0; $i < count($result); $i++){
        if (!is_null($result[$i]) && file_exists( $BASE_DIR . "images/users/". $result[$i])) {
            $photos[$i] = '../images/users/' . $result[$i];
        }
        else {
            $photos[$i] = '../images/users/default_image_profile1.jpg';
        }
    }

    return $photos;
}

function isMeetingCreator($meeting_id, $user_id){
    global $conn;

    $stmt = $conn->prepare('SELECT is_creator FROM user_meeting WHERE meeting_id = ? AND user_id = ?');
    $stmt->execute([$meeting_id,$user_id]);
    $result = $stmt->fetch();

    return $result['is_creator'];
}

function getMeetingFiles($meeting_id){
    global $conn;

    $stmt = $conn->prepare('SELECT id, name FROM file INNER JOIN file_meeting ON file_meeting.file_id=file.id AND file_meeting.meeting_id=?');
    $stmt->execute([$meeting_id]);

    return $stmt->fetchAll();
}