<?php

namespace App\Controller;

use App\Entity\Lessonrequest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    public function getLessonsRequests(){
        $user = $this->getUser();

        $listLessonRequests = $this->getDoctrine()->getRepository(Lessonrequest::class)->findBy(['iduser' => $user, 'active' => '1']);
        $listLessonRequests = $this->get('serializer')->serialize($listLessonRequests, 'json');
        $response = new Response($listLessonRequests);
       
        return $response;
    }
}
