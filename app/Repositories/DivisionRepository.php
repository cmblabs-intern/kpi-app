<?php
namespace App\Repositories;

use App\Models\Division;

class DivisionRepository
{
  public function list(array $fields)
  {
    return Division::select($fields)->latest()->paginate(10);
  }

  public function getById(int $id, array $fields)
  {
    return Division::select($fields)->findOrFail($id);
  }
  
  public function create(array $data)
  {
    return Division::create($data);
  }

  public function update(int $id, array $data)
  {
    $division = Division::findOrFail($id);
    $division->update($data);
    return $division;
  }
  
  public function delete(int $id)
  {
    $division = Division::findOrFail($id);
    $division->delete($id);
  }
}