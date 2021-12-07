import { useQuery } from '@apollo/client';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  NativeSelect,
  FormControl,
  InputLabel,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  ProjectListHead,
  ProjectListToolbar,
  ProjectMoreMenu
} from '../components/_dashboard/enrollments';
//
import { GET_ENROLLMENTS } from '../graphql/enrollments/enr-queries';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'id', label: 'Id', alignRight: false },
  { id: 'project', label: 'Project', alignRight: false },
  { id: 'student', label: 'student', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'enrollmentDate', label: 'enrollmentDate', alignRight: false },
  { id: 'egressDate', label: 'egressDate', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_project) => _project.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Enrollments() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('project');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, error, loading } = useQuery(GET_ENROLLMENTS);
  console.log(data);
  useEffect(() => {
    if (error) {
      console.log('Error consulting users', error);
    }
  }, [error]);

  if (loading) return <div>Loading....</div>;

  const dataEnrollments = data.allEnrollments;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataEnrollments.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataEnrollments.length) : 0;

  const filteredProjects = applySortFilter(
    dataEnrollments,
    getComparator(order, orderBy),
    filterName
  );

  const isProjectNotFound = filteredProjects.length === 0;

  return (
    <Page title="Enrollments | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Enrollments
          </Typography>
        </Stack>

        <Card>
          <ProjectListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProjectListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataEnrollments.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProjects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, project, student, status, enrollmentDate, egressDate } = row;
                      const isItemSelected = selected.indexOf(project) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, project)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {project}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{student}</TableCell>
                          <TableCell align="left" value={status}>
                            <FormControl fullWidth>
                              <InputLabel
                                variant="standard"
                                htmlFor="uncontrolled-native"
                                color="success"
                              >
                                {status}
                              </InputLabel>
                              <NativeSelect
                                inputProps={{
                                  name: 'select',
                                  id: 'uncontrolled-native'
                                }}
                                onChange={(e) => console.log(e.target.value)}
                              >
                                <option disabled hidden>
                                  {' '}
                                </option>
                                <option>Accepted</option>
                                <option>Rejected</option>
                              </NativeSelect>
                            </FormControl>
                          </TableCell>
                          <TableCell align="left">{enrollmentDate}</TableCell>
                          <TableCell align="left">{egressDate}</TableCell>
                          <TableCell align="right">
                            <ProjectMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProjectNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataEnrollments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
