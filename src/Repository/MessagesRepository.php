<?php

namespace App\Repository;

use App\Entity\Messages;
use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mime\Message;

/**
 * @method Messages|null find($id, $lockMode = null, $lockVersion = null)
 * @method Messages|null findOneBy(array $criteria, array $orderBy = null)
 * @method Messages[]    findAll()
 * @method Messages[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessagesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Messages::class);
    }

    // /**
    //  * @return Messages[] Returns an array of Messages objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Messages
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function getConversationUser($id1, $id2){
        $conn = $this->getEntityManager()->getConnection();
        $query = "SELECT m.* FROM (
            SELECT * FROM messages WHERE iduser=$id1 or idteacher=$id1) m
            WHERE iduser=$id2 or idteacher =$id2";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAllAssociative();
    }
    /* public function getConversationUser($id1, $id2):array{
        $subqb = $this->createQueryBuilder('m')
                ->andWhere ('m.iduser = :val1')
                ->orWhere ('m.idteacher = :val1');
        
        $subquery = $subqb->getQuery();

        $qb = $this->createQueryBuilder1()
                ->select('a')
                ->from(($subquery), 'a')
                ->andWhere('a.iduser = :val2')
                ->orWhere ('a.idteacher = :val2')
                ->setParameter('val1', $id1)
                ->setParameter('val2', $id2);
            
        $query = $qb->getQuery();
        $qb->getDQL();
        $query = $qb->getQuery();
        return $query->execute();

    } */
    /* public function getAllMessagesUser($value):array{
        $qb = $this->createQueryBuilder('m')
                    ->andWhere ('m.iduser = :val')
                    ->orWhere ('m.idteacher = :val')
                    ->setParameter('val', $value)
                    ;
        $query = $qb->getQuery();
        return $query->execute();
    } */
    public function getAllMessagesUser($value){
        $conn = $this->getEntityManager()->getConnection();
        $query = "SELECT m.*, u.name AS idUserName, u1.name as idTeacherName FROM messages m
                        LEFT JOIN users u 
                        ON m.iduser = u.id
                        LEFT JOIN users u1
                        ON m.idteacher =u1.id
                    where iduser = $value or idteacher = $value
                    ";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAllAssociative();       
    }


    public function checkNewMessages($idUser, $isRead=0):array{
        $qb = $this->createQueryBuilder('m')
                    ->andWhere('m.iduser = :val')
                    ->andWhere('m.messageread = :isRead')
                    ->setParameter('val', $idUser)
                    ->setParameter('isRead', $isRead)
                    ;
        $query = $qb->getQuery();
        return $query->execute();
    }
    public function Save(Messages $messages):Messages {
        $em = $this->getEntityManager();
        $em->persist($messages);
        $em->flush();

        return $messages;
    }
}