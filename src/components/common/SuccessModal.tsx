import React from "react";

type Props = {
  open: boolean;
  title?: string;
  desc: React.ReactNode;
  onClose: () => void;

  // ✅ confirm용
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "success" | "danger";
};

export default function SuccessModal({
  open,
  title = "완료되었습니다",
  desc,
  onClose,
  onConfirm,
  confirmText = "확인",
  cancelText = "닫기",
  variant = "success",
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* dim */}
      <div className="absolute inset-0 bg-black/60" />

      {/* modal */}
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-main-primary text-center">
          {title}
        </h3>

        <div className="mt-3 text-sm text-black/70 text-center leading-relaxed">
          {desc}
        </div>

        <div className="mt-6 flex gap-3">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`flex-1 rounded-xl py-3 font-semibold
                ${
                  variant === "danger"
                    ? "bg-main-primary text-white"
                    : "bg-main-primary text-white"
                }`}
            >
              {confirmText}
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 font-semibold"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
