import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
import BarChartFill from '@iconify/icons-eva/bar-chart-fill';
import { enumRole } from '../../utils/enums';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = (role) => {
  const configArray = [];

  if (role === enumRole.ADMIN)
    configArray.push(
      {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'user',
        path: '/dashboard/user',
        icon: getIcon(peopleFill)
      },
      {
        title: 'project',
        path: '/dashboard/project',
        icon: getIcon(shoppingBagFill)
      }
    );

  if (role === enumRole.LEADER)
    configArray.push(
      {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'user',
        path: '/dashboard/user',
        icon: getIcon(peopleFill)
      },
      {
        title: 'project',
        path: '/dashboard/project',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'enrollments',
        path: '/dashboard/enrollments',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'advancements',
        path: '/dashboard/advance',
        icon: getIcon(BarChartFill)
      }
    );

  if (role === enumRole.STUDENT)
    configArray.push(
      {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill)
      },
      {
        title: 'Projects',
        path: '/dashboard/project',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'advancements',
        path: '/dashboard/advance',
        icon: getIcon(BarChartFill)
      }
    );

  console.log(configArray);

  return configArray;
};

export default sidebarConfig;
