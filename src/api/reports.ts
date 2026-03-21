import {
  DeveloperFilters,
  DeveloperReportItem,
  ReviewerApproveStatus,
  ReviewerReportItem,
} from '../types/report';
import { apiFetch } from './client';

type DeveloperResponse = {
  items: DeveloperReportItem[];
};

type ReviewerResponse = {
  items: ReviewerReportItem[];
};

export function fetchDeveloperReports(filters: DeveloperFilters) {
  return apiFetch<DeveloperResponse>('/developer-reports', { params: filters });
}

export function fetchReviewerReports() {
  return apiFetch<ReviewerResponse>('/reviewer-reports');
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
