<?php

namespace App\Controller;

use App\Entity\Messages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    
    public function showAllConversations(): Response
    {
        $user = $this->getUser();
        $userId = "";
        if ($user->getIdRole()->getId() == 3){
            $userId = "idteacher";
        }else{
            $userId = "iduser";
        }
        $userMessages = $this->getDoctrine()->getRepository(Messages::class)->getAllMessagesUser($user->getId());

        for ($i=0; $i<count($userMessages); $i++){
            for ($j=$i+1; $j<=count($userMessages); $j++){
                if ($userMessages[$i]->getIdUser()->getId() == $userMessages[$j]->getIdUser()->getId()){
                    unset($userMessages[$i]);
                    break;
                };
            }
        }
        return $this->render('message/index.html.twig', [
            'controller_name' => 'MessageController',
            'user' => $user,
            'userMessages' => $userMessages,
            
        ]);
    }
    public function showConversation($id1, $id2){
        $user = $this->getUser();
        if (isset($user) && !empty($user)){
            if ($user->getId() == $id1){
                $error = false;
                
                return $this->render('message/singleconversation.html.twig', [
                    'controller_name' => 'MessageController',
                    'user' => $user,
                    'id1' => $id1,
                    'id2' => $id2,
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
    }
    public function getMessages($id1, $id2){
        $user = $this->getUser();
        if (isset($user) && !empty($user)){
            if ($user->getId() == $id1){
                $messages = $this->getDoctrine()->getRepository(messages::class)->getConversationUser($id1, $id2);
                $messages = $this->get('serializer')->serialize($messages, 'json');
                $response = new Response($messages);
       
                return $response;
            }else{
                return "You don't have access";
            }
        }
    }
    
}
