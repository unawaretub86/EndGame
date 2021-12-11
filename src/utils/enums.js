const enumRole = {
  ADMIN: 'admin',
  STUDENT: 'student',
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
const enumEnrollmentStatus = {
  // PENDING: 'pending',
  ACEPTED: 'acepted',
  REJECTED: 'rejected'
};
export { enumRole, enumUserStatus, enumUserStatusByLeader, enumEnrollmentStatus };
