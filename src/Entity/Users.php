<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * Users
 *
 * @ORM\Table(name="users", indexes={@ORM\Index(name="fk_UserRole_idx", columns={"idRole"})})
 * @ORM\Entity(repositoryClass="App\Repository\UsersRepository")
 * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
 */
class Users implements UserInterface, \Serializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=45, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=45, nullable=false)
     */
    private $email;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="signUpDate", type="datetime", nullable=false)
     */
    private $signupdate;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=200, nullable=false)
     */
    private $password;

    /**
     * @var int
     *
     * @ORM\Column(name="active", type="integer", nullable=false, options={"default"="1"})
     */
    private $active = '1';

    /**
     * @var \Userroles
     *
     * @ORM\ManyToOne(targetEntity="Userroles")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idRole", referencedColumnName="id")
     * })
     */
    private $idrole;

    /* public function __construct()
    {
        $idrole = new Userroles();
    } */

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getSignupdate(): ?\DateTimeInterface
    {
        return $this->signupdate;
    }

    public function setSignupdate(\DateTimeInterface $signupdate): self
    {
        $this->signupdate = $signupdate;

        return $this;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getActive(): ?int
    {
        return $this->active;
    }

    public function setActive(int $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getIdrole(): ?Userroles
    {
        return $this->idrole;
    }

    public function setIdrole(?Userroles $idrole): self
    {
        $this->idrole = $idrole;

        return $this;
    }

        /************************* */    
    public function getUsername()
    {
        return $this->name;
    }

    public function getSalt()
    {
        return null;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function getRoles()
    {
        return array($this->idrole->getRole());
    }

    public function eraseCredentials()
    {
        
    }
    /** @see \serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->name,
            $this->password,

        ));
    }

    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->name,
            $this->password,

        ) = unserialize($serialized, array('allowed_clases' => false));
    }

    
}
