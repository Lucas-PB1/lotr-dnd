import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

interface ResetCharacterModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetCharacterModal({ open, onClose, onConfirm }: ResetCharacterModalProps) {
  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <ModalHeader>Começar do zero?</ModalHeader>
      <ModalBody>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          A ficha volta ao estado inicial: criação de personagem, atributos, inventário, moedas,
          história e notas serão apagados neste navegador.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>Você volta para a aba <strong>Criação</strong></li>
          <li>Não há como desfazer depois de confirmar</li>
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="failure" onClick={onConfirm}>
          Sim, começar do zero
        </Button>
      </ModalFooter>
    </Modal>
  );
}
