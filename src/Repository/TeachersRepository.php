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
}
