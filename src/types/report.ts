export type CriticalLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type DeveloperReportItem = {
  id: number;
  errorPattern: string;
  appearTimes: number;
  rootCauseAnalysis: string;
  suggestion: string;
  criticalLevel: CriticalLevel;
};

export type DeveloperFilters = {
  appId: string;
  commitId: string;
  taskId: string;
};

export type ReviewerApproveStatus = 'Resolved' | 'ExistLowImpact';

export type ReviewerReportItem = {
  id: number;
  errorPattern: string;
  lastSeenInUat: string;
  ownerApproveStatus: ReviewerApproveStatus;
  appOwnerExplanation: string;
  prodAction: string;
};
