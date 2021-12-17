import React from 'react';
import { Grid, Paper, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
// components
import { ContextModal } from '../contexts/ContextModal';
import ModalWindow from '../components/generic-containers/ModalWindow';
import MediaCard from '../components/generic-containers/MediaCard';
import FormCreateProject from '../components/projects/FormCreateProject';
// utilities
import {
  GET_PROJECTS_ALL,
  GET_PROJECTS_OF_LEADER,
  GET_PROJECTS_BY_STATUS
} from '../graphql/projects/prj-queries';
import { ContextUser } from '../contexts/ContextUser';
import { enumRole } from '../utils/enums';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const imgarray = [
  'https://www.biospace.com/getasset/83298754-d463-4202-a940-9af7c0dca39e/',
  'https://www.wallpapertip.com/wmimgs/51-517415_go-back-gallery-for-cool-science-backgrounds-cool.jpg',
  'https://scienceoxford.com/wp-content/uploads/2016/08/potions2-e1470398708986-800x483.jpg',
  'https://www.ucl.ac.uk/medical-sciences/sites/medical_sciences/files/microscope_blue_gloves.jpeg',
  'https://blog.mmumullana.org/wp-content/uploads/2019/12/blog-image-for-Computer-Science.jpg',
  'https://www.nsf.gov/news/mmg/media/images/oceans_nsf-v2_9e8b03d8-14ae-4c47-8f12-385e4357ed3f_f.jpg',
  'https://sites.uw.edu/bevanseries/files/2018/03/154062807_science-communication_-iStockphoto_Thinkstock-1goqkz6-816x528.jpg',
  'https://www.biospace.com/getasset/83298754-d463-4202-a940-9af7c0dca39e/',
  'https://www.wallpapertip.com/wmimgs/51-517415_go-back-gallery-for-cool-science-backgrounds-cool.jpg',
  'https://scienceoxford.com/wp-content/uploads/2016/08/potions2-e1470398708986-800x483.jpg',
  'https://www.ucl.ac.uk/medical-sciences/sites/medical_sciences/files/microscope_blue_gloves.jpeg',
  'https://blog.mmumullana.org/wp-content/uploads/2019/12/blog-image-for-Computer-Science.jpg',
  'https://www.nsf.gov/news/mmg/media/images/oceans_nsf-v2_9e8b03d8-14ae-4c47-8f12-385e4357ed3f_f.jpg',
  'https://sites.uw.edu/bevanseries/files/2018/03/154062807_science-communication_-iStockphoto_Thinkstock-1goqkz6-816x528.jpg'
];

function Project() {
  const { userData } = React.useContext(ContextUser);

  const [stModal, setStModal] = React.useState({ title: '', content: Function, open: false });
  const [isStudentProjects, setIsStudentProjects] = React.useState(true);

  let PROJECT_QUERY; // una variable para alojar el gql
  let subSet; // una var para definir nombre de sub-objeto de la data
  // condiciones para definir el estado segun rol
  if (userData.role === enumRole.LEADER) {
    PROJECT_QUERY = GET_PROJECTS_OF_LEADER;
    subSet = 'projectByLeaderId';
  }
  if (userData.role === enumRole.ADMIN) {
    PROJECT_QUERY = GET_PROJECTS_ALL;
    subSet = 'allProjects';
  }
  if (userData.role === enumRole.STUDENT) {
    PROJECT_QUERY = GET_PROJECTS_BY_STATUS;
    subSet = 'projectByStatus';
  }

  const { data, error, loading } = useQuery(PROJECT_QUERY, {
    variables: { leaderId: userData._id, inStatus: 'active' },
    fetchPolicy: 'network-only'
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :x</p>;
  }

  console.log('Projects ~ data ~ ', data);
  const dataAllProjects = data[subSet].map((project, index) => ({
    ...project,
    urlimg: imgarray[index]
  }));

  return (
    <>
      <ContextModal.Provider value={{ stModal, setStModal }}>
        <ModalWindow
          titleModal={stModal.title}
          contentModal={stModal.content}
          openModal={stModal.open}
        />
        {userData.role === 'leader' ? (
          <Button
            size="small"
            type="button"
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() =>
              setStModal({ title: 'Create Project', content: <FormCreateProject />, open: true })
            }
          >
            <Icon icon="bi:plus-circle" width={24} height={24} />
            <Typography>Add Project</Typography>
          </Button>
        ) : null}
        {userData.role === 'student' ? (
          <>
            <Button
              size={isStudentProjects ? 'medium' : 'small'} 
              type="button"
              xs={6}
              variant={isStudentProjects ? 'contained' : 'outlined'}
              sx={{ mb: 2}}
              onClick={() => setIsStudentProjects(true)}
            >
              <Icon icon="bytesize:portfolio" width={24} height={24}/>
              <Typography sx={{ml:2}}>My Projects</Typography>
            </Button>
            <Button
              size={isStudentProjects ? 'small' : 'medium'}
              xs={6}
              type="button"
              variant={isStudentProjects ? 'outlined' : 'contained'}
              sx={{ mb: 2, mx: 1 }}
              onClick={() =>setIsStudentProjects(false)}
            >
              <Icon icon="fa-solid:university" width={24} height={24} />
              <Typography sx={{ml:2}}>All projects</Typography>
            </Button>
          </>
        ) : null}
        <Grid container spacing={2}>
          {dataAllProjects.map((project) => (
            <Grid key={project._id} item xs={4}>
              <Item>
                <MediaCard
                  dataID={project._id}
                  title={project.name}
                  description={project.generalObjective}
                  image={project.urlimg}
                  alt={project.name}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
        <pre>{JSON.stringify(dataAllProjects, null, 2)}</pre>
      </ContextModal.Provider>
    </>
  );
}

export default Project;
