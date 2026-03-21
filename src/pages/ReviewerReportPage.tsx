import {
  Alert,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { fetchReviewerReports, updateReviewerReport } from '../api/reports';
import { PageHeader } from '../components/PageHeader';
import { ReviewerApproveStatus, ReviewerReportItem } from '../types/report';

const statusOptions: ReviewerApproveStatus[] = ['Resolved', 'ExistLowImpact'];

export function ReviewerReportPage() {
  const [items, setItems] = useState<ReviewerReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchReviewerReports();
        if (active) {
          setItems(response.items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load reviewer reports');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = <K extends keyof ReviewerReportItem>(
    id: number,
    field: K,
    value: ReviewerReportItem[K]
  ) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async (item: ReviewerReportItem) => {
    setSavingId(item.id);
    setError('');

    try {
      const updated = await updateReviewerReport(item.id, {
        ownerApproveStatus: item.ownerApproveStatus,
        appOwnerExplanation: item.appOwnerExplanation,
        prodAction: item.prodAction,
      });

      setItems((current) =>
        current.map((row) => (row.id === item.id ? { ...row, ...updated, id: row.id } : row))
      );
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save reviewer report');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Reviewer Report"
        subtitle="Review the latest UAT findings, approve disposition, and capture production response guidance."
      />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Error Pattern</TableCell>
              <TableCell>Last Seen In UAT</TableCell>
              <TableCell>Owner Approve Status</TableCell>
              <TableCell>App Owner Explanation</TableCell>
              <TableCell>What to do if it happens in Prod?</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell sx={{ minWidth: 220 }}>{item.errorPattern}</TableCell>
                <TableCell sx={{ minWidth: 140 }}>{item.lastSeenInUat}</TableCell>
                <TableCell sx={{ minWidth: 180 }}>
                  <TextField
                    select
                    value={item.ownerApproveStatus}
                    onChange={(event) =>
                      handleChange(
                        item.id,
                        'ownerApproveStatus',
                        event.target.value as ReviewerApproveStatus
                      )
                    }
                    fullWidth
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell sx={{ minWidth: 260 }}>
                  <TextField
                    value={item.appOwnerExplanation}
                    onChange={(event) =>
                      handleChange(item.id, 'appOwnerExplanation', event.target.value)
                    }
                    fullWidth
                    multiline
                    minRows={2}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 260 }}>
                  <TextField
                    value={item.prodAction}
                    onChange={(event) => handleChange(item.id, 'prodAction', event.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleSave(item)}
                    disabled={savingId === item.id}
                  >
                    {savingId === item.id ? 'Saving...' : 'Save'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!loading && items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No reviewer reports available.</TableCell>
              </TableRow>
            ) : null}
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading reviewer reports...</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
