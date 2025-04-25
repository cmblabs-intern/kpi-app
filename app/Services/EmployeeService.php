<?php
namespace App\Services;

use App\Repositories\EmployeeRepository;

class EmployeeService 
{
  private $employeeRepository;

  public function __construct(EmployeeRepository $employeeRepository) {
    $this->employeeRepository = $employeeRepository;
  }

  public function list(array $fields) {
    return $this->employeeRepository->list($fields);
  }
  
  public function getById(int $id, array $fields) {
    return $this->employeeRepository->getById($id, $fields ?? ['*']);
  }
  
  public function create(array $data) {
    return $this->employeeRepository->create($data);
  }
  
  public function update(int $id, array $data) {
    return $this->employeeRepository->update($id, $data);
  }
  
  public function delete(int $id) {
    $this->employeeRepository->delete($id);
  }
}