import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

interface ResetCharacterModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetCharacterModal({ open, onClose, onConfirm }: ResetCharacterModalProps) {
  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <ModalHeader>Limpar ficha?</ModalHeader>
      <ModalBody>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Todos os dados do personagem serão apagados do navegador. Esta ação não pode ser desfeita.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="failure" onClick={onConfirm}>
          Sim, limpar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
