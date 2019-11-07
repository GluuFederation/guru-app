import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import { colors } from "../../theme";
import { TicketDocument } from "../../state/types/tickets";

const styles = (theme: Theme) =>
  createStyles({
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

interface ExternalProps {
  document: TicketDocument;
}

enum FileType {
  Pdf,
  Image,
  Text,
  Unknown
}

type Props = ExternalProps & WithStyles<typeof styles> & RouteComponentProps;

interface State {
  downloaded: boolean;
}

class TicketDetail extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      downloaded: false
    };
  }

  getFileExtension(filename: string) {
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
  }

  render() {
    const { document, classes } = this.props;
    const fileType = this.getFileExtension(document.fileUrl);
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
  }
}

export default withStyles(styles)(withRouter(TicketDetail));
