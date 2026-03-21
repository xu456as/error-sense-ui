import {
  DeveloperFilters,
  DeveloperReportItem,
  ReviewerApproveStatus,
  ReviewerFilters,
  ReviewerReportItem,
} from '../types/report';
import { apiFetch } from './client';

type DeveloperResponse = {
  items: DeveloperReportItem[];
};

type ReviewerResponse = {
  items: ReviewerReportItem[];
};

export function fetchDeveloperReports(filters: DeveloperFilters, signal?: AbortSignal) {
  return apiFetch<DeveloperResponse>('/developer-reports', { params: filters, signal });
}

export function fetchReviewerReports(filters: ReviewerFilters, signal?: AbortSignal) {
  return apiFetch<ReviewerResponse>('/reviewer-reports', { params: filters, signal });
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
