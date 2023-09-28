import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Link from "next/link";

export default function Modal(props) {
  const [showDialog, setShowDialog] = React.useState(false);
  const buttonRef = React.useRef();
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <button onClick={open}>Show Dialog</button>
      <Dialog isOpen={showDialog} initialFocusRef={buttonRef} onDismiss={close}>
        <p>Pass the button ref to Dialog and the button.</p>
        <button onClick={close}>Not me</button>
        <button ref={buttonRef} onClick={close}>
          Got me!
        </button>
        <Link href={"/product/25651"}>Open</Link>
      </Dialog>
    </div>
  );
}
