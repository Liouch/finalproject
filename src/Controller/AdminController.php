<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Languages;
use App\Entity\Teachers;
use App\Entity\Users;
use App\Entity\Lessonrequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Constraints\Json;

class AdminController extends AbstractController
{
    public function showPanel()
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }
    public function showLanguagesPanel()
    {
        /* $languages = $this->getDoctrine()->getRepository(Languages::class)->findAll();
        return $this->render('admin/languages.html.twig', [
            'languages' => $languages,
        ]) */;
        return $this->render('admin/languages.html.twig');
    }
    public function getLanguages()
    { 
        $languages = $this->getDoctrine()->getRepository(Languages::class)->findAll();
        $serializer = $this->get('serializer');
        $data = $serializer->serialize($languages, 'json');
                        
                        /**** Valid method too to get the object ****/

        /*return new Response($data);*/
        return new Response($data, 200, ["Content-Type" => "application/json"]);
        
    }
    public function addEditLanguages(Request $request){
        $language = $request->request->get('language');
        $editLanguageId = $request->request->get('id');
        $teacherActive = $request->request->get('active');
        if (isset($teacherActive) && ($teacherActive == 0 || $teacherActive == 1) && isset($editLanguageId) && !empty($editLanguageId)){
            $editLanguage = $this->getDoctrine()->getRepository(Languages::class)->find($editLanguageId);
            $editLanguage->setLanguage($editLanguage->getLanguage());
            $editLanguage->setActive($teacherActive);
            $this->getDoctrine()->getRepository(Languages::class)->save($editLanguage);
            ($teacherActive == 0 ? $msg = "Language deactivated" : $msg = "Language activated");
            return new JsonResponse(array(
                'msg' => $msg));
        }
        else if (isset($editLanguageId) && !empty($editLanguageId)){
            $editLanguage = $this->getDoctrine()->getRepository(Languages::class)->find($editLanguageId);
            $editLanguage->setLanguage($language);
            $this->getDoctrine()->getRepository(Languages::class)->save($editLanguage);
            return new JsonResponse(array(
                'msg' => 'Language updated'));
        }else{
            $newLanguage = new Languages();
            $newLanguage->setLanguage($language);
            $newLanguage->setActive("1");

            $this->getDoctrine()->getRepository(Languages::class)->save($newLanguage);
            return new JsonResponse(array(
                'msg' => 'Language added'));
        }
    }
    public function showTeachersPanel()
    {
        return $this->render('admin/teachers.html.twig');
    }
    public function getTeachers()
    { 
        $teachers = $this->getDoctrine()->getRepository(Teachers::class)->getTeachersWithUserInfo();
        $serializer = $this->get('serializer');
        $data = $serializer->serialize($teachers, 'json');
                        
                        /**** Valid method too to get the object ****/

        /*return new Response($data);*/
        return new Response($data, 200, ["Content-Type" => "application/json"]);
        
    }
    public function deactivateTeachers(Request $request)
    {
        
        $teacherId = $request->request->get('id');
        $teacherActive = $request->request->get('active');
        if (isset($teacherActive) && ($teacherActive == 0 || $teacherActive == 1) && isset($teacherId) && !empty($teacherId)){
            $teacherEdit = $this->getDoctrine()->getRepository(Teachers::class)->find($teacherId);
            $teacherEdit->setActive($teacherActive);
            $this->getDoctrine()->getRepository(Teachers::class)->save($teacherEdit);
            ($teacherActive == 0 ? $msg = "Teacher deactivated" : $msg = "Teacher activated");
            return new JsonResponse(array(
                'msg' => $msg));
        }
    }
    public function showLessonRequests()
    {
        return $this->render('admin/lessonRequests.html.twig', [
            
        ]);
    }
    public function getLessonRequests()
    { 
        $lessonRequests = $this->getDoctrine()->getRepository(Lessonrequest::class)->getLessonRequestWithUserName();
        $serializer = $this->get('serializer');
        $data = $serializer->serialize($lessonRequests, 'json');
                        
                        /**** Valid method too to get the object ****/

        /*return new Response($data);*/
        return new Response($data, 200, ["Content-Type" => "application/json"]);
        
    }
    public function deactivateLessonRequests(Request $request)
    {
        $lessonRequestId = $request->request->get('id');
        $lessonActive = $request->request->get('active');
        if (isset($lessonActive) && ($lessonActive == 0 || $lessonActive == 1) && isset($lessonRequestId) && !empty($lessonRequestId)){
            $lessonEdit = $this->getDoctrine()->getRepository(Lessonrequest::class)->find($lessonRequestId);
            $lessonEdit->setActive($lessonActive);
            $this->getDoctrine()->getRepository(Lessonrequest::class)->save($lessonEdit);
            ($lessonActive == 0 ? $msg = "Lesson request deactivated" : $msg = "Lesson request activated");
            return new JsonResponse(array(
                'msg' => $msg));
        }
    }
}
