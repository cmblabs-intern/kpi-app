<?php
namespace App\Repositories;

use App\Models\Employee;

class EmployeeRepository
{
  public function list(array $fields)
  {
    return Employee::select($fields)->latest()->paginate(10);
  }
  
  public function getById(int $id, array $fields)
  {
    return Employee::select($fields)->findOrFail($id);
  }
  
  public function create(array $data)
  {
    return Employee::create([
      'user_id' => $data['user_id'],
      'division_id' => $data['division_id'],
      'employee_code' => $data['employee_code'],
    ]);
  }

  public function update(int $id, array $data)
  {
    $employee = Employee::findOrFail($id);
    $employee->update($data);
    return $employee;
  }
  
  public function delete(int $id)
  {
    $employee = Employee::findOrFail($id);
    $employee->delete();
  }
}