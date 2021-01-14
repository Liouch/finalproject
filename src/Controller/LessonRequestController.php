<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LessonRequestController extends AbstractController
{
    
    public function index(): Response
    {   
        $user = $this->getUser();
        if(isset($user) && !empty($user)){

            return $this->render('Lessonrequest/index.html.twig', [
                'user' => $user,
            ]);
        }

        return $this->render('Lessonrequest/index.html.twig', [
            'controller_name' => 'LessonRequestController',
        ]);
    }
}
