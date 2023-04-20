const calculateNextSession = (lastReviewed, lastScore) => {
  let nextRevision = new Date(lastReviewed);
  if (lastScore <= 1) nextRevision.setDate(nextRevision.getDate() + 1);
  if (lastScore <= 2 && lastScore > 1)
    nextRevision.setDate(nextRevision.setDate(nextRevision.getDate + 2));
  if (lastScore <= 3 && lastScore > 2)
    nextRevision.setDate(nextRevision.setDate(nextRevision.getDate + 7));
  if (lastScore <= 4 && lastScore > 3)
    nextRevision.setDate(nextRevision.setDate(nextRevision.getDate + 15));
  if (lastScore <= 5 && lastScore > 4)
    nextRevision.setDate(nextRevision.setDate(nextRevision.getDate + 30));

  console.log(
    "🚀 ~ file: flashcard.model.js:68 ~ set ~ nextRevision:",
    nextRevision
  );
  return nextRevision;
};

module.exports = calculateNextSession;
