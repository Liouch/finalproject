<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
/**
 * Messages
 * @ApiResource()
 * @ORM\Table(name="messages", indexes={@ORM\Index(name="fk_MessageUser_idx", columns={"idUser"}), @ORM\Index(name="fk_MessageTeacher_idx", columns={"idTeacher"})})
 * @ORM\Entity(repositoryClass="App\Repository\MessagesRepository")
 */
class Messages
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
     * @ORM\Column(name="Message", type="string", length=1000, nullable=false)
     */
    private $message;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="MessageDate", type="datetime", nullable=false)
     */
    private $messagedate;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="MessageRead", type="boolean", nullable=true)
     */
    private $messageread = '0';

    /**
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idTeacher", referencedColumnName="id")
     * })
     */
    private $idteacher;

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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getMessagedate(): ?\DateTimeInterface
    {
        return $this->messagedate;
    }

    public function setMessagedate(\DateTimeInterface $messagedate): self
    {
        $this->messagedate = $messagedate;

        return $this;
    }

    public function getMessageRead(): ?bool
    {
        return $this->messageread;
    }

    public function setMessageRead(?bool $messageread): self
    {
        $this->messageread = $messageread;

        return $this;
    }

    public function getIdteacher(): ?Users
    {
        return $this->idteacher;
    }

    public function setIdteacher(?Users $idteacher): self
    {
        $this->idteacher = $idteacher;

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
