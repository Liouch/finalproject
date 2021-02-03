<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
/**
 * Teachers
 * @ApiResource(attributes={"pagination_client_items_per_page"=true})
 * @ApiFilter(OrderFilter::class, properties={"signupdate": "ASC"}, arguments={"orderParameterName"="order"})
 * @ApiFilter(SearchFilter::class, properties={"active": "exact"})
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
     * @var string|null
     *
     * @ORM\Column(name="profilePic", type="string", length=450, nullable=true, options={"default"="NULL"})
     */
    private $profilepic = 'NULL';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="signUpDate", type="datetime", nullable=false)
     */
    private $signupdate;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="active", type="boolean", nullable=true, options={"default"="1"})
     */
    private $active = true;

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

    public function setProfilepic(?string $profilepic): self
    {
        $this->profilepic = $profilepic;

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

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): self
    {
        $this->active = $active;

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
