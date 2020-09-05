import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FileModel, BEGIN_MESSAGE } from './App';
import { saveAs } from 'file-saver';

declare var Peer: any;

interface ReceiveParams {
  senderId?: string;
}

interface ReceiveProps extends RouteComponentProps<ReceiveParams> {
}

interface ReceiveState {
  connected: boolean;
  downloading: boolean;
  ready: boolean;
  file?: File;
}

class Receive extends React.Component<ReceiveProps, ReceiveState> {
  private readonly peer: any;
  public constructor(props: ReceiveProps) {
    super(props);

    this.peer = new Peer();
    this.state = {
      connected: false,
      downloading: false,
      ready: false
    }
  }

  private connect() {
    if (this.props.match.params.senderId) {
      const connection = this.peer.connect(this.props.match.params.senderId);

      connection.on("open", () => {
        this.setState({ connected: true })

        connection.on("data", (data: FileModel) => {
          if (data.name === BEGIN_MESSAGE) {
            this.setState({ downloading: true })
          } else {
            const file = new File([data.contents], data.name);
            this.setState({ file, downloading: false, ready: true })
          }
        });
      });

    }
  }

  private download() {
    if (this.state.file) {
      saveAs(this.state.file);
    }
  }

  public render() {
    return (
      <>
        {!this.state.connected && <button type="button" className="bttn-float bttn-lg bttn-primary" onClick={() => this.connect()}>
          Connect to sender
        </button>}
        {this.state.connected && !this.state.downloading && !this.state.ready && <button type="button" className="bttn-float bttn-lg bttn-success">
          Connected! Awaiting download...
        </button>}
        {this.state.connected && this.state.downloading && !this.state.ready && <button type="button" className="bttn-float bttn-lg bttn-success">
          Downloading...
        </button>}
        {this.state.connected && !this.state.downloading && this.state.ready && <button type="button" className="bttn-float bttn-lg bttn-success"  onClick={() => this.download()}>
          Click to download <i>{this.state.file?.name}</i>
        </button>}
      </>
    );
  }
}

export default Receive;
