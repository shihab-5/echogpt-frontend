"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

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
      title="Reset workspace?"
      description="This wipes every conversation, message, preference, and theme stored on this device."
      tone="danger"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Reset workspace
          </Button>
        </>
      }
    >
      <ul className="ml-4 list-disc space-y-1">
        <li>All conversations and their messages</li>
        <li>Theme, density, and interface preferences</li>
        <li>Default model choice</li>
      </ul>
      <p className="mt-3">
        There is no undo. The next page load will start you on a clean
        workspace.
      </p>
    </Modal>
  );
}