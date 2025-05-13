<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
class PHPMailerController extends Controller
{
    public function index(Request $request){
        return view('sendmail');
    }
    public function store(Request $request){
        $mail = new PHPMailer(true);
        try{
$mail->SMTPDebug =0;
$mail->isSMTP();
$mail->HOST = env('MAIL_HOST');
$mail->SMTPAuth = true;
$mail->Username = env('MAIL_USERNAME');
$mail->Password = env('MAIL_PASSWORD');
$mail->SMTPSecure = env('MAIL_ENCRYPTION');
$mail->Port = env('MAIL_PORT');

  $mail->setFrom(env('MAIL_FROM_ADDRESS'),env('MAIL_FROM_NAME'));
$mail->addAddress($request->email);
$mail->Subject = $request->subject;
$mail->Body = $request->body;
if(!$mail->send())
{
    return back()-> with('error','email not sent')->withErrors($mail->ErrorInfo);
}else{
    return back()-> with('Success','email has been sent');
}
        }catch(Exception $e){
            return back()-> with('error','email not sent')->withErrors($mail->ErrorInfo);

        }
    }
}
