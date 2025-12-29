// components/reservation/ReservationCheck.tsx
import { useState } from "react";
import SuccessModal from "@/components/common/SuccessModal";

type Props = {
  onGoReserve: () => void;
};

type ReservationRow = {
  id: number;
  reservation_code: string;
  status: "pending" | "confirmed" | "cancelled";
  owner_name: string;
  owner_phone: string;
  start_date: string;
  end_date: string;
  service: "hotel" | "visit";
  room_type?: string | null;
  address?: string | null;
};

export default function ReservationCheck({ onGoReserve }: Props) {
  const [checkName, setCheckName] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [checkResult, setCheckResult] = useState<ReservationRow[]>([]);
  const [checkError, setCheckError] = useState("");
  const [loading, setLoading] = useState(false);

  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  // ✅ 취소 완료 모달 상태
  const [cancelDoneOpen, setCancelDoneOpen] = useState(false);

  const onLookup = async () => {
    setCheckError("");
    setCheckResult([]);

    if (!checkPhone.trim()) {
      setCheckError("연락처를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const API = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE;

      const res = await fetch(`${API}/reservation_lookup_by_phone.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: checkName.trim(),
          phone: checkPhone.replace(/[^0-9]/g, ""),
        }),
      });

      const text = await res.text();

      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        setCheckError(
          `서버 응답이 JSON이 아님 (status ${res.status})\n${text.slice(0, 200)}`
        );
        return;
      }

      if (!res.ok || !json?.success) {
        setCheckError(json?.message || `조회 실패 (status ${res.status})`);
        return;
      }

      const rows = Array.isArray(json.data) ? json.data : [json.data];
      setCheckResult(rows);
    } catch (e: any) {
      setCheckError(`네트워크 오류: ${e?.message || "unknown"}`);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async (reservationCode: string) => {
    setCheckError("");

    try {
      const API = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE;

      const res = await fetch(`${API}/reservation_cancel.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reservationCode,
          phone: checkPhone.replace(/[^0-9]/g, ""),
        }),
      });

      const text = await res.text();

      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        setCheckError(
          `서버 응답이 JSON이 아님 (status ${res.status})\n${text.slice(0, 200)}`
        );
        return;
      }

      if (!res.ok || !json?.success) {
        setCheckError(json?.message || "취소 실패");
        return;
      }

      // ✅ 취소 성공: 화면에서 status 업데이트
      setCheckResult((prev) =>
        prev.map((r) =>
          r.reservation_code === reservationCode
            ? { ...r, status: "cancelled" }
            : r
        )
      );

      // ✅ 완료 모달 오픈
      setCancelDoneOpen(true);
    } catch {
      setCheckError("서버 통신 오류");
    }
  };

  return (
    <div className="px-6 py-6 space-y-4 overflow-y-auto min-h-0">
      <div className="space-y-2">
        <label className="block text-left">
          <p className="text-sm font-medium mb-1">이름</p>
          <input
            value={checkName}
            onChange={(e) => setCheckName(e.target.value)}
            placeholder="홍길동"
            className="w-full rounded-xl border px-4 py-3"
          />
        </label>

        <label className="block text-left">
          <p className="text-sm font-medium mb-1">연락처</p>
          <input
            value={checkPhone}
            onChange={(e) => setCheckPhone(e.target.value)}
            placeholder="01012345678"
            inputMode="numeric"
            className="w-full rounded-xl border px-4 py-3"
          />
        </label>
      </div>

      {checkError && <p className="text-sm text-red-500">{checkError}</p>}

      <button
        type="button"
        className="w-full rounded-xl bg-main-primary text-white py-3 font-semibold disabled:opacity-50"
        onClick={onLookup}
        disabled={loading}
      >
        {loading ? "조회 중..." : "예약 확인"}
      </button>

      <button
        type="button"
        className="w-full rounded-xl border border-main-primary text-main-primary py-3 font-semibold"
        onClick={onGoReserve}
      >
        예약하러가기
      </button>

      {checkResult.length > 0 && (
        <div className="mt-2 space-y-3">
          {checkResult.map((r) => (
            <div
              key={r.id}
              className="rounded-xl bg-black/5 p-4 text-left text-sm space-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-main-primary">
                  예약번호: {r.reservation_code}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-white border">
                  {r.status}
                </span>
              </div>

              <div className="text-main-primary">
                <b>예약자:</b> {r.owner_name}
              </div>
              <div className="text-main-primary">
                <b>기간:</b> {r.start_date} ~ {r.end_date}
              </div>
              <div className="text-main-primary">
                <b>서비스:</b> {r.service === "hotel" ? "호텔" : "방문"}
              </div>

              {r.service === "hotel" ? (
                <div className="text-main-primary">
                  <b>객실:</b> {r.room_type || "-"}
                </div>
              ) : (
                <div className="text-main-primary">
                  <b>주소:</b> {r.address || "-"}
                </div>
              )}

              <div className="pt-3">
                <button
                  type="button"
                  disabled={r.status === "cancelled"}
                  onClick={(e) => {
                    e.stopPropagation();
                    const code =
                      (r as any).reservation_code ??
                      (r as any).reservationCode ??
                      null;

                    setCancelTarget(code);
                  }}
                  className={`w-full rounded-xl py-3 font-semibold
                    ${
                      r.status === "cancelled"
                        ? "bg-black/20 text-black/50 cursor-not-allowed"
                        : "bg-black/40 text-white hover:opacity-90"
                    }`}
                >
                  {r.status === "cancelled" ? "취소 완료" : "예약 취소하기"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <SuccessModal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        title="예약을 취소할까요?"
        desc={
          <>
            예약을 취소하면 되돌릴 수 없습니다.
            <br />
            정말 취소하시겠어요?
          </>
        }
        variant="danger"
        confirmText="취소하기"
        cancelText="닫기"
        onConfirm={() => {
          if (!cancelTarget) return;
          onCancel(cancelTarget);
          setCancelTarget(null);
        }}
      />

      <SuccessModal
        open={cancelDoneOpen}
        onClose={() => setCancelDoneOpen(false)}
        title="예약이 취소되었습니다"
        desc={
          <>
            취소 처리가 완료되었습니다.
            <br />
            궁금한 점이 있으면 고객센터로 연락해주세요.
          </>
        }
        cancelText="확인"
      />
    </div>
  );
}
