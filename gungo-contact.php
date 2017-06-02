<?php
    $to = "rob@robgungor.com"; 
    $message = $_REQUEST['message']; 
    $headers = "From: no-reply@robgungor.com"; 
    $subject = "You have a message sent from robgungor.com"; 
    $fields = array(); 
    $fields{"message"} = "message";
    $body = "Here is what was sent:\n\n" . $message; 
    
    if(isset($_REQUEST['message']) ){
        $send = mail($to, $subject, $body, $headers);        
        $data = ['success' => 'true', 'message' => 'Thank you! Your message sent.'];
        header('Content-Type: application/json');
        echo json_encode($data);
    }
?>