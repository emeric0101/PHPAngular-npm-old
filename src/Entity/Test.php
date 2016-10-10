<?php

namespace Emeric0101\PHPAngular\Entity;
/**
 * User
 *
 * @Table(name="test")
 * @Entity(repositoryClass="Emeric0101\PHPAngular\Repository\TestRepository")
 */
class Test extends EntityAbstract
{
    /**
     * @var int
     *
     * @Column(name="id", type="integer")
     * @Id
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
    * @Column(name="content", type="string")
    */
    private $content;

    public function getId() {return $this->id;}

    public function setContent($string) {
        $this->content = $string;
    }

    public function getContent() {
        return $this->content;
    }
}
