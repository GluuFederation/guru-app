export const getChipClass = (slug: string): string => {
  switch (slug) {
    case "production-outage":
      return "chip red";
    case "production-impaired":
      return "chip purple";
    case "pre-production-issue":
      return "chip light-blue";
    case "minor-issue":
      return "chip green";
    case "new-development-issue":
      return "chip orange";
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

export const getCardClass = (slug: string): string => {
  switch (slug) {
    case "production-outage":
      return "card red";
    case "production-impaired":
      return "card purple";
    case "pre-production-issue":
      return "card blue";
    case "minor-issue":
      return "card green";
    case "new-development-issue":
      return "card gray";
    case "new":
      return "card light-blue";
    case "in-progress":
      return "card green";
    case "assigned":
      return "card gray";
    case "pending":
      return "card yellow";
    case "closed":
      return "card red";
    case "community":
      return "card light-blue";
  }
  return "card gray";
};

export const formatChipText = (text: string): string => {
  if (text.length > 20) {
    return `${text.substring(0, 20)}...`;
  }
  return text;
};
