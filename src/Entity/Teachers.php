<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Teachers
 *
 * @ORM\Table(name="teachers", indexes={@ORM\Index(name="fk_TeacherUser_idx", columns={"idUser"})})
 * @ORM\Entity(repositoryClass="App\Repository\TeachersRepository")
 */
class Teachers
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
     * @ORM\Column(name="title", type="string", length=200, nullable=false)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=1000, nullable=false)
     */
    private $description;

    /**
     * @var int|null
     *
     * @ORM\Column(name="rating", type="integer", nullable=true, options={"default"="NULL"})
     */
    private $rating = 'NULL';

    /**
     * @var string
     *
     * @ORM\Column(name="profilePic", type="string", length=450, nullable=false)
     */
    private $profilepic;

    /**
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idUser", referencedColumnName="id")
     * })
     */
    private $iduser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getProfilepic(): ?string
    {
        return $this->profilepic;
    }

    public function setProfilepic(string $profilepic): self
    {
        $this->profilepic = $profilepic;

        return $this;
    }

    public function getIduser(): ?Users
    {
        return $this->iduser;
    }

    public function setIduser(?Users $iduser): self
    {
        $this->iduser = $iduser;

        return $this;
    }


}
