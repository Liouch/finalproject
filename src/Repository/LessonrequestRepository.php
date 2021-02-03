<?php

namespace App\Repository;

use App\Entity\Lessonrequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Lessonrequest|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lessonrequest|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lessonrequest[]    findAll()
 * @method Lessonrequest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LessonrequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lessonrequest::class);
    }

    // /**
    //  * @return Lessonrequest[] Returns an array of Lessonrequest objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Lessonrequest
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function getLessonRequestWithUserName(){
        $conn = $this->getEntityManager()->getConnection();
        $query = "SELECT l.*, users.name, languages.language FROM Lessonrequest l JOIN users ON l.idUser= users.id JOIN languages ON l.idlanguage = languages.id ORDER BY l.id";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAllAssociative();
    }
    public function save(Lessonrequest $Lessonrequest):Lessonrequest {
        $em = $this->getEntityManager();
        $em->persist($Lessonrequest);
        $em->flush();

        return $Lessonrequest;
    }
}
