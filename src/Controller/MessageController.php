<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    
    public function AllConversations()
    {
        /* $user = $this->getUser();
        $userMessages = $this->getDoctrine()->getRepository(Messages::class)->getAllMessagesUser($user->getId());
        
        $numberOfMessages = count($userMessages);
        
        for ($i=0; $i<$numberOfMessages; $i++){
            for ($j=$i+1; $j<$numberOfMessages; $j++){
                if ($userMessages[$i]->getIdUser()->getId() == $userMessages[$j]->getIdUser()->getId() && ($userMessages[$i]->getIdTeacher()->getId() == $userMessages[$j]->getIdTeacher()->getId())){
                    unset($userMessages[$i]);
                    break;
                }elseif(  $userMessages[$i]->getIdUser()->getId() == $userMessages[$j]->getIdTeacher()->getId() && ( $userMessages[$i]->getIdTeacher()->getId() == $userMessages[$j]->getIdUser()->getId()   )){
                    unset($userMessages[$i]);
                    break;
                }
            }
        }    */
        
        return $this->render('message/index.html.twig', [
            /* 'user' => $user,
            'userMessages' => $userMessages, */
            
        ]);
    }
    public function ShowAllConversations()
    {
        $user = $this->getUser();
        $userMessages = $this->getDoctrine()->getRepository(Messages::class)->getAllMessagesUser($user->getId());
        
        $numberOfMessages = count($userMessages);
        
        for ($i=0; $i<$numberOfMessages; $i++){
            for ($j=$i+1; $j<$numberOfMessages; $j++){
                if ($userMessages[$i]["idUser"] == $userMessages[$j]["idUser"] && ($userMessages[$i]["idTeacher"] == $userMessages[$j]["idTeacher"])){
                    unset($userMessages[$i]);
                    break;
                }elseif(  $userMessages[$i]["idUser"] == $userMessages[$j]["idTeacher"] && ( $userMessages[$i]["idTeacher"] == $userMessages[$j]["idUser"]   )){
                    unset($userMessages[$i]);
                    break;
                }
            }
        }
        
        $userMessages = array_values($userMessages);
        
        $userMessagesList = $this->get('serializer')->serialize($userMessages, 'json');
        $response = new Response($userMessagesList);
       
        return $response;
 
       
    }
    public function showConversation($id){
        $user = $this->getUser();
        if (isset($user) && !empty($user)){
            $error = false;
            $nameUserConversation = $this->getDoctrine()->getRepository(Users::class)->find($id);
            return $this->render('message/singleconversation.html.twig', [
                'controller_name' => 'MessageController',
                'user' => $user,
                'idUserConversation' => $id,
                'nameUserConversation' => $nameUserConversation,
                'error' => $error,
            ]);
        }else{
            $error = "You don't have access";
            return $this->render('message/singleconversation.html.twig', [
                'controller_name' => 'MessageController',
                'error' => $error,
                
            ]);
        }
        
    }
    public function getMessages($id){
        $user = $this->getUser();
        if (isset($user) && !empty($user)){
                $messages = $this->getDoctrine()->getRepository(messages::class)->getConversationUser($user->getId(), $id);
                $messages = $this->get('serializer')->serialize($messages, 'json');
                $response = new Response($messages);
       
                return $response;
            }else{
                return "You don't have access";
            
        }
    }
    public function checkNewMessages(){
        $user = $this->getUser();
        $hasNewMessages = false;
        if (isset($user) && !empty($user)){
            $messages = $this->getDoctrine()->getRepository(messages::class)->checkNewMessages($user->getId());
            if (!empty($messages)){
                $hasNewMessages = true;
            }
            $hasNewMessages = $this->get('serializer')->serialize($hasNewMessages, 'json');
            $response = new Response($hasNewMessages);
   
            return $response;
        }
    }
    public function setReadMessages(Request $request){
        $idUserConversation = $request->request->get('idUserConversation');
        $user = $this->getUser();

        $messages = $this->getDoctrine()->getRepository(messages::class)->getConversationUser($user->getId(), $idUserConversation);
        
        foreach ($messages as $message ) {
            
            if ($message["idTeacher"] == $idUserConversation){
                $messageRead = $this->getDoctrine()->getRepository(Messages::class)->find($message["id"]);
                $messageRead->setMessageRead("1");

                $this->getDoctrine()->getRepository(messages::class)->Save($messageRead);
            }
        }
        $readMessages = "read messages";
        $readMessages = $this->get('serializer')->serialize($readMessages, 'json');
        $response = new Response($readMessages);

        return $response;
    }
    
}
