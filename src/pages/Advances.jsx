import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'lodash';
import * as React from 'react';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ProjectListHead, ProjectListToolbar } from '../components/_dashboard/enrollments';
//
import { ADVANCES_BY_LEADER_ID, ADVANCES_BY_STUDENT_ID } from '../graphql/advances/ad-queries';
import { ContextModal } from '../contexts/ContextModal';
import ModalWindow from '../components/generic-containers/ModalWindow';
import FormDoObserv from '../components/projects/FormDoObserv';
import { ContextUser } from '../contexts/ContextUser';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'project', label: 'Project', alignRight: false },
  { id: 'student', label: 'Student', alignRight: false },
  { id: 'addDate', label: 'addDate', alignRight: false },
  { id: 'leaderDate', label: 'LeaderDate', alignRight: false }
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
      (_project) => _project.project.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}



function advanceListQUERY(role){
  switch(role){
    case 'leader':
      return ADVANCES_BY_LEADER_ID;
    default:
      return ADVANCES_BY_STUDENT_ID;
  }
}



// --------------------------------------------------Cabecera del componente

export default function Advances() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataAdvances, setDataAdvances] = useState([]);
  const ref = useRef(null);
  const [stModal, setStModal] = React.useState({ title: '', content: Function, open: false });
  const { userData } = React.useContext(ContextUser);
// 
  const { error, loading } = useQuery(advanceListQUERY(userData.role),
    {
      onCompleted: (data) => {
        console.log("Advc - data ",data);
        const rawData = data.advancesByLeaderId || data.advancesByStudentId;
        const realData = rawData.map((adv) =>
          (
            {
              _id: adv._id,
              project: adv.enrollment.project.name,
              student: adv.enrollment.student.name.concat(' ', adv.enrollment.student.lastName),
              addDate: adv.addDate,
              leaderDate: adv.leaderDate,
              description: adv.description,
              observations: adv.observations
            }
          )
        );
        setDataAdvances(realData);
      },
      fetchPolicy: 'network-only'
    }
  );

  useEffect(() => {
    if (error) {
      console.log('Error consulting advances', error);
    }
  }, [error]);

  if (loading) return <div>Loading....</div>;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataAdvances.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataAdvances.length) : 0;

  const filteredProjects = applySortFilter(dataAdvances, getComparator(order, orderBy), filterName);

  const isProjectNotFound = filteredProjects.length === 0;

  return (
    <Page title="Advances | Mercurio">
      <ContextModal.Provider value={{ stModal, setStModal }}>
      <ModalWindow
          titleModal={stModal.title}
          contentModal={stModal.content}
          openModal={stModal.open}
        />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Advances
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
                  rowCount={dataAdvances.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProjects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, project, student, addDate, leaderDate } = row;
                      const isItemSelected = selected.indexOf(addDate) !== -1;

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
                            <Typography>&nbsp;</Typography>
                            {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, enrollment.project.name)}
                            /> */}
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography variant="subtitle2" noWrap>
                                {project}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{student}</TableCell>
                          <TableCell align="left">{addDate}</TableCell>
                          <TableCell align="left">{leaderDate}</TableCell>
                          <TableCell align="right">
                            <IconButton ref={ref} onClick={() => 
                              setStModal({
                                title: 'Observe Advance',
                                content: <FormDoObserv dataID={_id} project={project} student={student}/>,
                                open: true
                              })
                            }>
                              <Icon
                                icon="et:search"
                                width={30}
                                height={30}
                                color="secondary"
                                variant="outlined"
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
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
            count={dataAdvances.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <pre>{JSON.stringify(dataAdvances, null, 2)}</pre>
      </ContextModal.Provider>
    </Page>
  );
}
