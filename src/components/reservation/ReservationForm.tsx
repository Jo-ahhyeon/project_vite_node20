// components/reservation/ReservationForm.tsx
import type React from "react";
import { ADD_ONS, ReservationData, AddOnKey, ServiceType, RoomType, PetType, PetSex } from "./reservation.types";

type Props = {
  form: ReservationData;
  onChange: <K extends keyof ReservationData>(key: K, value: ReservationData[K]) => void;
  onToggleAddOn: (key: AddOnKey) => void;
  totalAddOnPrice: number;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  formatPriceKRW: (n: number) => string;
};

export default function ReservationForm({
  form,
  onChange,
  onToggleAddOn,
  onSubmit,
  onClose,
  formatPriceKRW,
}: Props) {

  const totalAddOnPrice = form.addOns.reduce((sum, key) => {
  const item = ADD_ONS.find((a) => a.key === key);
  return sum + (item?.price ?? 0);
}, 0);

  return (
    <form
      onSubmit={onSubmit}
      onWheelCapture={(e) => e.stopPropagation()}
      onTouchMoveCapture={(e) => e.stopPropagation()}
      className="px-6 py-6 space-y-8 overflow-y-auto min-h-0"
    >
      {/* 보호자 정보 */}
      <section className="space-y-3">
        <h4 className="font-bold text-base">보호자 정보</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-left">
            <p className="text-sm font-medium mb-1">이름</p>
            <input
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="홍길동"
            />
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">연락처</p>
            <input
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="010-0000-0000"
            />
          </label>
        </div>
      </section>

      {/* 예약 기간 */}
      <section className="space-y-3">
        <h4 className="font-bold text-base">예약 기간</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-left">
            <p className="text-sm font-medium mb-1">시작 날짜</p>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => onChange("startDate", e.target.value)}
              className="
                w-full w-full min-w-0 max-w-full rounded-xl border
                px-4 py-3
                bg-white
                text-black
                appearance-none
              "
            />
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">종료 날짜</p>
            <input
              type="date"
              value={form.endDate}
              min={form.startDate || undefined}
              onChange={(e) => onChange("endDate", e.target.value)}
              className="w-full w-full min-w-0 max-w-full rounded-xl border
                px-4 py-3
                bg-white
                text-black
                appearance-none"
            />
          </label>
        </div>
      </section>

      {/* 서비스 선택 */}
      <section className="space-y-3">
        <h4 className="font-bold text-base">서비스 선택</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-left">
            <p className="text-sm font-medium mb-1">기본 서비스</p>
            <select
              value={form.service}
              onChange={(e) => onChange("service", e.target.value as ServiceType)}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="hotel">호텔(숙박)</option>
              <option value="visit">방문 돌봄</option>
            </select>
          </label>

          {form.service === "hotel" ? (
            <label className="text-left">
              <p className="text-sm font-medium mb-1">객실 선택</p>
              <select
                value={form.roomType ?? "suite"}
                onChange={(e) => onChange("roomType", e.target.value as RoomType)}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value="suite">스위트룸</option>
                <option value="deluxe">디럭스룸</option>
                <option value="standard">스탠다드룸</option>
              </select>
            </label>
          ) : (
            <div className="space-y-3 sm:col-span-1">
              <label className="text-left block">
                <p className="text-sm font-medium mb-1">방문 주소</p>
                <input
                  value={form.address ?? ""}
                  onChange={(e) => onChange("address", e.target.value)}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="예: 서울시 강남구 ..."
                />
              </label>

              <label className="text-left block">
                <p className="text-sm font-medium mb-1">상세 주소(선택)</p>
                <input
                  value={form.addressDetail ?? ""}
                  onChange={(e) => onChange("addressDetail", e.target.value)}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="예: 101동 1001호"
                />
              </label>
            </div>
          )}
        </div>
      </section>

      {/* 반려동물 정보 */}
      <section className="space-y-3">
        <h4 className="font-bold text-base">반려동물 정보</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-left">
            <p className="text-sm font-medium mb-1">반려동물 이름</p>
            <input
              value={form.petName}
              onChange={(e) => onChange("petName", e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="예: 토리"
            />
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">반려동물 종</p>
            <select
              value={form.petType}
              onChange={(e) => onChange("petType", e.target.value as PetType)}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="dog">강아지</option>
              <option value="cat">고양이</option>
              <option value="other">기타</option>
            </select>
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">품종</p>
            <input
              value={form.breed}
              onChange={(e) => onChange("breed", e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="예: 포메라니안"
            />
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">나이</p>
            <input
              value={form.age}
              onChange={(e) => onChange("age", e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="예: 3"
            />
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">몸무게(kg)</p>
            <input
              value={form.weight}
              onChange={(e) => onChange("weight", e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="예: 4.2"
            />
          </label>

          <label className="text-left">
            <p className="text-sm font-medium mb-1">성별</p>
            <select
              value={form.sex}
              onChange={(e) => onChange("sex", e.target.value as PetSex)}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="male">남</option>
              <option value="female">여</option>
            </select>
          </label>

          <label className="text-left sm:col-span-2">
            <p className="text-sm font-medium mb-1">중성화 여부</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onChange("neutered", "yes")}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  form.neutered === "yes" ? "bg-main-primary text-white" : "hover:bg-black/5"
                }`}
              >
                했어요
              </button>
              <button
                type="button"
                onClick={() => onChange("neutered", "no")}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  form.neutered === "no" ? "bg-main-primary text-white" : "hover:bg-black/5"
                }`}
              >
                안 했어요
              </button>
            </div>
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h4 className="font-bold text-base">추가 서비스 선택</h4>
          <p className="text-sm text-black/60">
            선택 합계: <span className="font-bold text-black">₩{formatPriceKRW(totalAddOnPrice)}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADD_ONS.map((a) => {
            const checked = form.addOns.includes(a.key);
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => onToggleAddOn(a.key)}
                className={`rounded-2xl border px-4 py-4 text-left hover:bg-black/5 transition ${
                  checked ? "border-black bg-black text-white hover:bg-black/90" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{a.label}</p>
                  <p className={`${checked ? "text-white/90" : "text-black/60"} text-sm`}>
                    ₩{formatPriceKRW(a.price)}
                  </p>
                </div>
                <p className={`mt-1 text-xs ${checked ? "text-white/70" : "text-black/40"}`}>
                  {checked ? "선택됨" : "선택하기"}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 요청사항 */}
      <section className="space-y-3">
        <h4 className="font-bold text-base">요청사항(선택)</h4>
        <textarea
          value={form.note}
          onChange={(e) => onChange("note", e.target.value)}
          className="w-full rounded-xl border px-4 py-3 min-h-[110px] resize-none"
          placeholder="예: 알러지/주의사항, 픽업 요청 등"
        />
      </section>

      {/* CTA */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl text-sm border py-3 font-semibold hover:bg-black/5"
        >
          취소
        </button>
        <button
          type="submit"
          className="w-full rounded-xl bg-main-primary text-white py-3 text-sm font-semibold hover:opacity-90"
        >
          예약 신청
        </button>
      </div>
    </form>
  );
}
