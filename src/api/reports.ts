import {
  DeveloperFilters,
  DeveloperReportItem,
  ReviewerApproveStatus,
  ReviewerFilters,
  ReviewerReportItem,
} from '../types/report';
import { apiFetch } from './client';

type DeveloperResponse = {
  errCases: DeveloperReportItem[];
};

type ReviewerResponse = {
  errCases: ReviewerReportItem[];
};

export function fetchDeveloperReports(filters: DeveloperFilters, signal?: AbortSignal) {
  return apiFetch<DeveloperResponse>('/v1/errsense/report/dev-summary', { params: filters, signal });
}

export function fetchReviewerReports(filters: ReviewerFilters, signal?: AbortSignal) {
  return apiFetch<ReviewerResponse>('/v1/errsense/report/owner-review', { params: filters, signal });
}

export function updateReviewerReport(
  id: number,
  payload: {
    ownerApproveStatus: ReviewerApproveStatus;
    appOwnerExplanation: string;
    prodAction: string;
  }
) {
  return apiFetch<ReviewerReportItem>(`/reviewer-reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
