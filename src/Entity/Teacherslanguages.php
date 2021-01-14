<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Teacherslanguages
 *
 * @ORM\Table(name="teachersLanguages", indexes={@ORM\Index(name="fk_teacherLanguage_idx", columns={"idLanguage"}), @ORM\Index(name="fk_teacherID_idx", columns={"idUser"})})
 * @ORM\Entity(repositoryClass="App\Repository\TeachersLanguagesRepository")
 */
class Teacherslanguages
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
     * @var bool
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    private $active = '0';

    /**
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idUser", referencedColumnName="id")
     * })
     */
    private $iduser;

    /**
     * @var \Languages
     *
     * @ORM\ManyToOne(targetEntity="Languages")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idLanguage", referencedColumnName="id")
     * })
     */
    private $idlanguage;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
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

    public function getIdlanguage(): ?Languages
    {
        return $this->idlanguage;
    }

    public function setIdlanguage(?Languages $idlanguage): self
    {
        $this->idlanguage = $idlanguage;

        return $this;
    }


}
