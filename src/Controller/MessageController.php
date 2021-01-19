<?php

namespace App\Controller;

use App\Entity\Messages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    
    public function showConversations(): Response
    {
        $user = $this->getUser();
        $userId = "";
        if ($user->getIdRole()->getId() == 3){
            $userId = "idteacher";
        }else{
            $userId = "iduser";
        }
        $userMessages = $this->getDoctrine()->getRepository(Messages::class)->findBy([$userId => $user->getId()]);
        $count = count($userMessages);
        for ($i=0; $i<count($userMessages); $i++){
            for ($j=$i+1; $j<count($userMessages); $j++){
                if ($userMessages[$i]->getIdUser()->getId() == $userMessages[$j]->getIdUser()->getId()){
                    unset($userMessages[$i]);
                };
            }
        }
        return $this->render('message/index.html.twig', [
            'controller_name' => 'MessageController',
            'user' => $user,
            'userMessages' => $userMessages,
            
        ]);
    }
}
