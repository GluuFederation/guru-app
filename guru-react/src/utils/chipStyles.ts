export const getChipClass = (slug: string): string => {
  switch (slug) {
    case "production-outage":
      return "chip gray";
    case "production-impaired":
      return "chip blue";
    case "pre-production-issue":
      return "chip purple";
    case "minor-issue":
      return "chip green";
    case "new-development-issue":
      return "chip red";
    case "new":
      return "chip light-blue";
    case "in-progress":
      return "chip green";
    case "assigned":
      return "chip gray";
    case "pending":
      return "chip yellow";
    case "closed":
      return "chip red";
    case "community":
      return "chip light-blue";
  }
  return "chip gray";
};
