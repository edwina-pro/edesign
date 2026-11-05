import { Notify, Dialog } from "quasar";
export const notify = (message: string) =>
  Notify.create({
    message,
    color: "primary",
    position: "top",
    icon: "check_circle",
  });
export const confirm = (message: string) =>
  new Promise<boolean>((resolve) =>
    Dialog.create({
      title: "確認操作",
      message,
      cancel: true,
      persistent: true,
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
      .onDismiss(() => resolve(false)),
  );
