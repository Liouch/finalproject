<?php

namespace App\Controller;

use App\Entity\Lessonrequest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LessonRequestController extends AbstractController
{
    
    public function UserLessonsRequests(): Response
    {   
        $user = $this->getUser();
        if(isset($user) && !empty($user)){

            return $this->render('Lessonrequest/addEdit.html.twig', [
                'user' => $user,
            ]);
        }

        return $this->render('Lessonrequest/addEdit.html.twig', [
            'controller_name' => 'LessonRequestController',
        ]);
    }

    public function getUserLessonsRequests(){
        $user = $this->getUser();

        $listLessonRequests = $this->getDoctrine()->getRepository(Lessonrequest::class)->findBy(['iduser' => $user, 'active' => '1']);
        $listLessonRequests = $this->get('serializer')->serialize($listLessonRequests, 'json');
        $response = new Response($listLessonRequests);
       
        return $response;
    }
    public function getAllLessonsRequests(){
        
        /* $listLessonRequests = $this->getDoctrine()->getRepository(Lessonrequest::class)->findBy(['active' => '1']);
        $listLessonRequests = $this->get('serializer')->serialize($listLessonRequests, 'json');
        $response = new Response($listLessonRequests); */
        $user = $this->getUser();
       
        return $this->render('Lessonrequest/showAll.html.twig', [
            'user' => $user,
        ]);
    }
    
}
