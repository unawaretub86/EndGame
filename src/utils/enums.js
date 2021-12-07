const enumRole = {
  ADMIN: 'admin',
  STUDENT: 'Student',
  LEADER: 'leader'
};

const enumUserStatus = {
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  NO_AUTHORIZED: 'no_authorized'
};
const enumUserStatusByLeader = {
  PENDING: 'pending',
  AUTHORIZED: 'authorized'
};
const EnrollmentStatus = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};
export { enumRole, enumUserStatus, enumUserStatusByLeader, EnrollmentStatus };
