<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Lessonrequest
 *
 * @ORM\Table(name="lessonRequest", indexes={@ORM\Index(name="fk_LessonUser_idx", columns={"idUser"}), @ORM\Index(name="fk_LessonLanguage_idx", columns={"idLanguage"})})
 * @ORM\Entity(repositoryClass="App\Repository\LessonrequestRepository")
 */
class Lessonrequest
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
     * @ORM\Column(name="description", type="string", length=1000, nullable=false)
     */
    private $description;

    /**
     * @var \Languages
     *
     * @ORM\ManyToOne(targetEntity="Languages")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idLanguage", referencedColumnName="id")
     * })
     */
    private $idlanguage;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getIdlanguage(): ?Languages
    {
        return $this->idlanguage;
    }

    public function setIdlanguage(?Languages $idlanguage): self
    {
        $this->idlanguage = $idlanguage;

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
