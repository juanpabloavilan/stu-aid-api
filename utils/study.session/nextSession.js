const calculateNextSession = (lastReviewed, lastScore) => {
  console.log(
    "🚀 ~ file: nextSession.js:2 ~ calculateNextSession ~ lastScore:",
    lastScore
  );
  console.log(
    "🚀 ~ file: nextSession.js:2 ~ calculateNextSession ~ lastReviewed:",
    lastReviewed
  );

  let nextRevision = new Date(lastReviewed);
  console.log(
    "🚀 ~ file: nextSession.js:3 ~ calculateNextSession ~ nextRevision:",
    nextRevision
  );
  if (lastScore <= 1 && lastScore >= 0)
    nextRevision.setDate(nextRevision.getDate());
  if (lastScore <= 2 && lastScore > 1)
    nextRevision.setDate(nextRevision.getDate() + 3);
  if (lastScore <= 3 && lastScore > 2)
    nextRevision.setDate(nextRevision.getDate() + 8);
  if (lastScore <= 4 && lastScore > 3)
    nextRevision.setDate(nextRevision.getDate() + 16);
  if (lastScore <= 5 && lastScore > 4)
    nextRevision.setDate(nextRevision.getDate() + 31);

  console.log(
    "🚀 ~ file: nextSession.js:3 ~ calculateNextSession ~ nextRevision:",
    nextRevision
  );

  return nextRevision;
};

module.exports = calculateNextSession;
