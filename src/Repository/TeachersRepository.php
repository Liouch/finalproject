<?php

namespace App\Repository;

use App\Entity\Teachers;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Teachers|null find($id, $lockMode = null, $lockVersion = null)
 * @method Teachers|null findOneBy(array $criteria, array $orderBy = null)
 * @method Teachers[]    findAll()
 * @method Teachers[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TeachersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Teachers::class);
    }

    // /**
    //  * @return Teachers[] Returns an array of Teachers objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Teachers
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function getTeachersWithUserInfo(){
        $conn = $this->getEntityManager()->getConnection();
        $query = "SELECT t.*, users.name FROM teachers t left join users ON t.idUser= users.id";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAllAssociative();
    }
    public function save(Teachers $teacher):Teachers {
        $em = $this->getEntityManager();
        $em->persist($teacher);
        $em->flush();

        return $teacher;
    }
}
