<?php
namespace App\Services;

use App\Repositories\DivisionRepository;

class DivisionService
{
  private $divisionRepository;

  public function __construct(DivisionRepository $divisionRepository) {
    $this->divisionRepository = $divisionRepository;
  }

  public function list(array $fields) {
    return $this->divisionRepository->list($fields);
  }

  public function getById(int $id, array $fields)
  {
    return $this->divisionRepository->getById($id, $fields);
  }

  public function create(array $data) {
    return $this->divisionRepository->create($data);
  }
  
  public function update(int $id, array $data) {
    return $this->divisionRepository->update($id, $data);
  }
  
  public function delete(int $id) {
    $this->divisionRepository->delete($id);
  }
}