import React from 'react';
import { FileModel, BEGIN_MESSAGE } from './App';

declare var Peer: any;
interface SendState {
  linkClipMatch: boolean;
  connectionLink?: string;
  copySuccess: boolean;
  connection?: any;
  sending: boolean;
  sent: boolean;
}

class Send extends React.Component<{}, SendState> {
  private readonly peer: any;
  private readonly input: HTMLInputElement;
  public constructor(props: {}) {
    super(props);

    this.peer = new Peer();
    this.state = {
      linkClipMatch: false,
      connectionLink: undefined,
      copySuccess: false,
      sending: false,
      sent: false
    }

    this.input = document.createElement("input");
    this.input.type = "file";
    this.input.onchange = (event: any) => {
      const fileToSend = event.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileToSend);
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
          const contents = readerEvent?.target?.result;
          const sendableContent: FileModel = {
            name: fileToSend.name,
            contents
          };

          const beginMessage: FileModel = {
            name: BEGIN_MESSAGE,
            contents: undefined
          }

          this.state.connection?.send(beginMessage);
          this.state.connection?.send(sendableContent);
          this.setState({sending: false, sent: true})
      }

    }

  }

  private generateConnectionLink() {
    this.setState({connectionLink: window.location.href + this.peer.id});
  }

  private copyConnectionLink() {
    if (this.state.connectionLink) {
      navigator.permissions.query({name: "clipboard-write" as PermissionName}).then(result => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.clipboard.writeText(this.state.connectionLink as string).then(() => { 
            this.setState({ copySuccess: true })
            this.peer.on("connection", (connection: any) => {
              this.setState({connection});
            });
          });
        }
      });
    }
  }

  private sendFile() {
    this.setState({sending: true});
    this.input.click()
  }

  public render() {
    return (
    <>
      {!this.state.connectionLink && <button type="button" className="bttn-float bttn-lg bttn-primary" onClick={() => this.generateConnectionLink()}>
        Generate connection link
      </button>}
      {this.state.connectionLink && !this.state.connection && <button type="button" className={!this.state.copySuccess ? "bttn-float bttn-lg bttn-primary" : "bttn-float bttn-lg bttn-success"} onClick={() => this.copyConnectionLink()}>
        { !this.state.copySuccess ? "Click to copy connection link" : "Successfully copied! Awaiting recipient connection..." }
      </button>}
      {this.state.connectionLink && this.state.connection && !this.state.sending && !this.state.sent && <button type="button" className={"bttn-float bttn-lg bttn-success"} onClick={() => this.sendFile()}>
        Connected! Click to send file...
      </button>}
      {this.state.connectionLink && this.state.connection && this.state.sending && !this.state.sent && <button type="button" className={"bttn-float bttn-lg bttn-success"}>
        Sending...
      </button>}
      {this.state.connectionLink && this.state.connection && !this.state.sending && this.state.sent && <button type="button" className={"bttn-float bttn-lg bttn-success"}>
        Sent!
      </button>}
    </>
    );
  }
}

export default Send;
