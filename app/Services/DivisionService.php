<?php
namespace App\Services;

use App\Repositories\DivisionRepository;
use Illuminate\Support\Facades\Cache;

class DivisionService
{
  private $divisionRepository;

  public function __construct(DivisionRepository $divisionRepository) {
    $this->divisionRepository = $divisionRepository;
  }

  public function list(array $fields, ?int $perPage = null) {
    return $this->divisionRepository->list($fields, $perPage);
  }

  public function getById(int $id, array $fields)
  {
    return $this->divisionRepository->getById($id, $fields);
  }

  private function clearAllDivisionsCache(): void
    {
        Cache::forget('all_divisions');
    }

  public function create(array $data) {
    $division = $this->divisionRepository->create($data);
    $this->clearAllDivisionsCache();
    return $division;
  }
  
  public function update(int $id, array $data) {
    $division = $this->divisionRepository->update($id, $data);
    $this->clearAllDivisionsCache();
    return $division;
  }
  
  public function delete(int $id) {
    $this->divisionRepository->delete($id);
    $this->clearAllDivisionsCache();
  }
}