<?php
namespace Emeric0101\PHPAngular\Controller;
use Emeric0101\PHPAngular\Entity\Test as TestEntity;
class Test extends Controller {
    public function test() {
        $test = $this->entityManager->getRepository("Emeric0101\PHPAngular\Entity\Test")->findOneById(1);
        /*$this->entityManager->persist($test);
        $this->entityManager->flush();*/
        $this->response->setResponse("Test", $test);
        return true;
    }

    public function post() {
        $t = $this->request->postFromArray("Test", "content", "");
        $this->response->setResponse("post", $t);
        return true;

    }
}
