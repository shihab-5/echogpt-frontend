"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EMPTY_COPY } from "@/data/empty-copy";

interface ResetConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Confirmation modal for the Reset Workspace action. The actual wipe
 * + event-dispatch + navigation lives in DataSection — this modal is
 * purely the "are you sure?" prompt with a danger-toned primary CTA.
 */
export function ResetConfirmModal({
  open,
  onClose,
  onConfirm,
}: ResetConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={EMPTY_COPY.reset.title}
      description={EMPTY_COPY.reset.body}
      tone="danger"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {EMPTY_COPY.reset.cancel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {EMPTY_COPY.reset.confirm}
          </Button>
        </>
      }
    >
      <ul className="ml-4 list-disc space-y-1">
        <li>All conversations and their messages</li>
        <li>Theme, density, and interface preferences</li>
        <li>Default model choice</li>
        <li>Sign-in (if any)</li>
      </ul>
      <p className="mt-3">
        There is no undo. The next page load will start you on a clean
        workspace.
      </p>
    </Modal>
  );
}