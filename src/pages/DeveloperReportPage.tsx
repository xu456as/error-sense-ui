import {
  Alert,
  Button,
  Chip,
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
import { useEffect, useState } from 'react';
import { fetchDeveloperReports } from '../api/reports';
import { PageHeader } from '../components/PageHeader';
import { DeveloperFilters, DeveloperReportItem } from '../types/report';
import { downloadCsv } from '../utils/export';

const defaultFilters: DeveloperFilters = {
  appId: '',
  commitId: '',
  taskId: '',
};

function levelColor(level: DeveloperReportItem['criticalLevel']) {
  if (level === 'Critical') {
    return 'error';
  }
  if (level === 'High') {
    return 'warning';
  }
  if (level === 'Medium') {
    return 'info';
  }
  return 'success';
}

export function DeveloperReportPage() {
  const [filters, setFilters] = useState<DeveloperFilters>(defaultFilters);
  const [draftFilters, setDraftFilters] = useState<DeveloperFilters>(defaultFilters);
  const [items, setItems] = useState<DeveloperReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchDeveloperReports(filters);
        if (active) {
          setItems(response.items);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load developer reports');
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
  }, [filters]);

  const handleExport = () => {
    downloadCsv(
      'developer-report.csv',
      ['No.', 'Id', 'Error Pattern', 'Appear Times', 'Root Cause Analysis', 'Suggestion', 'Critical Level'],
      items.map((item, index) => [
        index + 1,
        item.id,
        item.errorPattern,
        item.appearTimes,
        item.rootCauseAnalysis,
        item.suggestion,
        item.criticalLevel,
      ])
    );
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Developer Report"
        subtitle="Inspect recurring error signatures with filters for application and delivery context."
      />
      <Paper sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="App Id"
            value={draftFilters.appId}
            onChange={(event) => setDraftFilters((current) => ({ ...current, appId: event.target.value }))}
            fullWidth
          />
          <TextField
            label="Commit Id"
            value={draftFilters.commitId}
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, commitId: event.target.value }))
            }
            fullWidth
          />
          <TextField
            label="Task Id"
            value={draftFilters.taskId}
            onChange={(event) => setDraftFilters((current) => ({ ...current, taskId: event.target.value }))}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => setFilters(draftFilters)}
            sx={{ minWidth: { md: 140 } }}
          >
            Search
          </Button>
          <Button variant="outlined" onClick={handleExport} sx={{ minWidth: { md: 140 } }}>
            Export CSV
          </Button>
        </Stack>
      </Paper>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Error Pattern</TableCell>
              <TableCell>Appear Times</TableCell>
              <TableCell>Root Cause Analysis</TableCell>
              <TableCell>Suggestion</TableCell>
              <TableCell>Critical Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.errorPattern}</TableCell>
                <TableCell>{item.appearTimes}</TableCell>
                <TableCell>{item.rootCauseAnalysis}</TableCell>
                <TableCell>{item.suggestion}</TableCell>
                <TableCell>
                  <Chip
                    label={item.criticalLevel}
                    color={levelColor(item.criticalLevel)}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
            {!loading && items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No reports matched the current search conditions.</TableCell>
              </TableRow>
            ) : null}
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>Loading developer reports...</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
