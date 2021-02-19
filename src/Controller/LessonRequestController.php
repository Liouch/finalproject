<?php

namespace App\Controller;

use App\Entity\Lessonrequest;
use App\Entity\Languages;
use DateTime;
use DateTimeZone;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
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

    public function addEditLessonRequest(Request $request){
        $user = $this->getUser();
        $title = $request->request->get('title');
        $description = $request->request->get('description');
        $idlanguage = $request->request->get('idlanguage');
        $date = new DateTime("now", new DateTimeZone("Europe/Madrid"));
        $idLesson = $request->request->get('idlesson');
       
        $isLanguageActive = $this->getDoctrine()->getRepository(Languages::class)->find($idlanguage);
        if ($idLesson) $existLesson = $this->getDoctrine()->getRepository(Lessonrequest::class)->find($idLesson);
        
        if (isset($existLesson) && !empty($existLesson)){
            if ($isLanguageActive->getActive() == 1){
                $existLesson->setTitle($title);
                $existLesson->setDescription($description);
                $existLesson->setIdLanguage($isLanguageActive);
                $this->getDoctrine()->getRepository(Lessonrequest::class)->save($existLesson);
                
                $response = $this->get('serializer')->serialize("Lesson request modified", 'json');
                $response = new Response($response);
        
                return $response;
            }else{
                $response = $this->get('serializer')->serialize("Language no longer available, choose another one", 'json');
                $response = new Response($response);
       
                return $response;
            }
        }

        if ($isLanguageActive->getActive() == 1){
            $lessonRequest = new Lessonrequest();
            $lessonRequest->setIdUser($user);
            $lessonRequest->setTitle($title);
            $lessonRequest->setDescription($description);
            $lessonRequest->setIdLanguage($isLanguageActive);
            $lessonRequest->setDate($date);
            $lessonRequest->setActive(1);

            $this->getDoctrine()->getRepository(Lessonrequest::class)->save($lessonRequest);

            $response = $this->get('serializer')->serialize("Lesson request sent", 'json');
            $response = new Response($response);
       
            return $response;
        }else{
            $response = $this->get('serializer')->serialize("Language no longer available, choose another one", 'json');
            $response = new Response($response);
       
            return $response;
        }
    }
    
}
