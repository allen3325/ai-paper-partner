import { ReactNode } from 'react';
import { cn } from '@/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-lg w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-200">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">{title}</h3>
        {children}
      </div>
    </div>
  );
}

interface ModalButtonsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}

export function ModalButtons({
  onCancel,
  onConfirm,
  cancelText = '取消',
  confirmText = '確認',
}: ModalButtonsProps) {
  return (
    <div className="flex gap-3 justify-end mt-6">
      <button
        onClick={onCancel}
        className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        className="px-5 py-2.5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] transition-all"
      >
        {confirmText}
      </button>
    </div>
  );
}
