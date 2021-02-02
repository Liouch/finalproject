<?php

namespace App\Controller;

use App\Entity\Users;
use App\Entity\Languages;
use App\Entity\Teachers;
use App\Entity\Teacherslanguages;
use App\Entity\Userroles;
use App\Form\RegistrationFormType;
use App\Security\LoginFormAuthenticator;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\HttpFoundation\RedirectResponse;


class RegistrationController extends AbstractController
{
    
    public function UserRegister(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $authenticator): Response
    {   
        // Create the registration form with symfony (email, pass and agree terms). New instance of users needed
        $user = new Users();

        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        $existUser = $this->getUser();

        // To edit user profile. We don't use $form->isSubmitted and isvalid 
        // as the form created in the user edit profile is different from the registration form 
        // (which is created by symfony)
        
        //We can check whether the user exists by using $this->getUser or by checking if we get an ID from the form
       /*  $existUser = $request->request->get('idUser');
        if (isset($existUser) && !empty($existUser)){ */
        if (isset($existUser) && !empty($existUser)){
            $usr = $this->getDoctrine()->getRepository(Users::class)->find($existUser);
            $usr->setName($request->request->get("name"));

            $this->save($usr);

            return $this->redirectToRoute('profileUser');

        }
        // To register a new user via symfony form
        if ($form->isSubmitted() && $form->isValid()) {
            
            // encode the plain password
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );
            $user->setName($request->request->get("name"));
            $user->setSignupdate(new \DateTime());
            $role = $this->getDoctrine()->getRepository(Userroles::class)->find(2);
            $user->setIdrole($role);

            $this->Save($user);
            
            // do anything else you need here, like send an email

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );
        }

        return $this->render('registration/registerUser.html.twig', [
            'registrationForm' => $form->createView(),
            
        ]);
    }

    public function TeacherRegister(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $authenticator): Response
    {           
        $user = new Users();
        $teacher = new Teachers();

        //************** if new user ****************
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
         
        if ($form->isSubmitted() && $form->isValid()) {
            
            // encode the plain password
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );
            $user->setName($request->request->get("name"));
            $user->setSignupdate(new \DateTime());
            $role = $this->getDoctrine()->getRepository(Userroles::class)->find(3);
            $user->setIdrole($role);        
           
            $this->Save($user);
            // We get the email from the form by the parameter 'registration_form' which is the name of the form created by symfony
            // We find the userID by finding his email in the DB. This is so as we don't have the UserID because it's automatically assigned when flushed 
            $userEmail = $request->request->get('registration_form')['email'];
            // Try with var $user and not creating a new instance of User as it's already created outside the condition
            $idUser = new Users();
            $idUser = $this->getDoctrine()->getRepository(users::class)->findOneBy(['email' => $userEmail]);

            $this->setTeacherInfo($teacher, $idUser, $request);
            $this->setTeacherProfilePic($teacher, $idUser, $request);
            
            //This should flush the teachers data into the teachers table in the DB
            $this->Save($teacher);

            $this->setTeacherLanguages($idUser, $request);

            
           
            // do anything else you need here, like send an email

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );
            
        }

        //************** If it is already user ****************

        // As I can't get the name of the <form> created in FE, I proceed to create a hidden input with the name
        $userToTeacher = $request->request->get('formUserToTeacher');
        if (isset($userToTeacher)){
            
            $existUser = $this->getUser();
            $isTeacher = $request->request->get('idTeacher');
            
            if (!$isTeacher){
                $this->setTeacherInfo($teacher, $existUser, $request);
                $this->setTeacherProfilePic($teacher, $existUser, $request);
                
                $this->Save($teacher);
                //The following method already deals with the edit profile of the languagues
                $this->setTeacherLanguages($existUser, $request);
                $role = $this->getDoctrine()->getRepository(Userroles::class)->find(3);
                $existUser->setIdrole($role);
                $this->Save($existUser);

                return $guardHandler->authenticateUserAndHandleSuccess(
                    $existUser,
                    $request,
                    $authenticator,
                    'main' // firewall name in security.yaml
                );
            }else{
                // Edit Teacher Profile
                $this->setTeacherInfo($teacher, $existUser, $request);
                $editTeacher = $this->getDoctrine()->getRepository(Teachers::class)->find($isTeacher);
                if($editTeacher){
                    $editTeacher->setTitle($teacher->getTitle());
                    $editTeacher->setDescription($teacher->getDescription());
                    $this->setTeacherProfilePic($editTeacher, $existUser, $request);
                    //$editTeacher->setTeacherProfilePic());
                    $teacher = $editTeacher;
                }
                $this->Save($teacher);
                $this->setTeacherLanguages($existUser, $request);
                return $this->redirectToRoute('profileTeacher');
                }
            
        }
        $teacherData = '
                <label for="name">Title</label>
                <input type="text" class="form-control mb-1" name="Title" id="Title" placeholder="English teacher..." required>
                <label for="languages">Languages you teach</label>
                <select name="languages[]" id="languages" class="form-control mb-1" multiple required>
                </select>
                <label for="description">Description</label>
                <textarea type="text" class="form-control mb-1" maxlength="1000" name="description" id="description" placeholder="Describe yourself as a teacher" required></textarea>
                <label for="profilePic">Profile pic</label>
                <input type="file" id="profilePic" name="profilePic" class="form-control mb-1 p-1" aria-describedby="profilePic" placeholder="profilePic">
            ';
        
        return $this->render('registration/registerTeacher.html.twig', [
            'registrationForm' => $form->createView(),
            'teachersData' => $teacherData,
            
        ]);
       
    }
    public function setTeacherLanguages($user, Request $request){
        $languages = $request->request->get('languages'); //array
        //As this table is a many2many table and we don't manage it through ORM it's best to delete the data from the teacher and add the new languages rather looking and identifying which languages he chose to modify
        // We need the userID to remove all the data from the table which comes from $user
                   
        $idUser = $this->getDoctrine()->getRepository(Teachers::class)->findOneBy(['iduser' => $user]);
        if($idUser){
            $this->getDoctrine()->getRepository(Teacherslanguages::class)->RemoveLanguages($idUser->getIduser());
        }
        for ($i=0; $i<count($languages); ++$i){
            $language = new Teacherslanguages();
            $language->setActive("1");
            $language->setIduser($user);
            $langId = $this->getDoctrine()->getRepository(Languages::class)->find($languages[$i]);
            $language->setIdlanguage($langId);

           
            $this->save($language);

        }
    }
    public function setTeacherInfo($teacher, $user, Request $request){
        
        $teacher->setTitle($request->request->get('Title'));
        $teacher->setDescription($request->request->get('description'));
        $teacher->setIduser($user);
        $teacher->setSignupdate(new \DateTime());
               
       
    }
    public function setTeacherProfilePic($teacher, $user, $request){
        $path = "img/teacher/".$user->getId();
        $uploadedFile = $request->files->get('profilePic');
        if (!empty($uploadedFile)){
            $profilePicName = $uploadedFile->getClientOriginalName();
            $teacher->setProfilepic($profilePicName);
            //Move the profile pic to the established path and name
            $uploadedFile->move($path, $profilePicName);
        }
    }
    public function Save($class){
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($class);
        $entityManager->flush();

    }

}
