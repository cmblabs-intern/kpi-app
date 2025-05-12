<?php
namespace App\Repositories;

use App\Models\KpiAssessmentDetail;

class KpiAssessmentDetailRepository
{
  public function list(array $fields)
  {
    return KpiAssessmentDetail::select($fields)->latest()->paginate(10);
  }

  public function getById(int $id, array $fields)
  {
    return KpiAssessmentDetail::select($fields)->findOrFail($id);
  }

  public function withRelations()
{
    return KpiAssessmentDetail::with(['assessment.employee.user', 'metric.division'])->get();
}

}