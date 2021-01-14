<?php

namespace App\Controller;

use App\Entity\Languages;
use App\Entity\Teachers;
use App\Entity\Teacherslanguages;
use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    
    public function UserProfile()
    {
        $user = $this->getUser();
        //User is set as it's logged, we could pass it as a parameter or just call it in the template
        // Would be it convinient to create the logic to check the user in the db or if the user is set and not empty?
        

        return $this->render('user/userProfile.html.twig', [
            'user' => $user,
        ]);
    }
    public function TeacherProfile()
    {
        $teacher = new Teachers();
        $user = $this->getUser();
        $teacherLanguages = new Teacherslanguages();

        $languages = $this->getDoctrine()->getRepository(Languages::class)->findAll();
        if ($user){
            $teacher = $this->getDoctrine()->getRepository(Teachers::class)->findOneBy(['iduser' => $user->getId()]);
            $teacherLanguages = $this->getDoctrine()->getRepository(Teacherslanguages::class)->findBy(['iduser' => $user->getId()]);
        }
        

        return $this->render('user/teacherProfile.html.twig', [
            'Teacher' => $teacher,
            'Languages' => $languages,
            'user' => $user,
            'TeacherLanguages' => $teacherLanguages,
        ]);
    }
}

