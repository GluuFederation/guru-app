import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/styles";

import { colors } from "../../../theme";
import { TicketDocument } from "../../../state/types/tickets";

const useStyles = makeStyles({
  root: {
    overflow: "hidden"
  },
  image: {
    maxWidth: "100%"
  },
  caption: {
    color: colors.BLUE,
    textDecoration: "underline"
  },
  captionDiv: {
    marginBottom: "2rem"
  }
});

interface Props {
  document: TicketDocument;
}

enum FileType {
  Pdf,
  Image,
  Text,
  Unknown
}

const TicketAttachment: FunctionComponent<Props> = ({ document }) => {
  const getFileExtension = (filename: string) => {
    const extension = filename.split(".").slice(-1)[0];
    switch (extension) {
      case "pdf":
        return FileType.Pdf;
      case "jpg":
      case "png":
      case "svg":
      case "jpeg":
      case "gif":
        return FileType.Image;
      case "log":
      case "txt":
        return FileType.Text;
      default:
        return FileType.Unknown;
    }
  };
  const classes = useStyles();
  const fileType = getFileExtension(document.fileUrl);
  const fileName = document.fileUrl.split("/").slice(-1)[0];
  const apiHost = process.env.REACT_APP_API_BASE;
  const fileUrl = `${apiHost}${document.fileUrl}`;

  return (
    <div className={classes.root}>
      {fileType == FileType.Image ? (
        <img src={fileUrl} alt="" className={classes.image} />
      ) : (
        ""
      )}
      <div className={classes.captionDiv}>
        <a
          className={classes.caption}
          download={fileName}
          href={fileUrl}
          target="_blank"
        >
          {fileName}
        </a>
      </div>
    </div>
  );
};

export default TicketAttachment;
