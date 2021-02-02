<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    
    public function showAllConversations(): Response
    {
        $user = $this->getUser();
        $userMessages = $this->getDoctrine()->getRepository(Messages::class)->getAllMessagesUser($user->getId());
        $numberOfMessages = count($userMessages);
        for ($i=0; $i<$numberOfMessages; $i++){
            for ($j=$i+1; $j<$numberOfMessages; $j++){
                if ($userMessages[$i]->getIdUser()->getId() == $userMessages[$j]->getIdUser()->getId()){
                    unset($userMessages[$i]);
                    break;
                };
            }
        }
        $userMessages = array_values($userMessages);
        $numberOfMessages = count($userMessages);
        if ($numberOfMessages >= 2){
            if ($userMessages[$numberOfMessages-2]->getIdTeacher()->getId() == $userMessages[$numberOfMessages-1]->getIdUser()->getId() && $userMessages[$numberOfMessages-2]->getIdUser()->getId() == $userMessages[$numberOfMessages-1]->getIdTeacher()->getId()){
                unset($userMessages[$numberOfMessages-2]);
            }
        }
        return $this->render('message/index.html.twig', [
            'controller_name' => 'MessageController',
            'user' => $user,
            'userMessages' => $userMessages,
            'numberofmessages' => $numberOfMessages,
            
        ]);
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
    
}
