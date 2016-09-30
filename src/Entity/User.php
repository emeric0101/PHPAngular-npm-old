<?php

namespace Emeric0101\PHPAngular\Entity;
use Emeric0101\PHPAngular\Entity\IUser;
/**
 * User
 *
 * @Table(name="user")
 * @Entity(repositoryClass="Emeric0101\PHPAngular\Repository\UserRepository")
 */
class User extends EntityAbstract implements IUser
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
     * @var string
     *
     * @Column(name="firstName", type="string", length=255, nullable=true)
     */
    private $firstName;

    /**
     * @var string
     *
     * @Column(name="lastName", type="string", length=255, nullable=true)
     */
    private $lastName;

    /**
     * @var string
     *
     * @Column(name="nickname", type="string", length=255, nullable=true)
     */
    private $nickname;

    /**
     * @var string
     *
     * @Column(name="password", type="string", length=255, nullable=true)
     */
    private $password;


    /**
     * @var string
     *
     * @Column(name="mail", type="string", length=255, unique=true)
     */
    private $mail;


    /**
     * Bidirectional - One-To-Many (INVERSE SIDE)
     *
     * @OneToMany(targetEntity="Emeric0101\PHPAngular\Entity\Session", mappedBy="user", cascade={"persist", "remove"})
     */
    private $sessions;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set presentation
     *
     * @param string $presentation
     *
     * @return User
     */
    public function setPresentation($presentation)
    {
        $this->presentation = $presentation;

        return $this;
    }

    /**
     * Get presentation
     *
     * @return string
     */
    public function getPresentation()
    {
        return $this->presentation;
    }
    /**
     * Set address
     *
     * @param string $address
     *
     * @return User
     */
    public function setAddress($address)
    {
        $this->address = $address;
        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }
    /**
     * Set cp
     *
     * @param string $cp
     *
     * @return User
     */
    public function setCp($cp)
    {
        $this->cp = $cp;

        return $this;
    }

    /**
     * Get cp
     *
     * @return string
     */
    public function getCp()
    {
        return $this->cp;
    }
    /**
     * Set city
     *
     * @param string $city
     *
     * @return User
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }
    /**
     * Set country
     *
     * @param string $country
     *
     * @return User
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set sex
     *
     * @param integer $sex
     *
     * @return User
     */
    public function setSex($sex)
    {
        $this->sex = $sex;

        return $this;
    }

    /**
     * Get sex
     *
     * @return int
     */
    public function getSex()
    {
        return $this->sex;
    }

    /**
     * Set mail
     *
     * @param string $mail
     *
     * @return User
     */
    public function setMail($mail)
    {
        $this->mail = $mail;

        return $this;
    }

    /**
     * Get mail
     *
     * @return string
     */
    public function getMail()
    {
        return $this->mail;
    }

    public function setFbid($id) {
        $this->fbid = $id;
        return $this;
    }

    public function getFbid() {
        return $this->fbid;
    }
    /**
     * Set score
     *
     * @param integer $score
     *
     * @return User
     */
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    public function setCreated(\Datetime $c) {
        $this->created = $c;
        return $this;
    }
    public function getCreated() {
        return $this->created;
    }

    public function setBirthday(\Datetime $c) {
        $this->birthday = $c;
        return $this;
    }

    public function getBirthday() {
        return $this->birthday;
    }

    /**
     * Get score
     *
     * @return int
     */
    public function getScore()
    {
        return $this->score;
    }

    public function getNickname() {
        return $this->nickname;
    }
    /** The method return NULL because the password should not be json encoded
    */
    public function getPassword() {
        return NULL;
    }


    public function addPhotos(Photo $photo) {
        $this->photos[] = $photo;
        return $this;
    }




    public function setHashedPassword(string $p) {
        $this->password = static::hashPassword($p);
        return $this;
    }

    public static function hashPassword(string $p) {
        return hash('sha256', $p);
    }

}
