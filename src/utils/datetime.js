import moment from 'moment';

export default function sortByDatetime(a, b) {
  const momentA = moment.utc(a.createdAt);
  const momentB = moment.utc(b.createdAt);
  return momentA.diff(momentB) * -1; // from newer to older
}
