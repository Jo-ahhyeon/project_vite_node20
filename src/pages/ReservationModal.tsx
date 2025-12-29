import { useEffect, useRef, useState } from "react";
import ReservationForm from "@/components/reservation/ReservationForm";
import ReservationCheck from "@/components/reservation/ReservationCheck";
import type { ReservationData } from "@/components/reservation/reservation.types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReservationData) => void;
};

export default function ReservationModal({ open, onClose, onSubmit }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"reserve" | "check">("reserve");

  const [form, setForm] = useState<ReservationData>({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    service: "hotel",
    roomType: "suite",
    address: "",
    addressDetail: "",
    petName: "",
    petType: "dog",
    breed: "",
    age: "",
    weight: "",
    sex: "male",
    neutered: "yes",
    addOns: [],
    note: "",
  });

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // 열릴 때 포커스
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  const handleChange = <K extends keyof ReservationData>(
    key: K,
    value: ReservationData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAddOn = (key: ReservationData["addOns"][number]) => {
    setForm((prev) => {
      const has = prev.addOns.includes(key);
      return {
        ...prev,
        addOns: has ? prev.addOns.filter((k) => k !== key) : [...prev.addOns, key],
      };
    });
  };

  const validate = () => {
    if (!form.name.trim()) return "이름을 입력해 주세요.";
    if (!form.phone.trim()) return "연락처를 입력해 주세요.";
    if (!form.startDate) return "시작 날짜를 선택해 주세요.";
    if (!form.endDate) return "종료 날짜를 선택해 주세요.";
    if (form.endDate < form.startDate) return "종료 날짜는 시작 날짜 이후여야 해요.";

    if (form.service === "hotel") {
      if (!form.roomType) return "객실 타입을 선택해 주세요.";
    } else {
      if (!form.address?.trim()) return "방문 주소를 입력해 주세요.";
    }

    if (!form.petName.trim()) return "반려동물 이름을 입력해 주세요.";
    if (!form.breed.trim()) return "품종을 입력해 주세요.";
    if (!form.age.trim()) return "나이를 입력해 주세요.";
    if (!form.weight.trim()) return "몸무게를 입력해 주세요.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        ref={panelRef}
        tabIndex={-1}
        onWheelCapture={(e) => e.stopPropagation()}
        className="relative w-full max-w-[720px] max-h-[85vh] rounded-2xl bg-white shadow-xl outline-none flex flex-col overflow-hidden"
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="text-left">
            <h3 className="text-lg text-main-primary font-bold">
              {mode === "reserve" ? "예약하기" : "예약 확인하기"}
            </h3>
            <p className="text-sm text-black/50 mt-1">
              {mode === "reserve"
                ? "필수 항목을 입력해 주세요."
                : "예약 정보를 확인하세요."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col lg:flex-row">
                <button
                  type="button"
                  onClick={() => setMode("reserve")}
                  className={`text-sm font-semibold px-3 py-1 rounded-full transition
                    ${mode === "reserve"
                      ? "bg-main-primary text-white"
                      : "text-main-primary hover:underline"}`}
                >
                  예약하기
                </button>

                <button
                  type="button"
                  onClick={() => setMode("check")}
                  className={`text-sm font-semibold px-3 py-1 rounded-full transition
                    ${mode === "check"
                      ? "bg-main-primary text-white"
                      : "text-main-primary hover:underline"}`}
                >
                  예약확인하기
                </button>
            </div>
            

            <button
              type="button"
              onClick={onClose}
              aria-label="close"
              className="text-2xl leading-none ml-1"
            >
              ×
            </button>
          </div>
        </div>

        {/* body */}
        {mode === "reserve" ? (
          <ReservationForm
            form={form}
            onChange={handleChange}
            onToggleAddOn={toggleAddOn}
            totalAddOnPrice={0} // (원하면 Form에서 계산하게 바꾼 뒤 제거 가능)
            onSubmit={handleSubmit}
            onClose={onClose}
            formatPriceKRW={(n) => n.toLocaleString("ko-KR")}
          />
        ) : (
          <ReservationCheck onGoReserve={() => setMode("reserve")} />
        )}
      </div>
    </div>
  );
}
