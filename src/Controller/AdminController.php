<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    public function showPanel(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }
    public function showLanguages(): Response
    {
        return $this->render('admin/languages.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }
    public function showTeachers(): Response
    {
        return $this->render('admin/teachers.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }
    public function showLessonRequests(): Response
    {
        return $this->render('admin/lessonRequests.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }
}
